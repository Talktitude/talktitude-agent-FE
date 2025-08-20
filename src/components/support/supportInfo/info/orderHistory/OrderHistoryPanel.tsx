'use client';

import React, { useState } from 'react';
import OrderItem from './OrderItem';
import { OrderHistoryItemType } from '@/types/support';

interface OrderHistoryPanelProps {
  orderHistory: OrderHistoryItemType[];
}

const OrderHistoryPanel = ({ orderHistory }: OrderHistoryPanelProps) => {
  const [orderDetail] = useState(orderMenu);
  const [isTabMenuOpen, setIsTabMenuOpen] = useState(false);

  const handleOrderItemClick = (orderNumber: string) => {
    console.log(orderNumber);
    setIsTabMenuOpen(!isTabMenuOpen);
  };

  return (
    <div>
      {orderHistory.map((orderInfo, index) => (
        <OrderItem
          key={index}
          orderInfo={orderInfo}
          orderDetail={orderDetail}
          onHandleOrderItemClick={() =>
            handleOrderItemClick(orderInfo.orderNumber)
          }
          isTabMenuOpen={isTabMenuOpen}
        />
      ))}
    </div>
  );
};

export default OrderHistoryPanel;
