'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import OrderItem from './OrderItem';
import { OrderDetailItemType, OrderHistoryItemType } from '@/types/support';
import { getOrderDetail } from '@/api/support/supportPanelApi';

interface OrderHistoryPanelProps {
  orderHistory: OrderHistoryItemType[];
}

const OrderHistoryPanel = ({ orderHistory }: OrderHistoryPanelProps) => {
  const [orderDetail, setOrderDetail] = useState<OrderDetailItemType | null>(
    null,
  );
  const [openOrderNumber, setOpenOrderNumber] = useState<string | null>(null);
  const sessionId = useSearchParams().get('sessionId');

  const fetchOrderDetail = async (orderNumber: string) => {
    const response = await getOrderDetail(Number(sessionId), orderNumber);
    setOrderDetail(response.data);
  };

  const handleOrderItemClick = (orderNumber: string) => {
    console.log(orderNumber);
    if (openOrderNumber === orderNumber) {
      setOpenOrderNumber(null);
      setOrderDetail(null);
    } else {
      setOpenOrderNumber(orderNumber);
      fetchOrderDetail(orderNumber);
    }
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
          isTabMenuOpen={openOrderNumber === orderInfo.orderNumber}
        />
      ))}
    </div>
  );
};

export default OrderHistoryPanel;
