'use client';
import React, { useState } from 'react';
import { ClientInfoType, OrderHistoryItemType } from '@/types/support';
import ClientInfoPanel from './clientInfo/ClientInfoPanel';
import OrderHistoryPanel from './orderHistory/OrderHistoryPanel';

const MOCK_CLIENT_INFO: ClientInfoType = {
  clientName: '홍길동',
  clientId: 'hong123',
  phone: '010-1234-5678',
  address: '서울시 강남구 역삼동',
  point: 10000,
  totalCouponCount: 6,
  couponInfo: [
    { currency: 1000, amount: 3 },
    { currency: 5000, amount: 2 },
    { currency: 10000, amount: 1 },
  ],
};

const MOCK_ORDER_HISTORY: OrderHistoryItemType[] = [
  {
    orderDate: '2025년 5월 1일 오후 12:43',
    orderStatus: '배달중',
    storeName: '교촌치킨',
    storeImage:
      'https://i.pinimg.com/736x/b0/a8/61/b0a8616afe69d927283130b6d67a2f75.jpg',
    orderNumber: 'T22A0000DW',
  },
  {
    orderDate: '2025년 5월 1일 오후 12:43',
    orderStatus: '배달중',
    storeName: '교촌치킨',
    storeImage:
      'https://i.pinimg.com/736x/b0/a8/61/b0a8616afe69d927283130b6d67a2f75.jpg',
    orderNumber: 'T22A0000DW',
  },
  {
    orderDate: '2025년 5월 1일 오후 12:43',
    orderStatus: '배달중',
    storeName: '교촌치킨',
    storeImage:
      'https://i.pinimg.com/736x/b0/a8/61/b0a8616afe69d927283130b6d67a2f75.jpg',
    orderNumber: 'T22A0000DW',
  },
];

const tabs = [
  { id: 'info', label: '고객 정보' },
  { id: 'orders', label: '주문 내역' },
  { id: 'history', label: '상담 이력' },
  { id: 'memo', label: '상담 메모' },
];

const InfoPanel = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [clientInfo] = useState(MOCK_CLIENT_INFO);
  const [orderHistory] = useState(MOCK_ORDER_HISTORY);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return <ClientInfoPanel clientInfo={clientInfo} />;
      case 'orders':
        return orderHistory.length > 0 ? (
          <OrderHistoryPanel orderHistory={orderHistory} />
        ) : (
          <div className="h-full p-4 flex items-center justify-center text-textGray font-medium">
            주문 내역이 없습니다.
          </div>
        );
      case 'history':
        return (
          <div className="h-full p-4 flex items-center justify-center text-textGray font-medium">
            상담 이력 내용
          </div>
        );
      case 'memo':
        return (
          <div className="h-full p-4 flex items-center justify-center text-textGray font-medium">
            상담 메모 내용
          </div>
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
                : 'text-textBlak bg-[#ebebeb] font-medium hover:text-textBlack'
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
