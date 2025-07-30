'use client';

import React from 'react';
import SignupForm from '@/components/auth/signup/SignupForm';
import Header from '@/components/common/Header';
import { useSignupForm } from '@/hooks/auth/useSignupForm';

export default function SignupPage() {
  const {
    signupFormData,
    disabled,
    handleSignupChange,
    handleSubmit,
    handleCheckId,
  } = useSignupForm();
  return (
    <>
      <Header />
      <div className="h-[calc(100vh-49px)] flex flex-col items-center justify-center gap-10">
        <h1 className="text-2xl font-bold text-textBlack">회원가입</h1>
        <SignupForm
          signupFormData={signupFormData}
          onSubmit={handleSubmit}
          onSignupChange={handleSignupChange}
          handleCheckId={handleCheckId}
          disabled={disabled}
        />
      </div>
    </>
  );
}
