'use client';

import React, { useState } from 'react';
import MemoComment from './MemoComment';
import { MemoCommentType } from '@/types/reports';
import { MessageSquareMore } from 'lucide-react';

const MOCK_MEMO_LIST = [
  {
    memoId: 1,
    memoUpdateAt: '2025.05.08',
    userName: '성윤정',
    chatMemo: '고객이 동일한 사유로 3회째 요청 중입니다. 반복 설명이 필요.',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    memoId: 2,
    memoUpdateAt: '2025.05.08',
    userName: '성윤정',
    chatMemo: '고객이 동일한 사유로 3회째 요청 중입니다. 반복 설명이 필요.',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    memoId: 3,
    memoUpdateAt: '2025.05.08',
    userName: '성윤정',
    chatMemo: '고객이 동일한 사유로 3회째 요청 중입니다. 반복 설명이 필요.',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
];

const CommentList = () => {
  const [memoList] = useState<MemoCommentType[]>(MOCK_MEMO_LIST);
  return memoList.length > 0 ? (
    <div className="flex flex-col max-h-28 overflow-y-auto">
      {memoList.map((memo) => (
        <MemoComment memoCommentData={memo} key={memo.memoId} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col h-28 w-full items-center justify-center gap-2 text-textGray">
      <MessageSquareMore className="w-6 text-textLightGray" />
      <p className="text-sm">상담 메모가 없습니다.</p>
    </div>
  );
};

export default CommentList;
