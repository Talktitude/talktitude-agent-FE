'use client';

import React from 'react';
import SignupForm from '@/components/auth/signup/SignupForm';
import Header from '@/components/common/Header';
import CustomModal from '@/components/common/modal/CustomModal';
import { SingleConfirmButton } from '@/components/common/modal/ModalButtonGroup';
import { useSignupForm } from '@/hooks/auth/useSignupForm';

export default function SignupPage() {
  const {
    signupFormData,
    errors,
    disabled,
    successMessages,
    isErrorModalOpen,
    errorMessage,
    setIsErrorModalOpen,
    isSuccessModalOpen,
    successMessage,
    setIsSuccessModalOpen,
    handleSignupChange,
    handleBlur,
    handleSubmit,
    handleCheckId,
  } = useSignupForm();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="shrink-0 sticky top-0">
        <Header showNavItems={false} />
      </div>
      <main className="flex-1 overflow-y-auto flex flex-col items-center justify-center gap-10 py-10">
        <h1 className="text-2xl font-bold text-textBlack">회원가입</h1>
        <SignupForm
          signupFormData={signupFormData}
          errors={errors}
          successMessages={successMessages}
          onSubmit={handleSubmit}
          onSignupChange={handleSignupChange}
          handleBlur={handleBlur}
          handleCheckId={handleCheckId}
          disabled={disabled}
        />
      </main>

      {/* 에러 모달 */}
      <CustomModal
        open={isErrorModalOpen}
        onOpenChange={setIsErrorModalOpen}
        mode="center"
        isAlert={true}
      >
        <div className="text-center p-8 bg-bgLightBlue rounded-b-3xl">
          <p className="text-textGray text-lg font-semibold pb-8">
            {errorMessage}
          </p>
          <SingleConfirmButton
            onConfirm={() => setIsErrorModalOpen(false)}
            confirmText="확인"
            variant="confirm"
          />
        </div>
      </CustomModal>

      {/* 성공 모달 */}
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
            onConfirm={() => {
              setIsSuccessModalOpen(false);
              window.location.href = '/login';
            }}
            confirmText="로그인 페이지로 이동"
            variant="confirm"
          />
        </div>
      </CustomModal>
    </div>
  );
}
