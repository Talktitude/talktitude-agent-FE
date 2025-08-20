import React, { useState } from 'react';
import { SupportHistoryItemType } from '@/types/support';
import SupportHistoryDetail from './SupportHistoryDetail';
import { TiArrowSortedDown } from 'react-icons/ti';

interface SupportHistoryItemProps {
  supportHistory: SupportHistoryItemType;
}

const SupportHistoryItem: React.FC<SupportHistoryItemProps> = ({
  supportHistory,
}) => {
  const [isSupportHistoryOpen, setIsSupportHistoryOpen] = useState(false);

  const handleToggle = () => {
    setIsSupportHistoryOpen((prev) => !prev);
  };

  const containerStyle = `border-b border-zinc-100 ${
    isSupportHistoryOpen ? 'hover:bg-gray-100' : ''
  }`;

  const headerStyle = `px-5 py-4 flex flex-row items-center justify-between gap-1 hover:bg-gray-100 cursor-pointer ${
    isSupportHistoryOpen ? 'hover:bg-transparent' : ''
  }`;

  const arrowStyle = `w-5 h-5 transition-transform duration-200 ${
    isSupportHistoryOpen ? 'rotate-180' : ''
  }`;

  return (
    <div className={containerStyle}>
      <div className={headerStyle} onClick={handleToggle}>
        <div className="flex flex-col items-start gap-1">
          <div className="text-textBlack text-base font-semibold">
            {supportHistory.category}
          </div>
          <div className="text-textLightGray text-sm font-medium">
            {supportHistory.createdAt}
          </div>
        </div>
        <TiArrowSortedDown className={arrowStyle} />
      </div>

      {isSupportHistoryOpen && (
        <SupportHistoryDetail
          summaryText={supportHistory.summaryText}
          onClose={handleToggle}
        />
      )}
    </div>
  );
};

export default SupportHistoryItem;
