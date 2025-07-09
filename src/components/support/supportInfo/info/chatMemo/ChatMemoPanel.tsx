'use client';

import React, { useState } from 'react';
import { PLACEHOLDERS } from '@/lib/constants/placeholders';

interface ChatMemoPanelProps {
  initialMemo?: string;
  hasMemo: boolean;
}

const ChatMemoPanel = ({ initialMemo = '', hasMemo }: ChatMemoPanelProps) => {
  const [isEditing, setIsEditing] = useState(!hasMemo);
  const [memo, setMemo] = useState(initialMemo);

  const handleEditToggle = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log('메모 저장', memo);
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
          isEditing ? 'focus:border-[1px] focus:border-mainColor' : ''
        }`}
        rows={8}
        placeholder={PLACEHOLDERS.CHAT_MEMO}
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        readOnly={!isEditing}
      />
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
    </div>
  );
};

export default ChatMemoPanel;
