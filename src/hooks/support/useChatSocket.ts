'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Client, IMessage } from '@stomp/stompjs';

type ReceiveHandler = (msg: unknown) => void;
type StompErrorFrame = { headers?: { message?: string } };
type StatusHandler = (s: { sessionId: number; status: string }) => void;

/** 쿼리스트링에 token을 안전하게 붙여주는 헬퍼 (로컬 토큰 = 순수 JWT 전제) */
function buildSocketUrlWithToken(base: string, jwt: string) {
  const u = new URL(base);
  u.searchParams.set('token', jwt);
  return u.toString();
}

export function useChatSocket(
  onReceive?: ReceiveHandler,
  onStatus?: StatusHandler,
) {
  const searchParams = useSearchParams();
  const sessionIdParam = searchParams.get('sessionId');
  const sessionId = sessionIdParam ? Number(sessionIdParam) : null;

  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<string>('');

  const onStatusRef = useRef(onStatus);
  useEffect(() => {
    onStatusRef.current = onStatus;
  }, [onStatus]);

  /** 최신 onReceive를 ref에 보관 (deps에서 빼서 재연결 방지) */
  const onReceiveRef = useRef<ReceiveHandler | undefined>(onReceive);
  useEffect(() => {
    onReceiveRef.current = onReceive;
  }, [onReceive]);

  /** 최신 send 함수를 외부로 노출하기 위한 ref */
  const sendRef = useRef<
    (payload: {
      originalText: string;
      senderType: 'USER' | 'CLIENT';
      sessionId: number;
    }) => void
  >(() => {});

  /** 메시지 전송 */
  const sendMessage = useCallback(
    (payload: {
      originalText: string;
      senderType: 'USER' | 'CLIENT';
      sessionId: number;
    }) => {
      if (!connected || !clientRef.current || !sessionId) {
        console.warn('Not connected or no sessionId');
        return;
      }
      clientRef.current.publish({
        destination: '/app/chat/send',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...payload, sessionId }),
      });
    },
    [connected, sessionId],
  );

  useEffect(() => {
    sendRef.current = sendMessage;
    setStatus('');
  }, [sendMessage, sessionId]);

  useEffect(() => {
    if (typeof window === 'undefined' || !sessionId) return;

    if (clientRef.current) return;

    let mounted = true;

    (async () => {
      try {
        const StompJs = await import('@stomp/stompjs');
        const SockJS = (await import('sockjs-client')).default;

        const rawToken = localStorage.getItem('accessToken') ?? '';
        if (!rawToken) console.warn('No accessToken in localStorage');

        const BASE_SOCKET_URL =
          process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:8080/ws';
        const SOCKET_URL = buildSocketUrlWithToken(BASE_SOCKET_URL, rawToken);

        const client: Client = new StompJs.Client({
          webSocketFactory: () => {
            const sock = new SockJS(SOCKET_URL, undefined, {
              transports: ['xhr-streaming', 'xhr-polling', 'websocket'],
            }) as unknown as WebSocket;
            return sock;
          },
          connectHeaders: { Authorization: `Bearer ${rawToken}` },
          reconnectDelay: 4000,
          heartbeatOutgoing: 10000,
          heartbeatIncoming: 0,
          debug: (m) => console.log('[STOMP]', m),

          onConnect: () => {
            if (!mounted) return;
            setConnected(true);

            // 사용자 큐 구독
            client.subscribe(
              `/user/queue/chat/${sessionId}`,
              (message: IMessage) => {
                try {
                  const json = JSON.parse(message.body);
                  onReceiveRef.current?.(json);
                } catch (e) {
                  console.error('Parse error:', e, message.body);
                }
              },
            );

            // 상태 구독
            client.subscribe(
              `/user/queue/chat/${sessionId}/status`,
              (message: IMessage) => {
                try {
                  const s = JSON.parse(message.body);
                  setStatus(s.status);
                  onStatusRef.current?.(s);
                } catch (e) {
                  console.error('status parse error', e, message.body);
                }
              },
            );
          },

          onStompError: (frame: unknown) => {
            const f = frame as StompErrorFrame;
            console.error('STOMP error:', f.headers?.message);
          },

          onWebSocketClose: (ev?: CloseEvent) => {
            if (!mounted) return;
            setConnected(false);
            console.warn('[STOMP] ws close', ev?.code, ev?.reason);
          },
        });

        client.activate();
        clientRef.current = client;
      } catch (e) {
        console.error('STOMP init failed:', e);
      }
    })();

    // 언마운트/세션 변경 시 클린업
    return () => {
      mounted = false;
      const c = clientRef.current;
      clientRef.current = null;
      if (c) c.deactivate();
    };
    // 재연결 트리거는 sessionId만. onReceive는 ref로 처리했으므로 deps에서 제외
  }, [sessionId]);

  const finishedChat = status === 'FINISHED';

  return {
    connected,
    sendMessage: (data: Parameters<typeof sendRef.current>[0]) =>
      sendRef.current(data),
    status,
    finishedChat,
  };
}
