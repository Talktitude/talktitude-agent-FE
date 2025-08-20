import React from 'react';
import SupportHistoryItem from './SupportHistotyItem';
import { SupportHistoryItemType } from '@/types/support';

const SupportHistoryPanel = ({
  supportHistories,
}: {
  supportHistories: SupportHistoryItemType[];
  //   handleSupportHistoryClick: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col">
      {supportHistories.map((supportHistory) => (
        <SupportHistoryItem
          key={supportHistory.id}
          supportHistory={supportHistory}
        />
      ))}
    </div>
  );
};

export default SupportHistoryPanel;
