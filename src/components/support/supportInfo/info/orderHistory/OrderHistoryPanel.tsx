'use client';

import React, { useState } from 'react';
import OrderItem from './OrderItem';
import { OrderHistoryItemType } from '@/types/support';

interface OrderHistoryPanelProps {
  orderHistory: OrderHistoryItemType[];
}

const orderMenu = {
  orderNumber: 'T22A0000DW',
  orderDate: '2025-07-09T14:30:00',
  deliveryStatus: '배달중',
  orderMenuSummary: {
    orderMenuInfos: [
      {
        menuName: '레드허니콤보',
        menuQuantity: 1,
        menuPrice: 20000,
        totalMenuPrice: 20000,
      },
      {
        menuName: '웨지감자',
        menuQuantity: 2,
        menuPrice: 4000,
        totalMenuPrice: 8000,
      },
    ],
    totalPrice: 28000,
  },
  paymentInfo: {
    paidAmount: 17000, // 결제 금액
    method: '배민페이머니', // 결제 방법
    totalAmount: 22000, // 총 금액
    menuPrice: 19000, // 메뉴 금액
    deliveryFee: 3000, // 배달팁
    discountAmount: -5000, // 할인 금액
    couponAmount: -5000, // 쿠폰
    // discountAmount: 0, // 할인 금액
    // couponAmount: 0, // 쿠폰
  },
  deliveryInfo: {
    clientPhone: '010-1234-5678',
    address: '서울시 강남구 테헤란로 123',
    deliveryNote: '문 앞에 놓아주세요',
    restaurantNote: '수저x',
  },
};

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
