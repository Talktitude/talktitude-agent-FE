import ChatRoom from './ChatRoom';

const ChatRoomPanel = () => {
  return (
    <div className="flex flex-col w-[35%] gap-1 border-r border-lineGray bg-bgLightBlue overflow-y-auto">
      <ChatRoom />
    </div>
  );
};

export default ChatRoomPanel;
