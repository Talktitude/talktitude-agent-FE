import React from 'react';
import Image from 'next/image';
import { Undo2, Clock, UserCheck, Phone, FileText } from 'lucide-react';
import { ReportDetailType } from '@/types/reports';
import { useRouter } from 'next/navigation';

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className="flex items-center space-x-3">
    <div className="w-5 h-5 text-textGray">{icon}</div>
    <span className="text-base text-textGray">{label}</span>
    <span className="text-base font-semibold text-textBlack">{value}</span>
  </div>
);

const ReportInfo = ({ reportDetail }: { reportDetail: ReportDetailType }) => {
  const router = useRouter();

  return (
    <div className="w-full flex-1">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <Image
              src={reportDetail.profileImageUrl}
              width={48}
              height={48}
              alt="profileImageUrl"
              className="rounded-full"
            />
          </div>
          <div className="text-textBlack text-4xl font-bold">
            {reportDetail.clientName}
          </div>
        </div>
        <button
          className="h-10 w-10 flex items-center justify-center hover:bg-gray-100 rounded-full"
          onClick={() => router.back()}
        >
          <Undo2 color="#C0C0C0" size={30} />
        </button>
      </div>

      <div className="space-y-3  px-2">
        <InfoItem
          icon={<Clock />}
          label="상담 시각"
          value={reportDetail.createdAt}
        />
        <InfoItem
          icon={<UserCheck />}
          label="상담원"
          value={reportDetail.userName}
        />
        <InfoItem
          icon={<FileText />}
          label="상담 유형"
          value={
            <span className="bg-bgLightBlue text-mainColor text-sm px-2 py-1 rounded-full font-semibold w-fit">
              {reportDetail.category}
            </span>
          }
        />
        <InfoItem
          icon={<Phone />}
          label="전화번호"
          value={reportDetail.clientPhone}
        />
      </div>
    </div>
  );
};

export default ReportInfo;
