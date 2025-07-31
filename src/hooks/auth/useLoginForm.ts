'use client';

import { useState } from 'react';
import { LOGIN_ERROR_MESSAGES } from '@/lib/constants/errorMessages';

export const useLoginForm = () => {
  const [loginFormData, setLoginFormData] = useState({
    loginId: '',
    password: '',
  });
  const disabled =
    loginFormData.loginId.trim() === '' || loginFormData.password.trim() === '';
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleKeepLoggedInClick = () => {
    setKeepLoggedIn((prev) => !prev);
    // 로그인 유지 토큰 설정 로직 구현
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      loginFormData.loginId.trim() === '' ||
      loginFormData.password.trim() === ''
    ) {
      setLoginErrorMessage(LOGIN_ERROR_MESSAGES.EMPTY_LOGIN);
      return;
    }
    console.log('로그인 시도:', { loginFormData });
    // 로그인 API 호출 로직 구현
  };

  const handleLoginChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginFormData({ ...loginFormData, [key]: e.target.value });
    };
  return {
    loginFormData,
    disabled,
    keepLoggedIn,
    loginErrorMessage,
    handleKeepLoggedInClick,
    handleLogin,
    handleLoginChange,
  };
};
