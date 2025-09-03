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

export const useInfoPanel = () => {
  const [clientInfo, setClientInfo] = useState<ClientInfoType>();
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItemType[]>([]);
  const [supportHistory, setSupportHistory] = useState<
    SupportHistoryItemType[]
  >([]);
  const [chatMemo, setChatMemo] = useState<string>('');
  const sessionId = useSearchParams().get('sessionId');
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchIsFinished = async () => {
      if (sessionId !== null && sessionId !== '') {
        const sessionIdNum = Number(sessionId);
        if (!isNaN(sessionIdNum) && sessionIdNum >= 0) {
          const response = await getChatHeaderInfo(sessionIdNum);
          const finished = response?.data?.status === 'FINISHED';
          setIsFinished(finished);
        }
      }
    };
    fetchIsFinished();
  }, [sessionId]);

  useEffect(() => {
    const fetchClientInfo = async () => {
      if (sessionId !== null && sessionId !== '') {
        const sessionIdNum = Number(sessionId);
        if (!isNaN(sessionIdNum) && sessionIdNum >= 0) {
          const response = await getClientInfo(sessionIdNum);
          setClientInfo(response.data);
        }
      }
    };
    const fetchOrderHistory = async () => {
      if (sessionId !== null && sessionId !== '') {
        const sessionIdNum = Number(sessionId);
        if (!isNaN(sessionIdNum) && sessionIdNum >= 0) {
          const response = await getOrderHistory(sessionIdNum);
          setOrderHistory(response.data);
        }
      }
    };
    const fetchSupportHistory = async () => {
      if (sessionId !== null && sessionId !== '') {
        const sessionIdNum = Number(sessionId);
        if (!isNaN(sessionIdNum) && sessionIdNum >= 0) {
          const response = await getSupportHistory(sessionIdNum);
          setSupportHistory(response.data);
        }
      }
    };
    const fetchChatMemo = async () => {
      if (sessionId !== null && sessionId !== '') {
        const sessionIdNum = Number(sessionId);
        if (!isNaN(sessionIdNum) && sessionIdNum >= 0) {
          const response = await getChatMemo(sessionIdNum);
          if (response.data.length > 0) {
            setChatMemo(response.data[0].memoText);
          } else {
            setChatMemo('');
          }
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
