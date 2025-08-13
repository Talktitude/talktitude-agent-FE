import type { ChatHeaderInfoType } from '@/types/support';
import { BsTelephoneXFill } from 'react-icons/bs';

interface ChatHeaderProps {
  chatInfo: ChatHeaderInfoType;
}

export default function ChatHeader({ chatInfo }: ChatHeaderProps) {
  const handleSupportEnd = (sessionId: number) => {
    console.log(sessionId);
  };

  return (
    <div className="sticky top-0 bg-bgLightBlue border-b border-lineGray p-5 m-0 flex flex-row items-center justify-between">
      <div className="flex flex-col items-start">
        <div className="text-textBlack text-xl font-bold">
          {chatInfo.clientName} ({chatInfo.clientId})
        </div>
        <div className="text-textLightGray text-sm font-medium leading-tight">
          {chatInfo.clientPhone}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <button
          className="px-4 py-2.5 font-semibold rounded-[10px] text-sm w-full bg-textRed text-white hover:bg-textRed/80 transition-colors flex items-center gap-2"
          onClick={() => handleSupportEnd(chatInfo.sessionId)}
        >
          <BsTelephoneXFill className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
