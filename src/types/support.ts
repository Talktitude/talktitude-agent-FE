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
