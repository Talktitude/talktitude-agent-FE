import React from 'react';
import CustomModal from '@/components/common/CustomModal';
import { ConfirmDeleteAccountModalPropsType } from '@/types/account';
import { IoAlertCircle } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const ConfirmDeleteAccountModal = ({
  open,
  onOpenChange,
}: ConfirmDeleteAccountModalPropsType) => {
  const router = useRouter();

  const handleDeleteAccount = () => {
    router.push('/login');
    onOpenChange(false);
  };

  return (
    <CustomModal open={open} onOpenChange={onOpenChange} mode="center">
      <div className="p-6">
        <div className="flex flex-col items-center gap-4">
          <IoAlertCircle color="#F06969" className="w-24 h-24" />
          <div className="flex flex-col items-center">
            <span className="text-texBlack text-2xl font-bold">
              정말 탈퇴하시겠어요?
            </span>
            <span className="text-sm font-medium text-textLightGray">
              계정을 삭제하면 모든 데이터가 삭제되며 복구할 수 없어요.
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 py-5 px-6">
          <button
            className="px-5 py-2.5 text-textBlack font-semibold rounded-full text-lg w-full border-lineGray border"
            onClick={() => onOpenChange(false)}
          >
            취소
          </button>
          <button
            className="px-5 py-2.5 text-white bg-textRed font-semibold rounded-full text-lg w-full"
            onClick={handleDeleteAccount}
          >
            계속 탈퇴하기
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default ConfirmDeleteAccountModal;
