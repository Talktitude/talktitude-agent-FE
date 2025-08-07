'use client';

import React from 'react';
import Logo from '@/components/common/Logo';
import LoginForm from '@/components/auth/login/LoginForm';
import FooterLinks from '@/components/auth/login/FooterLinks';
import { useLoginForm } from '@/hooks/auth/useLoginForm';

export default function LoginPage() {
  const {
    loginFormData,
    disabled,
    keepLoggedIn,
    loginErrorMessage,
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
        />
        <FooterLinks />
      </div>
    </div>
  );
}
