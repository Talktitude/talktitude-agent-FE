import React from 'react';
import Image from 'next/image';
import { Undo2, Clock, UserCheck, Phone, FileText } from 'lucide-react';
import { ReportDetailType } from '@/types/reports';
import { useRouter } from 'next/navigation';

const ReportInfo = ({ reportDetail }: { reportDetail: ReportDetailType }) => {
  const router = useRouter();
  return (
    <div className="w-full flex-1">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full">
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
          onClick={() => {
            router.back();
          }}
        >
          <Undo2 color="#C0C0C0" size={30} />
        </button>
      </div>
      <div className="space-y-4 px-2">
        <div className="flex items-center space-x-3">
          <Clock className="w-5 h-5 text-textGray" />
          <span className="text-base text-textGray">상담 시각</span>
          <span className="text-base font-semibold text-textBlack">
            {reportDetail.createdAt}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <UserCheck className="w-5 h-5 text-textGray" />
          <span className="text-base text-textGray">상담원</span>
          <span className="text-base font-semibold text-textBlack">
            {reportDetail.userName}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <FileText className="w-5 h-5 text-textGray" />
          <span className="text-base text-textGray">상담 유형</span>
          <span className="bg-bgLightBlue text-mainColor text-sm px-2 py-1 rounded-full font-semibold w-fit">
            {reportDetail.category}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-textGray" />
          <span className="text-base text-textGray">전화번호</span>
          <span className="text-base font-semibold text-textBlack">
            {reportDetail.clientPhone}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportInfo;
