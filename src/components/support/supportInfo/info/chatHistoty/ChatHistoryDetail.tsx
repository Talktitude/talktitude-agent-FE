import React from 'react';

const ChatHistoryDetail = ({
  summaryText,
  onClose,
}: {
  summaryText: string;
  onClose: () => void;
}) => {
  return (
    <div
      className="flex flex-col gap-3 m-4 mt-0 p-3 bg-bgLightBlue rounded-lg overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div className="text-textBlack text-base font-bold border-b border-zinc-300 pb-2">
        상담 내용 요약
      </div>
      <div className="text-textBlack text-sm leading-relaxed font-medium">
        {summaryText}
      </div>
    </div>
  );
};

export default ChatHistoryDetail;
