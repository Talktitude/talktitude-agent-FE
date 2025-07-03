import ChatHeader from './ChatHeader';
import ChatRoom from './ChatRoom';

const ChatRoomPanel = () => {
  return (
    <div className="flex flex-col w-[35%] border-r border-lineGray bg-bgLightBlue">
      <ChatHeader />
      <ChatRoom />
    </div>
  );
};

export default ChatRoomPanel;
