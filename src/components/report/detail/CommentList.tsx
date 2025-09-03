'use client';

import React from 'react';
import MemoComment from './MemoComment';
import { MemoCommentType } from '@/types/reports';
import { MessageSquareMore } from 'lucide-react';

const CommentList = ({ memoList }: { memoList: MemoCommentType[] }) => {
  const safeMemoList = Array.isArray(memoList) ? memoList : [];
  return safeMemoList.length > 0 ? (
    <div className="overflow-y-auto">
      {safeMemoList.map((memo) => (
        <MemoComment memoCommentData={memo} key={memo.id} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col w-full h-full items-center justify-center gap-2 text-textGray">
      <MessageSquareMore className="w-6 text-textLightGray" />
      <p className="text-sm">상담 메모가 없습니다.</p>
    </div>
  );
};

export default CommentList;
