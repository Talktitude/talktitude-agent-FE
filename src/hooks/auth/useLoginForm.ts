'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LOGIN_ERROR_MESSAGES } from '@/lib/constants/errorMessages';
import { postLogin } from '@/api/accountApi';
import { useLoading } from '@/hooks/useLoading';

export const useLoginForm = () => {
  const router = useRouter();
  const { isLoading, withLoading } = useLoading();
  const [loginFormData, setLoginFormData] = useState({
    loginId: '',
    password: '',
  });
  const disabled =
    loginFormData.loginId.trim() === '' ||
    loginFormData.password.trim() === '' ||
    isLoading;
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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

    await withLoading(async () => {
      try {
        await postLogin(loginFormData);
        router.push('/support');
      } catch (error) {
        setErrorMessage(String(error));
        setIsErrorModalOpen(true);
      }
    });
  };

  const handleLoginChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFormData = { ...loginFormData, [key]: e.target.value };
      setLoginFormData(newFormData);
      // 아이디 비밀번호 모두 입력되면 에러 메시지 초기화
      if (
        newFormData.loginId.trim() !== '' &&
        newFormData.password.trim() !== ''
      ) {
        setLoginErrorMessage('');
      }
    };
  return {
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
  };
};
