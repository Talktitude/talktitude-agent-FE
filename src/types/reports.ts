export interface ReportItemType {
  reportId: number;
  sessionId: number;
  clientName: string;
  clientPhone: string;
  createdAt: string;
  category: string;
  clientId: string;
  profileImageUrl: string;
}

export interface ReportDetailType {
  reportId: number;
  sessionId: number;
  clientName: string;
  clientPhone: string;
  createdAt: string;
  userName: string;
  category: string;
  summaryText: string;
  profileImageUrl: string;
  memoCreateAt: string;
  chatMemo: string;
}

export interface MemoCommentType {
  memoId: number;
  memoUpdateAt: string;
  userName: string;
  chatMemo: string;
  profileImageUrl: string;
}
