export interface ChatListItemType {
  chat_id: number;
  clientName: string;
  clientPhone: string;
  time: string;
  profileImageUrl: string;
}

export interface MessageType {
  messageId: number;
  senderType: 'client' | 'user';
  original: string;
  polite?: string;
  timestamp: string;
}

export interface ChatHeaderInfoType {
  clientName: string;
  clientId: string;
  clientPhone: string;
}

export interface ClientInfoType {
  clientName: string;
  clientId: string;
  clientPhone: string;
  address: string;
  point: number;
  totalCouponCount: number;
  couponInfo: {
    currency: number;
    amount: number;
  }[];
}

export interface OrderHistoryItemType {
  orderDate: string;
  deliveryStatus: string;
  storeName: string;
  storeImage: string;
  orderNumber: string;
}

export interface OrderDetailItemType {
  orderNumber: string;
  orderDate: string;
  deliveryStatus: string;
  orderMenuSummary: {
    orderMenuInfos: {
      menuName: string;
      menuQuantity: number;
      menuPrice: number;
      totalMenuPrice: number;
    }[];
    totalPrice: number;
  };
  paymentInfo: {
    paidAmount: number;
    method: string;
    totalAmount: number;
    menuPrice: number;
    deliveryFee: number;
    discountAmount: number;
    couponAmount: number;
  };
  deliveryInfo: {
    clientPhone: string;
    address: string;
    deliveryNote: string;
    restaurantNote: string;
  };
}

export interface ChatHistoryItemType {
  id: number;
  createdAt: string;
  category: string;
  summaryText: string;
}

export interface RecommendationItemType {
  id: number;
  recommendation: string;
}
