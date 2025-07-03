export interface ChatListItemType {
  chat_id: number;
  name: string;
  phone: string;
  time: string;
}

export interface MessageType {
  id: number;
  senderType: 'client' | 'user';
  original: string;
  polite?: string;
  timestamp: string;
}
