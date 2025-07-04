'use client';
import React, { useState } from 'react';
import SectionHeader from '../../SectionHeader';
import ClientInfoPanel from './clientInfo/ClientInfoPanel';
import { ClientInfoType } from '@/types/support';

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

const InfoPanel = () => {
  const [clientInfo] = useState(MOCK_CLIENT_INFO);
  return (
    <div className="flex flex-col h-[50%] border-b border-lineGray bg-white">
      <SectionHeader title="고객 정보" />
      <div className=" overflow-y-auto">
        <ClientInfoPanel clientInfo={clientInfo} />
      </div>
    </div>
  );
};

export default InfoPanel;
