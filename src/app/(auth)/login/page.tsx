'use client';

import React, { useState } from 'react';
import Logo from '@/components/common/Logo';
import LoginForm from '@/components/auth/login/LoginForm';
import FooterLinks from '@/components/auth/login/FooterLinks';
import { LOGIN_ERROR_MESSAGES } from '@/lib/constants/errorMessages';

export default function LoginPage() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const disabled = loginId.trim() === '' || password.trim() === '';
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [isEmptyLogin, setIsEmptyLogin] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleKeepLoggedInClick = () => {
    setKeepLoggedIn((prev) => !prev);
    // 로그인 유지 토큰 설정 로직 구현
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginId.trim() === '' || password.trim() === '') {
      setIsEmptyLogin(true);
      setLoginErrorMessage(LOGIN_ERROR_MESSAGES.EMPTY_LOGIN);
      return;
    }
    console.log('로그인 시도:', { loginId, password });
    // 로그인 API 호출 로직 구현
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginId(e.target.value);
    // 로그인 아이디 유효성 검사 로직 구현
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 비밀번호 유효성 검사 로직 구현
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-16">
      <Logo />
      <div>
        <LoginForm
          loginId={loginId}
          password={password}
          onIdChange={handleIdChange}
          onPasswordChange={handlePasswordChange}
          onSubmit={handleLogin}
          keepLoggedIn={keepLoggedIn}
          handleKeepLoggedInClick={handleKeepLoggedInClick}
          disabled={disabled}
          isEmptyLogin={isEmptyLogin}
          loginErrorMessage={loginErrorMessage}
        />
        <FooterLinks />
      </div>
    </div>
  );
}
