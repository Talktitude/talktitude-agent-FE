export interface ReportItemType {
  id: number;
  sessionId: number;
  clientName: string;
  phone: string;
  createdAt: string;
  category: string;
  clientId: string;
  profileImageUrl: string;
}

export interface ReportDetailType {
  id: number;
  sessionId: number;
  clientName: string;
  phone: string;
  createdAt: string;
  memberName: string;
  category: string;
  summaryText: string;
  profileImageUrl: string;
  memos: MemoCommentType[];
}

export interface MemoCommentType {
  id: number;
  createdAt: string;
  memberName: string;
  memoText: string;
  profileImageUrl: string;
  memoPhase: string;
}
