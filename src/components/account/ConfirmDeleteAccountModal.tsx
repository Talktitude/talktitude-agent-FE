import React, { useState } from 'react';
import CustomModal from '@/components/common/modal/CustomModal';
import {
  ConfirmCancelButtons,
  SingleConfirmButton,
} from '@/components/common/modal/ModalButtonGroup';
import { useRouter } from 'next/navigation';
import { deleteUser } from '@/api/accountApi';

interface ConfirmDeleteAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConfirmDeleteAccountModal = ({
  open,
  onOpenChange,
}: ConfirmDeleteAccountModalProps) => {
  const router = useRouter();
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await deleteUser();
      localStorage.clear();
      router.push('/login');
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        '네트워크 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.',
      );
      setIsFailModalOpen(true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <CustomModal
        open={open}
        onOpenChange={onOpenChange}
        mode="center"
        isWarning={true}
      >
        <div className="text-center p-8 bg-[#F9EEEE] rounded-b-3xl">
          <div className="pb-8">
            <p className="font-bold text-textBlack text-xl mb-4">
              정말 탈퇴하시겠어요?
            </p>
            <p className="text-textGray text-base font-medium">
              계정을 삭제하면 모든 데이터가 삭제되며 <br />
              복구할 수 없어요.
            </p>
          </div>
          <ConfirmCancelButtons
            onCancel={() => onOpenChange(false)}
            onConfirm={handleDeleteAccount}
            cancelText="취소"
            confirmText="계속 탈퇴하기"
            confirmVariant="warning"
          />
        </div>
      </CustomModal>

      <CustomModal
        open={isFailModalOpen}
        onOpenChange={setIsFailModalOpen}
        mode="center"
        isWarning={true}
      >
        <div className="text-center p-8 bg-[#F9EEEE] rounded-b-3xl">
          <div className="pb-8">
            <p className="font-bold text-textRed text-xl mb-4">
              탈퇴 처리에 실패했습니다
            </p>
            <p className="text-textGray text-base font-medium whitespace-pre-line">
              {errorMessage || '잠시 후 다시 시도해주세요.'}
            </p>
          </div>
          <SingleConfirmButton
            onConfirm={() => setIsFailModalOpen(false)}
            confirmText="확인"
            variant="warning"
          />
        </div>
      </CustomModal>
    </>
  );
};

export default ConfirmDeleteAccountModal;
