'use client';

import React, { useState } from 'react';
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
  <div className="flex items-center flex-row space-x-2">
    <div className="flex items-center flex-row space-x-1 w-[90px]">
      <span className="text-textGray">{icon}</span>
      <span className="text-sm text-textGray">{label}</span>
    </div>
    <span className="text-sm font-semibold text-textBlack">{value}</span>
  </div>
);

const ReportInfo = ({ reportDetail }: { reportDetail: ReportDetailType }) => {
  const router = useRouter();
  const [data] = useState<ReportDetailType>(reportDetail);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <Image
              src={
                data.profileImageUrl ||
                'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg'
              }
              width={40}
              height={40}
              alt="profileImageUrl"
              className="rounded-full"
            />
          </div>
          <div className="text-textBlack text-3xl font-bold">
            {data.clientName}
          </div>
        </div>
        <button
          className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded-full"
          onClick={() => router.back()}
        >
          <Undo2 color="#C0C0C0" size={30} />
        </button>
      </div>

      <div className="space-y-2 px-2">
        <InfoItem
          icon={<Clock className="w-5 h-5" />}
          label="상담 시각"
          value={data.createdAt}
        />
        <InfoItem
          icon={<UserCheck className="w-5 h-5" />}
          label="상담원"
          value={data.memberName}
        />
        <InfoItem
          icon={<FileText className="w-5 h-5" />}
          label="상담 유형"
          value={
            <span className="bg-bgLightBlue text-mainColor text-xs px-2 py-1 rounded-full font-semibold w-fit">
              {data.category} 문의
            </span>
          }
        />
        <InfoItem
          icon={<Phone className="w-5 h-5" />}
          label="전화번호"
          value={data.phone}
        />
      </div>
    </div>
  );
};

export default ReportInfo;
