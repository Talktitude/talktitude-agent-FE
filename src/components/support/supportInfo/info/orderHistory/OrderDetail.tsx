import React, { useState } from 'react';
import DetailTabs from './DetailTabs';
import DetailContent from './DetailContent';
import { OrderDetailItemType } from '@/types/support';

const OrderDetail = ({ orderDetail }: { orderDetail: OrderDetailItemType }) => {
  const [activeTab, setActiveTab] = useState('주문 메뉴');

  return (
    <div className="w-full flex flex-col px-5 py-2.5 gap-2 border-b border-zinc-100">
      <DetailTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <DetailContent orderDetail={orderDetail} activeTab={activeTab} />
    </div>
  );
};

export default OrderDetail;
