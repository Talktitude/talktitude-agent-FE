import React, { useState } from 'react';
import { ChatHistoryItemType } from '@/types/support';
import ChatHistoryDetail from './ChatHistoryDetail';
import { TiArrowSortedDown } from 'react-icons/ti';

interface ChatHistotyItemProps {
  chatHistory: ChatHistoryItemType;
}

const ChatHistotyItem: React.FC<ChatHistotyItemProps> = ({ chatHistory }) => {
  const [isChatHistoryOpen, setIsChatHistoryOpen] = useState(false);

  const handleToggle = () => {
    setIsChatHistoryOpen((prev) => !prev);
  };

  const containerStyle = `border-b border-zinc-100 ${
    isChatHistoryOpen ? 'hover:bg-gray-100' : ''
  }`;

  const headerStyle = `px-5 py-4 flex flex-row items-center justify-between gap-1 hover:bg-gray-100 cursor-pointer ${
    isChatHistoryOpen ? 'hover:bg-transparent' : ''
  }`;

  const arrowStyle = `w-5 h-5 transition-transform duration-200 ${
    isChatHistoryOpen ? 'rotate-180' : ''
  }`;

  return (
    <div className={containerStyle}>
      <div className={headerStyle} onClick={handleToggle}>
        <div className="flex flex-col items-start gap-1">
          <div className="text-textBlack text-base font-semibold">
            {chatHistory.category}
          </div>
          <div className="text-textLightGray text-sm font-medium">
            {chatHistory.createdAt}
          </div>
        </div>
        <TiArrowSortedDown className={arrowStyle} />
      </div>

      {isChatHistoryOpen && (
        <ChatHistoryDetail
          summaryText={chatHistory.summaryText}
          onClose={handleToggle}
        />
      )}
    </div>
  );
};

export default ChatHistotyItem;
