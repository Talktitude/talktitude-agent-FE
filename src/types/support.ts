export type FilterOption = 'ALL' | 'IN_PROGRESS' | 'FINISHED';

export interface ChatListItemType {
  sessionId: number;
  clientLoginId: string;
  clientPhone: string;
  lastMessageTime: string;
  profileImageUrl: string;
  status: 'ALL' | 'IN_PROGRESS' | 'FINISHED';
}

// ChatRoomPanel.tsx
export interface ChatHeaderInfoType {
  sessionId: number;
  clientLoginId: string;
  clientName: string;
  clientPhone: string;
  status?: 'IN_PROGRESS' | 'FINISHED';
  orderRelated?: boolean;
  storeName?: string;
  orderNumber?: string;
}

// ChatRoom.tsx - props 아님, 타입 정의
export interface SupportMessageType {
  messageId: number;
  textToShow: string;
  originalText: string;
  showOriginal: boolean;
  senderType: string;
  createdAt: string;
  medias?: { url: string; mediaType?: string }[];
}

// ClientInfoPanel.tsx - props 아님, 타입 정의
export interface ClientInfoType {
  name: string;
  loginId: string;
  phoneNumber: string;
  address: string;
  point: number;
  totalCouponCount: number;
  couponInfo: {
    currency: number;
    amount: number;
  }[];
}

// OrderHistoryPanel.tsx - props 아님, 타입 정의
export interface OrderHistoryItemType {
  orderDate: string;
  deliveryStatus: string;
  restaurantName: string;
  restaurantImageUrl: string;
  orderNumber: string;
  isCurrentOrder: boolean;
}

// OrderDetail.tsx - props 아님, 타입 정의
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
    phone: string;
    address: string;
    deliveryNote: string;
    restaurantNote: string;
  };
}

export interface SupportHistoryItemType {
  id: number;
  time: string;
  category: string;
  summaryText: string;
}

export interface RecommendationItemType {
  messageId: number;
  items: { id: number; text: string; priority: number; policyIds: string[] }[];
}
