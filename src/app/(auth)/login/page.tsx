'use client';

import React from 'react';
import Logo from '@/components/common/Logo';
import LoginForm from '@/components/auth/login/LoginForm';
import FooterLinks from '@/components/auth/login/FooterLinks';
import CustomModal from '@/components/common/modal/CustomModal';
import { SingleConfirmButton } from '@/components/common/modal/ModalButtonGroup';
import { useLoginForm } from '@/hooks/auth/useLoginForm';

export default function LoginPage() {
  const {
    loginFormData,
    disabled,
    keepLoggedIn,
    loginErrorMessage,
    isLoading,
    isErrorModalOpen,
    errorMessage,
    setIsErrorModalOpen,
    handleKeepLoggedInClick,
    handleLogin,
    handleLoginChange,
  } = useLoginForm();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-16">
      <Logo />
      <div className="w-full max-w-[420px]">
        <LoginForm
          loginFormData={loginFormData}
          onLoginChange={handleLoginChange}
          onSubmit={handleLogin}
          keepLoggedIn={keepLoggedIn}
          handleKeepLoggedInClick={handleKeepLoggedInClick}
          disabled={disabled}
          loginErrorMessage={loginErrorMessage}
          isLoading={isLoading}
        />
        <FooterLinks />
      </div>

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
    </div>
  );
}
