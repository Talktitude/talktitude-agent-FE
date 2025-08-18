'use client';

import { useState } from 'react';
import { SupportMessageType } from '@/types/support';

export default function ClientBubble({
  message,
}: {
  message: SupportMessageType;
}) {
  const [showOriginal, setShowOriginal] = useState(false);
  const content =
    message.textToShow && !showOriginal
      ? message.textToShow
      : message.originalText;

  return (
    <div className="flex justify-start flex-row gap-2">
      <div className="max-w-[70%] px-4 py-1.5 rounded-[20px] flex justify-between text-base font-medium break-words shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] bg-white text-textBlack self-start rounded-bl-none whitespace-pre-wrap">
        {content}
      </div>
      {message.textToShow && (
        <button
          onClick={() => setShowOriginal(!showOriginal)}
          className="h-7 px-5 py-1.5 bg-white rounded-[20px] outline outline-1 outline-offset-[-1px] outline-textLightGray overflow-hidden text-textGray text-xs font-medium self-center transition-colors hover:bg-gray-100 hover:outline-textGray hover:text-textBlack"
          type="button"
        >
          {showOriginal ? '되돌리기' : '원문보기'}
        </button>
      )}
    </div>
  );
}
