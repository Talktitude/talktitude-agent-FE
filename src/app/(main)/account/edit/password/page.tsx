'use client';

import Header from '@/components/common/Header';
import SectionHeader from '@/components/support/SectionHeader';
import ChangePasswordForm from '@/components/account/password/ChangePasswordForm';
import CustomModal from '@/components/common/modal/CustomModal';
import { SingleConfirmButton } from '@/components/common/modal/ModalButtonGroup';
import { usePasswordForm } from '@/hooks/account/usePasswordForm';

export default function PasswordChangePage() {
  const {
    passwordData,
    errors,
    onPasswordChange,
    handleSubmit,
    disabled,
    isPasswordChangeModalOpen,
    modalMessage,
    isSuccess,
    setIsPasswordChangeModalOpen,
  } = usePasswordForm();

  return (
    <>
      <div>
        <Header />
        <SectionHeader title="비밀번호 변경" />
        <ChangePasswordForm
          passwordData={passwordData}
          errors={errors}
          onPasswordChange={onPasswordChange}
          onChangePasswordSubmit={handleSubmit}
          disabled={disabled}
        />
      </div>
      {isPasswordChangeModalOpen && (
        <CustomModal
          open={isPasswordChangeModalOpen}
          onOpenChange={setIsPasswordChangeModalOpen}
          mode="center"
          isAlert={isSuccess}
          isWarning={!isSuccess}
        >
          <div className="text-center p-8 bg-bgLightBlue rounded-b-3xl">
            <div className="pb-8">
              <p
                className={`text-lg font-semibold whitespace-pre-line ${
                  isSuccess ? 'text-textBlack' : 'text-textRed'
                }`}
              >
                {modalMessage}
              </p>
            </div>
            <SingleConfirmButton
              onConfirm={() => setIsPasswordChangeModalOpen(false)}
              confirmText="확인"
              variant={isSuccess ? 'confirm' : 'warning'}
            />
          </div>
        </CustomModal>
      )}
    </>
  );
}
