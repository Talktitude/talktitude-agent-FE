'use client';

import { useEffect, useState } from 'react';
import { getChatHeaderInfo } from '@/api/support/chatRoomPanelApi';
import {
  ClientInfoType,
  OrderHistoryItemType,
  SupportHistoryItemType,
} from '@/types/support';
import {
  getClientInfo,
  getOrderHistory,
  getSupportHistory,
  getChatMemo,
} from '@/api/support/supportPanelApi';
import { useSearchParams } from 'next/navigation';
import { validateSessionId } from '@/lib/utils';
import { useChatStatusStore } from '@/store/chatStatusStore';

export const useInfoPanel = () => {
  const [clientInfo, setClientInfo] = useState<ClientInfoType>();
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItemType[]>([]);
  const [supportHistory, setSupportHistory] = useState<
    SupportHistoryItemType[]
  >([]);
  const [chatMemo, setChatMemo] = useState<string>('');
  const sessionId = useSearchParams().get('sessionId');
  const [isFinished, setIsFinished] = useState(false);
  const liveStatus =
    useChatStatusStore((s) => s.bySession[Number(sessionId)]) || isFinished;

  useEffect(() => {
    const fetchIsFinished = async () => {
      const validSessionId = validateSessionId(sessionId);
      if (validSessionId !== null) {
        const response = await getChatHeaderInfo(validSessionId);
        const finished =
          response?.data?.status === 'FINISHED' || liveStatus === 'FINISHED';
        setIsFinished(finished);
      }
    };
    fetchIsFinished();
  }, [sessionId, liveStatus]);

  useEffect(() => {
    const fetchClientInfo = async () => {
      const validSessionId = validateSessionId(sessionId);
      if (validSessionId !== null) {
        const response = await getClientInfo(validSessionId);
        setClientInfo(response.data);
      }
    };
    const fetchOrderHistory = async () => {
      const validSessionId = validateSessionId(sessionId);
      if (validSessionId !== null) {
        const response = await getOrderHistory(validSessionId);
        setOrderHistory(response.data);
      }
    };
    const fetchSupportHistory = async () => {
      const validSessionId = validateSessionId(sessionId);
      if (validSessionId !== null) {
        const response = await getSupportHistory(validSessionId);
        setSupportHistory(response.data);
      }
    };
    const fetchChatMemo = async () => {
      const validSessionId = validateSessionId(sessionId);
      if (validSessionId !== null) {
        const response = await getChatMemo(validSessionId);
        if (response.data.length > 0) {
          setChatMemo(response.data[0].memoText);
        } else {
          setChatMemo('');
        }
      }
    };
    fetchClientInfo();
    fetchOrderHistory();
    fetchSupportHistory();
    fetchChatMemo();
  }, [sessionId]);
  return {
    clientInfo,
    orderHistory,
    supportHistory,
    chatMemo,
    isFinished,
  };
};
