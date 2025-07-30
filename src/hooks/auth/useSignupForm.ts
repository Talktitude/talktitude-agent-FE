'use client';

import { useState, useMemo } from 'react';

export const useSignupForm = () => {
  const [signupFormData, setSignupFormData] = useState({
    loginId: '',
    password: '',
    password1: '',
    name: '',
    phone: '',
    email: '',
  });

  const disabled = useMemo(() => {
    return Object.values(signupFormData).some((v) => v.trim() === '');
  }, [signupFormData]);

  const handleSignupChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignupFormData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signupFormData); // 실제 회원가입 로직 호출
  };

  const handleCheckId = (loginId: string) => {
    console.log(loginId); // 중복 확인 API 등
  };

  return {
    signupFormData,
    disabled,
    handleSignupChange,
    handleSubmit,
    handleCheckId,
  };
};
