import React from 'react';
import { ReportItemType } from '@/types/reports';
import Image from 'next/image';
import Badge from '@/components/common/Badge';

interface ReportItemProps {
  reportItem: ReportItemType;
  onClick: () => void;
}

const ReportItem = ({ reportItem, onClick }: ReportItemProps) => {
  return (
    <button className="px-10 py-2.5 hover:bg-gray-100" onClick={onClick}>
      <div className="flex items-center gap-4">
        <div className="relative aspect-square w-16 h-16 rounded-full overflow-hidden">
          <Image
            src={reportItem.profileImageUrl}
            alt="profile"
            fill
            sizes="60px"
            unoptimized={true}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between px-1">
            <div className="text-textBlack text-base font-semibold">
              {reportItem.clientName}
            </div>
            <div className="text-textLightGray text-sm font-semibold">
              {reportItem.createdAt}
            </div>
          </div>
          <div className="w-fit text-textGray text-base font-medium px-1">
            {reportItem.phone}
          </div>
          <div className="w-fit">
            <Badge size="sm">{`${reportItem.category} 문의`}</Badge>
          </div>
        </div>
      </div>
    </button>
  );
};

export default ReportItem;
