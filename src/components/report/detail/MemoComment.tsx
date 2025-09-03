import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { MemoCommentType } from '@/types/reports';

const MemoComment = ({
  memoCommentData,
}: {
  memoCommentData: MemoCommentType;
}) => {
  return (
    <div className="bg-white p-2">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
          <Image
            src={memoCommentData.profileImageUrl}
            alt="profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-textBlack">
              {memoCommentData.memberName}
            </span>
            <span className="text-xs text-textGray">
              {memoCommentData.createdAt}
            </span>
          </div>
          <p className="text-sm text-textBlack leading-relaxed">
            {memoCommentData.memoText}
          </p>
        </div>
        <button className="text-xs px-2 py-1 bg-gray-100 rounded-lg border hover:bg-gray-200">
          <Trash2 className="w-4 h-4 text-textGray" />
        </button>
      </div>
    </div>
  );
};

export default MemoComment;
