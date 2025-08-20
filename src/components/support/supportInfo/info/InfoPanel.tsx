'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  SupportHistoryItemType,
  ClientInfoType,
  OrderHistoryItemType,
} from '@/types/support';
import ClientInfoPanel from './clientInfo/ClientInfoPanel';
import OrderHistoryPanel from './orderHistory/OrderHistoryPanel';
import SupportHistoryPanel from './supportHistoty/SupportHistoryPanel';
import ChatMemoPanel from './chatMemo/ChatMemoPanel';
import { getClientInfo, getOrderHistory } from '@/api/support/supportPanelApi';

const MOCK_CHAT_HISTORY: SupportHistoryItemType[] = [
  {
    id: 1,
    createdAt: '2025년 5월 1일 오후 12:43',
    category: '배달 문의',
    summaryText: '요청이 받아들여지지 못함. 주문을 취소해서 상담을 마무리함',
  },
  {
    id: 2,
    createdAt: '2025년 5월 1일 오후 12:43',
    category: '환불 문의',
    summaryText:
      '회원님이 주문 취소를 요청했으나 주문이 이미 접수되어서 요청이 받아들여지지 못함. 주문을 취소해서 상담을 마무리함',
  },
];

const MOCK_CHAT_MEMO = '상담 메모하는 공간~~~';

const tabs = [
  { id: 'info', label: '고객 정보' },
  { id: 'orders', label: '주문 내역' },
  { id: 'history', label: '상담 이력' },
  { id: 'memo', label: '상담 메모' },
];

const InfoPanel = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [clientInfo, setClientInfo] = useState<ClientInfoType>();
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItemType[]>([]);
  const [supportHistory] = useState(MOCK_CHAT_HISTORY);
  const [chatMemo] = useState(MOCK_CHAT_MEMO);
  const sessionId = useSearchParams().get('sessionId');

  useEffect(() => {
    const fetchClientInfo = async () => {
      const response = await getClientInfo(Number(sessionId));
      setClientInfo(response.data);
    };
    const fetchOrderHistory = async () => {
      const response = await getOrderHistory(Number(sessionId));
      setOrderHistory(response.data);
    };
    fetchClientInfo();
    fetchOrderHistory();
  }, [sessionId]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return clientInfo ? (
          <ClientInfoPanel clientInfo={clientInfo} />
        ) : (
          <div className="h-full p-4 flex items-center justify-center text-textGray font-medium">
            고객 정보가 없습니다.
          </div>
        );
      case 'orders':
        return orderHistory.length > 0 ? (
          <OrderHistoryPanel orderHistory={orderHistory} />
        ) : (
          <div className="h-full p-4 flex items-center justify-center text-textGray font-medium">
            주문 내역이 없습니다.
          </div>
        );
      case 'history':
        return supportHistory.length > 0 ? (
          <SupportHistoryPanel supportHistories={supportHistory} />
        ) : (
          <div className="h-full p-4 flex items-center justify-center text-textGray font-medium">
            상담 이력이 없습니다.
          </div>
        );
      case 'memo':
        return chatMemo ? (
          <ChatMemoPanel hasMemo={true} initialMemo={chatMemo} />
        ) : (
          <ChatMemoPanel hasMemo={false} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[50%] border-b border-lineGray bg-white">
      <div className="bg-[#ebebeb]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-[25%] inline-flex flex-1 items-center justify-center py-3 text-lg transition-colors ${
              activeTab === tab.id
                ? 'text-mainColor bg-white font-bold '
                : 'text-textBlak bg-[#ebebeb] font-medium hover:bg-[#dcdcdc] hover:text-mainColor'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">{renderTabContent()}</div>
    </div>
  );
};

export default InfoPanel;
