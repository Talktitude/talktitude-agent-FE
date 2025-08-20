'use client';

import React from 'react';
import { OrderDetailItemType, OrderHistoryItemType } from '@/types/support';
import Image from 'next/image';
import OrderDetail from './OrderDetail';
import { TiArrowSortedDown } from 'react-icons/ti';

interface OrderItemProps {
  orderInfo: OrderHistoryItemType;
  orderDetail: OrderDetailItemType;
  onHandleOrderItemClick: () => void;
  isTabMenuOpen: boolean;
}

const getStatusColor = (status: OrderHistoryItemType['deliveryStatus']) => {
  switch (status) {
    case '배달중':
      return 'text-textRed';
    case '배달완료':
      return 'text-mainColor';
    default:
      return 'text-textGray';
  }
};

const OrderItem = ({
  orderInfo,
  orderDetail,
  onHandleOrderItemClick,
  isTabMenuOpen,
}: OrderItemProps) => {
  const statusColor = getStatusColor(orderInfo.deliveryStatus);

  return (
    <>
      <button
        type="button"
        className={`w-full px-5 py-4 flex flex-col gap-5 items-start border-b border-zinc-100 hover:bg-gray-100 ${
          isTabMenuOpen ? 'border-b-0' : ''
        }`}
        onClick={onHandleOrderItemClick}
      >
        <header className="flex items-center justify-between w-full">
          <div className="flex flex-row gap-2 items-center">
            <span className="text-textBlack text-base font-medium">
              {orderInfo.orderDate}
            </span>
            <span className="text-textBlack text-base font-medium">•</span>
            <span className={`text-base font-semibold ${statusColor}`}>
              {orderInfo.deliveryStatus}
            </span>
          </div>
          <TiArrowSortedDown
            className={`w-5 h-5 transition-transform duration-200 ${
              isTabMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </header>

        <main className="flex gap-3 items-center justify-between">
          <Image
            width={56}
            height={56}
            src={orderInfo.storeImage}
            alt={orderInfo.storeName}
            className="w-14 h-14 rounded-[10px]"
          />
          <div className="flex flex-col gap-1 items-start">
            <span className="text-textBlack text-base font-medium">
              {orderInfo.storeName}
            </span>
            <span className="text-textGray text-base font-medium whitespace-nowrap">
              주문 번호 {orderInfo.orderNumber}
            </span>
          </div>
        </main>
      </button>
      {isTabMenuOpen && orderDetail && (
        <OrderDetail orderDetail={orderDetail} />
      )}
    </>
  );
};

export default OrderItem;
