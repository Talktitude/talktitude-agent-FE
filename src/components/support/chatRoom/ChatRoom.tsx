import ClientBubble from './ClientBubble';
import AgentBubble from './AgentBubble';
import { MessageType } from '@/types/support';
import { useRef, useEffect } from 'react';

interface ChatRoomProps {
  messages: MessageType[];
}

export default function ChatRoom({ messages }: ChatRoomProps) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col gap-2 p-5 overflow-y-auto">
      {messages.map((message) => (
        <div key={message.messageId}>
          {message.senderType === 'client' ? (
            <ClientBubble message={message} />
          ) : (
            <AgentBubble message={message} />
          )}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}
