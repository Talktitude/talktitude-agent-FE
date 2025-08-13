'use client';

import React from 'react';
import SignupForm from '@/components/auth/signup/SignupForm';
import Header from '@/components/common/Header';
import { useSignupForm } from '@/hooks/auth/useSignupForm';

export default function SignupPage() {
  const {
    signupFormData,
    errors,
    disabled,
    successMessages,
    handleSignupChange,
    handleBlur,
    handleSubmit,
    handleCheckId,
  } = useSignupForm();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="shrink-0 sticky top-0">
        <Header />
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
    </div>
  );
}
