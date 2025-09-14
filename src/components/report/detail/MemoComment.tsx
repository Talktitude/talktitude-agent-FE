import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { MemoCommentType } from '@/types/reports';
import { deleteMemoComment } from '@/api/report/reportDetailApi';
import CustomModal from '@/components/common/modal/CustomModal';
import {
  ConfirmCancelButtons,
  SingleConfirmButton,
} from '@/components/common/modal/ModalButtonGroup';

const MemoComment = ({
  memoCommentData,
  onDelete,
}: {
  memoCommentData: MemoCommentType;
  onDelete: () => Promise<void>;
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleDeleteMemo = async () => {
    const response = await deleteMemoComment(memoCommentData.id);
    setSuccessMessage(response.data);
    setIsSuccessModalOpen(true);
    await onDelete();
  };

  return (
    <div className="bg-white p-2">
      <div className="flex items-start space-x-3">
        <div className="relative aspect-square w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
          <Image
            src={memoCommentData.profileImageUrl}
            alt="profile"
            sizes="40px"
            unoptimized={true}
            className="rounded-full object-cover"
            fill
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
          <p className="text-sm text-textBlack leading-relaxed break-words">
            {memoCommentData.memoText}
          </p>
        </div>
        <button
          className="text-xs px-2 py-1 bg-gray-100 rounded-lg border hover:bg-gray-200"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash2 className="w-4 h-4 text-textGray" />
        </button>
      </div>

      {/* 삭제 확인 모달 */}
      <CustomModal
        open={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        mode="center"
        isAlert={true}
      >
        <div className="text-center p-8 bg-bgLightBlue rounded-b-3xl">
          <p className="text-textGray text-lg font-semibold pb-8">
            해당 메모를 삭제하시겠습니까?
          </p>
          <ConfirmCancelButtons
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={() => {
              setIsDeleteModalOpen(false);
              handleDeleteMemo();
            }}
            cancelText="취소"
            confirmText="삭제"
            confirmVariant="confirm"
          />
        </div>
      </CustomModal>

      {/* 삭제 성공 모달 */}
      <CustomModal
        open={isSuccessModalOpen}
        onOpenChange={setIsSuccessModalOpen}
        mode="center"
        isAlert={true}
      >
        <div className="text-center p-8 bg-bgLightBlue rounded-b-3xl">
          <p className="text-textGray text-lg font-semibold pb-8">
            {successMessage}
          </p>
          <SingleConfirmButton
            onConfirm={() => setIsSuccessModalOpen(false)}
            confirmText="확인"
            variant="confirm"
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default MemoComment;
