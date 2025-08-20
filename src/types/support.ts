export type FilterOption = 'ALL' | 'IN_PROGRESS' | 'FINISHED';

// Filter.tsx
export interface FilterProps {
  filterOption: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
}

// ChatList.tsx - props
export interface ChatListProp {
  chatListItems: ChatListItemType[];
  selectedChat: number;
  filterOption: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  onChatSelect: (chatId: number) => void;
  isSearchMode?: boolean;
}

// ChatItem.tsx - props 아님, 타입 정의
export interface ChatListItemType {
  sessionId: number;
  clientLoginId: string;
  clientPhone: string;
  lastMessageTime: string;
  profileImageUrl: string;
}

// ChatItem.tsx - props
export interface ChatItemProps {
  chatListItem: ChatListItemType;
  isSelected: boolean;
  onClick: () => void;
}

// ChatHeader.tsx - props 아님, 타입 정의
export interface ChatHeaderInfoType {
  sessionId: number;
  clientLoginId: string;
  clientName: string;
  clientPhone: string;
  status?: 'IN_PROGRESS' | 'FINISHED';
}

// ChatHeader.tsx - props
export interface ChatHeaderProps {
  chatInfo: ChatHeaderInfoType;
}

// ChatRoom.tsx - props 아님, 타입 정의
export interface SupportMessageType {
  messageId: number;
  textToShow: string;
  originalText: string;
  showOriginal: boolean;
  senderType: string;
  createdAt: string;
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
