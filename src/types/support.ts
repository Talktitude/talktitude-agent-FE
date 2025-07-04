export interface ChatListItemType {
  chat_id: number;
  clientName: string;
  phone: string;
  time: string;
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
  phone: string;
}

export interface ClientInfoType {
  clientName: string;
  clientId: string;
  phone: string;
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
  orderStatus: string;
  storeName: string;
  storeImage: string;
  orderNumber: string;
}
