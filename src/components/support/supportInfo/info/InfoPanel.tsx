'use client';
import React, { useState } from 'react';
import ClientInfoPanel from './clientInfo/ClientInfoPanel';
import OrderHistoryPanel from './orderHistory/OrderHistoryPanel';
import SupportHistoryPanel from './supportHistoty/SupportHistoryPanel';
import ChatMemoPanel from './chatMemo/ChatMemoPanel';
import { useInfoPanel } from '@/hooks/support/useInfoPanel';

const tabs = [
  { id: 'info', label: '고객 정보' },
  { id: 'orders', label: '주문 내역' },
  { id: 'history', label: '상담 이력' },
  { id: 'memo', label: '상담 메모' },
];

const InfoPanel = () => {
  const [activeTab, setActiveTab] = useState('info');
  const { clientInfo, orderHistory, supportHistory, chatMemo } = useInfoPanel();

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
        return (
          <ChatMemoPanel
            // key={`${sessionId}-memo`}
            hasMemo={Boolean(chatMemo)}
            initialMemo={chatMemo}
          />
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
