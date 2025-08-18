import { patchEndChat } from '@/api/support/chatRoomPanelApi';
import type { ChatHeaderProps } from '@/types/support';
import { BsTelephoneXFill } from 'react-icons/bs';

export default function ChatHeader({ chatInfo }: ChatHeaderProps) {
  const isFinished = chatInfo.status === 'FINISHED';
  const handleSupportEnd = async (sessionId: number) => {
    if (isFinished) return;
    const response = await patchEndChat(sessionId);
    console.log(response.message);
  };

  return (
    <div className="sticky top-0 bg-bgLightBlue border-b border-lineGray p-5 m-0 flex flex-row items-center justify-between">
      <div className="flex flex-col items-start">
        <div className="text-textBlack text-xl font-bold">
          {chatInfo.clientName} ({chatInfo.clientLoginId})
        </div>
        <div className="text-textLightGray text-sm font-medium leading-tight">
          {chatInfo.clientPhone}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          className={`px-4 py-2.5 font-semibold rounded-[10px] text-sm w-full flex items-center gap-2 transition-colors ${
            isFinished
              ? 'bg-lineGray text-white cursor-not-allowed'
              : 'bg-textRed text-white hover:bg-textRed/80'
          }`}
          onClick={() => handleSupportEnd(chatInfo.sessionId)}
          disabled={isFinished}
          aria-disabled={isFinished}
        >
          <BsTelephoneXFill className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
