'use client';

import { useEffect, useRef, useState } from 'react';
import type { Client, IMessage } from '@stomp/stompjs';
import type { ChatListItemType } from '@/types/support';

function buildSocketUrlWithToken(base: string, jwt: string) {
  const u = new URL(base);
  u.searchParams.set('token', jwt);
  return u.toString();
}

type Options = {
  onSessionCreated?: (payload: ChatListItemType) => void;
  topicOverride?: string;
  socketUrlBase?: string;
};

export function useSessionPush(opts: Options = {}) {
  const { onSessionCreated, topicOverride, socketUrlBase } = opts;
  const clientRef = useRef<Client | null>(null);
  const [connected, setConnected] = useState(false);

  // 최신 콜백 보존
  const onCreatedRef = useRef<typeof onSessionCreated>(onSessionCreated);
  useEffect(() => {
    onCreatedRef.current = onSessionCreated ?? undefined;
  }, [onSessionCreated]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (clientRef.current) return; // 중복 연결 방지

    let mounted = true;

    (async () => {
      try {
        const StompJs = await import('@stomp/stompjs');
        const SockJS = (await import('sockjs-client')).default;

        const rawToken = localStorage.getItem('accessToken') ?? '';
        const BASE =
          socketUrlBase ??
          process.env.NEXT_PUBLIC_SOCKET_URL ??
          'http://localhost:8080/ws';
        const SOCKET_URL = buildSocketUrlWithToken(BASE, rawToken);
        const topic = topicOverride ?? '/user/queue/sessions/created';
        const topic2 = topicOverride ?? '/user/queue/sessions/updated';

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
          debug: (m) => console.log('[SESS-STOMP]', m),
          onConnect: () => {
            if (!mounted) return;
            setConnected(true);

            // 사용자 큐 구독
            client.subscribe(topic, (message: IMessage) => {
              try {
                const json = JSON.parse(message.body) as ChatListItemType;
                onCreatedRef.current?.(json);
              } catch (e) {
                console.error('[SESS] created parse error', e, message.body);
              }
            });

            client.subscribe(topic2, (message: IMessage) => {
              try {
                const json = JSON.parse(message.body) as ChatListItemType;
                onCreatedRef.current?.(json);
              } catch (e) {
                console.error('[SESS] updateparse error', e, message.body);
              }
            });
          },
          onWebSocketClose: () => {
            if (!mounted) return;
            setConnected(false);
          },
        });

        client.activate();
        clientRef.current = client;
      } catch (e) {
        console.error('[SESS] init failed:', e);
      }
    })();

    // 언마운트/세션 변경 시 클린업
    return () => {
      mounted = false;
      const c = clientRef.current;
      clientRef.current = null;
      if (c) c.deactivate();
    };
    // 재연결 트리거는 socketUrlBase, topicOverride만. onSessionCreated는 ref로 처리했으므로 deps에서 제외
  }, [socketUrlBase, topicOverride]);

  return { connected };
}
