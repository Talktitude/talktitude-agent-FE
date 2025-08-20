'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PLACEHOLDERS } from '@/lib/constants/placeholders';
import { postChatMemo } from '@/api/support/supportPanelApi';
import { useInfoPanel } from '@/hooks/support/useInfoPanel';

interface ChatMemoPanelProps {
  initialMemo?: string;
  hasMemo: boolean;
}

const ChatMemoPanel = ({ initialMemo = '', hasMemo }: ChatMemoPanelProps) => {
  const [isEditing, setIsEditing] = useState(!hasMemo);
  const [memo, setMemo] = useState(initialMemo);
  const sessionId = useSearchParams().get('sessionId');
  const { isFinished } = useInfoPanel();

  useEffect(() => {
    setMemo(initialMemo);
    setIsEditing(!hasMemo);
  }, [initialMemo, hasMemo, sessionId]);

  // 종료된 세션은 읽기모드만 가능하게 설정
  useEffect(() => {
    if (isFinished) {
      setIsEditing(false);
    } else {
      setIsEditing(!hasMemo);
    }
  }, [isFinished, hasMemo, sessionId]);

  const handleEditToggle = () => {
    if (isFinished) return;
    setIsEditing(true);
  };

  const handleSave = () => {
    if (isFinished) return;
    console.log('메모 저장', memo);
    postChatMemo(Number(sessionId), memo);
    setIsEditing(false);
  };

  return (
    <div className="px-5 py-4 flex flex-col gap-2">
      <label htmlFor="memo" className="text-textBlack text-base font-bold">
        상담 메모
      </label>
      <textarea
        id="memo"
        className={`w-full px-5 py-3 border border-lineGray rounded-[1.25rem] resize-none shadow-inputShadow text-sm font-medium focus:outline-none ${
          isEditing && !isFinished
            ? 'focus:border-[1px] focus:border-mainColor'
            : ''
        }`}
        rows={8}
        placeholder={
          isFinished ? PLACEHOLDERS.CHAT_MEMO_FINISHED : PLACEHOLDERS.CHAT_MEMO
        }
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        readOnly={isFinished || !isEditing}
      />
      {!isFinished && (
        <div className="flex justify-end gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-mainColor text-white text-sm font-semibold rounded-[10px] hover:bg-mainColor/80"
            >
              저장
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="px-4 py-2 bg-gray-100 text-textBlack text-sm font-semibold rounded-[10px] border hover:bg-gray-200"
            >
              수정
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatMemoPanel;
