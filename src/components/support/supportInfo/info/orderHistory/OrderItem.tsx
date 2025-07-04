import React from 'react';
import { OrderHistoryItemType } from '@/types/support';
import Image from 'next/image';

interface OrderItemProps {
  order: OrderHistoryItemType;
}

const getStatusColor = (status: OrderHistoryItemType['orderStatus']) => {
  switch (status) {
    case '배달중':
      return 'text-textRed';
    case '배달완료':
      return 'text-mainColor';
    default:
      return 'text-textGray';
  }
};

const OrderItem = ({ order }: OrderItemProps) => {
  const statusColor = getStatusColor(order.orderStatus);

  return (
    <button
      type="button"
      className="w-full px-5 py-4 flex flex-col gap-5 items-start border-b border-lineGray last:border-b-0"
      onClick={() => console.log(`${order.orderNumber} 클릭`)}
    >
      <header className="flex gap-2 items-center">
        <span className="text-textBlack text-base font-medium">
          {order.orderDate}
        </span>
        <span className="text-textBlack text-base font-medium">•</span>
        <span className={`text-base font-semibold ${statusColor}`}>
          {order.orderStatus}
        </span>
      </header>

      <main className="flex gap-3 items-center justify-between">
        <Image
          width={56}
          height={56}
          src={order.storeImage}
          alt={order.storeName}
          className="w-14 h-14 rounded-[10px]"
        />
        <div className="flex flex-col gap-1 items-start">
          <span className="text-textBlack text-base font-medium">
            {order.storeName}
          </span>
          <span className="text-textGray text-base font-medium whitespace-nowrap">
            주문 번호 {order.orderNumber}
          </span>
        </div>
      </main>
    </button>
  );
};

export default OrderItem;
