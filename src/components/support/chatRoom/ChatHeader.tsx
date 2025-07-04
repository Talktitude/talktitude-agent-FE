import type { ChatHeaderInfoType } from '@/types/support';
import Badge from '@/components/common/Badge';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Badge>{label}</Badge>
      <span className="text-textBlack text-base font-semibold">{value}</span>
    </div>
  );
}

interface ChatHeaderProps {
  chatInfo: ChatHeaderInfoType;
}

export default function ChatHeader({ chatInfo }: ChatHeaderProps) {
  return (
    <div className="sticky top-0 bg-bgLightBlue border-b border-lineGray p-5 m-0">
      <div className="flex flex-col items-start gap-2.5">
        <div className="flex flex-row gap-5 items-center">
          <InfoRow label="이름" value={chatInfo.clientName} />
          <InfoRow label="아이디" value={chatInfo.clientId} />
        </div>
        <InfoRow label="전화번호" value={chatInfo.phone} />
      </div>
    </div>
  );
}
