import React from 'react';
import ChatHistotyItem from './ChatHistotyItem';
import { ChatHistoryItemType } from '@/types/support';

const ChatHistoryPanel = ({
  chatHistories,
}: {
  chatHistories: ChatHistoryItemType[];
  //   handleChatHistoryClick: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col">
      {chatHistories.map((chatHistory) => (
        <ChatHistotyItem key={chatHistory.id} chatHistory={chatHistory} />
      ))}
    </div>
  );
};

export default ChatHistoryPanel;
