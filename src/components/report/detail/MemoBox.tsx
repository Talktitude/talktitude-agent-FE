'use client';

import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import CommentList from './CommentList';
import { PLACEHOLDERS } from '@/lib/constants/placeholders';

const MemoBox = ({
  memoCreateAt,
  chatMemo,
}: {
  memoCreateAt: string;
  chatMemo: string;
}) => {
  const [memo, setMemo] = useState('');
  const handleSave = () => {
    console.log('메모 저장', memo);
  };

  return (
    <div className="w-full flex-1 min-h-[35vh] flex flex-col px-5 py-3 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-300">
      <div className="flex items-center space-x-2 border-b border-gray-200 pb-2 mb-2 flex-shrink-0">
        <CheckSquare className="w-5 h-5 text-mainColor" />
        <h3 className="text-base font-bold text-textBlack">상담원 메모</h3>
      </div>
      {chatMemo ? (
        <div className="w-full py-1 mb-1 flex-shrink-0">
          <div className="flex items-start space-x-2 p-2 bg-bgLightBlue border-l-4 border-mainColor rounded-r-lg">
            <span className="text-sm font-medium text-textGray">
              {memoCreateAt}
            </span>
            <span className="text-sm font-semibold text-mainColor">
              {chatMemo}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full pt-1 mb-1 flex-shrink-0">
          <div className="flex items-start space-x-2 p-2 bg-bgLightGray/50 border-l-4 border-textGray/50 rounded-r-lg">
            <span className="text-sm font-medium text-textGray">
              담당 상담원이 작성한 메모가 없습니다.
            </span>
          </div>
        </div>
      )}
      <div className="flex-1 min-h-0 overflow-y-auto mb-1">
        <CommentList />
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        <textarea
          className="w-full h-10 px-3 py-2.5 text-sm text-textBlack font-medium outline-none shadow-inputShadow rounded-xl border-[1px] border-lineGray focus:border-[1px] focus:border-mainColor resize-none flex-1 leading-tight scrollbar-hide"
          value={memo}
          rows={2}
          placeholder={PLACEHOLDERS.MEMO_INPUT}
          onChange={(e) => setMemo(e.target.value)}
        />
        <div className="flex items-center">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-mainColor text-white text-sm font-semibold rounded-[10px] hover:bg-mainColor/80 whitespace-nowrap"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemoBox;
