import React from 'react';
import OrderItem from './OrderItem';
import { OrderHistoryItemType } from '@/types/support';

interface OrderHistoryPanelProps {
  orderHistory: OrderHistoryItemType[];
}

const OrderHistoryPanel = ({ orderHistory }: OrderHistoryPanelProps) => {
  return (
    <div>
      {orderHistory.map((order, index) => (
        <OrderItem key={index} order={order} />
      ))}
    </div>
  );
};

export default OrderHistoryPanel;
