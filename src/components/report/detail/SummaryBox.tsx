import React from 'react';
import { FileText } from 'lucide-react';

const SummaryBox = ({ summaryText }: { summaryText: string }) => {
  return (
    <div className="w-full px-5 py-3 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-zinc-300 justify-center items-start gap-[5px] overflow-hidden">
      <div className="flex items-center space-x-2 border-b border-gray-200 pb-2">
        <FileText className="w-5 h-5 text-mainColor" />
        <div className="text-base font-bold text-textBlack">상담 내용 요약</div>
      </div>
      <div className="w-full h-full pt-2">
        <p className="text-sm text-textBlack font-medium flex-wrap break-keep overflow-y-auto max-h-14">
          {summaryText}
        </p>
      </div>
    </div>
  );
};

export default SummaryBox;
