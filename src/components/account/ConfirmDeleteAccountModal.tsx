import React from 'react';
import CustomModal from '@/components/common/modal/CustomModal';
import { ConfirmCancelButtons } from '@/components/common/modal/ModalButtonGroup';
import { ConfirmDeleteAccountModalPropsType } from '@/types/account';
import { useRouter } from 'next/navigation';

const ConfirmDeleteAccountModal = ({
  open,
  onOpenChange,
}: ConfirmDeleteAccountModalPropsType) => {
  const router = useRouter();

  const handleDeleteAccount = () => {
    localStorage.clear();
    router.push('/login');
    onOpenChange(false);
  };

  return (
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
  );
};

export default ConfirmDeleteAccountModal;
