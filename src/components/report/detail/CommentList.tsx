'use client';

import React, { useRef, useEffect } from 'react';
import MemoComment from './MemoComment';
import { MemoCommentType } from '@/types/reports';
import { MessageSquareMore } from 'lucide-react';

const CommentList = ({
  memoList,
  onDelete,
}: {
  memoList: MemoCommentType[];
  onDelete: () => Promise<void>;
}) => {
  const safeMemoList = Array.isArray(memoList) ? memoList : [];

  const memoListEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    memoListEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [memoList]);

  return safeMemoList.length > 0 ? (
    <>
      <div className="overflow-y-auto">
        {safeMemoList.map((memo) => (
          <MemoComment
            memoCommentData={memo}
            key={memo.id}
            onDelete={onDelete}
          />
        ))}
      </div>
      <div ref={memoListEndRef} />
    </>
  ) : (
    <div className="flex flex-col w-full h-full items-center justify-center gap-2 text-textGray">
      <MessageSquareMore className="w-6 text-textLightGray" />
      <p className="text-sm">상담 메모가 없습니다.</p>
    </div>
  );
};

export default CommentList;
