import React from 'react';
import { ReportItemType } from '@/types/reports';
import Image from 'next/image';

interface ReportItemProps {
  reportItem: ReportItemType;
  onClick: () => void;
}

const ReportItem = ({ reportItem, onClick }: ReportItemProps) => {
  return (
    <button className="px-10 py-2.5 hover:bg-gray-100" onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className="aspect-square w-14 h-14 rounded-full">
          <Image
            src={reportItem.profileImageUrl}
            alt="profile"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="text-textBlack text-base font-semibold">
              {reportItem.clientName}
            </div>
            <div className="text-textLightGray text-sm font-semibold">
              {reportItem.createdAt}
            </div>
          </div>
          <div className="w-fit text-textGray text-base font-medium">
            {reportItem.clientPhone}
          </div>
          <div className="bg-bgLightBlue text-mainColor text-sm px-2 py-1 rounded-full font-semibold w-fit">
            {reportItem.category}
          </div>
        </div>
      </div>
    </button>
  );
};

export default ReportItem;
