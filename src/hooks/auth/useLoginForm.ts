'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LOGIN_ERROR_MESSAGES } from '@/lib/constants/errorMessages';
import { postLogin } from '@/api/accountApi';

export const useLoginForm = () => {
  const router = useRouter();
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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      loginFormData.loginId.trim() === '' ||
      loginFormData.password.trim() === ''
    ) {
      setLoginErrorMessage(LOGIN_ERROR_MESSAGES.EMPTY_LOGIN);
      return;
    }
    try {
      await postLogin(loginFormData);
      router.push('/support');
    } catch (error) {
      alert(error);
    }
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
