'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { SIGNUP_ERROR_MESSAGES } from '@/lib/constants/errorMessages';
import { postSignup, getCheckId } from '@/api/accountApi';

export const useSignupForm = () => {
  const router = useRouter();
  const [signupFormData, setSignupFormData] = useState({
    loginId: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessages, setSuccessMessages] = useState<
    Record<string, string>
  >({});
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // 개별 필드 유효성 검사 함수들
  const validateLoginId = (value: string) => {
    if (!value.trim()) {
      return '아이디는 ' + SIGNUP_ERROR_MESSAGES.EMPTY_SIGNUP;
    }
    if (!isIdChecked) {
      return SIGNUP_ERROR_MESSAGES.ID_NOT_CHECKED;
    }
    return '';
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) {
      return '비밀번호는 ' + SIGNUP_ERROR_MESSAGES.EMPTY_SIGNUP;
    }
    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        value,
      )
    ) {
      return SIGNUP_ERROR_MESSAGES.WEAK_PASSWORD;
    }
    return '';
  };

  const validatePasswordConfirm = (value: string, password: string) => {
    if (!value.trim()) {
      return '비밀번호 확인은 ' + SIGNUP_ERROR_MESSAGES.EMPTY_SIGNUP;
    }
    if (value !== password) {
      return SIGNUP_ERROR_MESSAGES.INVALID_PASSWORD;
    }
    return '';
  };

  const validateName = (value: string) => {
    if (!value.trim()) {
      return '이름은 ' + SIGNUP_ERROR_MESSAGES.EMPTY_SIGNUP;
    }
    if (value.trim().length < 2) {
      return SIGNUP_ERROR_MESSAGES.INVALID_NAME;
    }
    return '';
  };

  const validatePhone = (value: string) => {
    if (!value.trim()) {
      return '전화번호는 ' + SIGNUP_ERROR_MESSAGES.EMPTY_SIGNUP;
    }
    if (!/^[0-9]+$/.test(value.replace(/\s/g, ''))) {
      return SIGNUP_ERROR_MESSAGES.INVALID_PHONE;
    }
    return '';
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return '이메일은 ' + SIGNUP_ERROR_MESSAGES.EMPTY_SIGNUP;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return SIGNUP_ERROR_MESSAGES.INVALID_EMAIL;
    }
    return '';
  };

  // 실시간 유효성 검사
  const validateField = (key: string, value: string) => {
    let error = '';

    switch (key) {
      case 'loginId':
        error = validateLoginId(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'passwordConfirm':
        error = validatePasswordConfirm(value, signupFormData.password);
        break;
      case 'name':
        error = validateName(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
    }

    setErrors((prev) => ({ ...prev, [key]: error }));
    // 에러가 있으면 successMessage 초기화
    if (error) {
      setSuccessMessages((prev) => ({ ...prev, [key]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    newErrors.loginId = validateLoginId(signupFormData.loginId);
    newErrors.password = validatePassword(signupFormData.password);
    newErrors.passwordConfirm = validatePasswordConfirm(
      signupFormData.passwordConfirm,
      signupFormData.password,
    );
    newErrors.name = validateName(signupFormData.name);
    newErrors.phone = validatePhone(signupFormData.phone);
    newErrors.email = validateEmail(signupFormData.email);

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const disabled = useMemo(() => {
    return (
      Object.values(signupFormData).some((v) => v.trim() === '') ||
      !isIdChecked ||
      Object.values(errors).some((error) => error !== '')
    );
  }, [signupFormData, isIdChecked, errors]);

  const handleSignupChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSignupFormData((prev) => ({ ...prev, [key]: value }));

      // 아이디가 변경되면 중복 확인 상태와 성공 메시지 초기화
      if (key === 'loginId') {
        setIsIdChecked(false);
        setSuccessMessages((prev) => ({ ...prev, loginId: '' }));
      }

      // 필드가 터치되었고 값이 있으면 실시간 검증
      if (touched[key] && value.trim()) {
        validateField(key, value);
      }

      // 비밀번호가 변경되면 비밀번호 확인도 재검증
      if (
        key === 'password' &&
        touched.passwordConfirm &&
        signupFormData.passwordConfirm
      ) {
        validateField('passwordConfirm', signupFormData.passwordConfirm);
      }
    };

  const handleBlur = (key: string) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    validateField(key, signupFormData[key as keyof typeof signupFormData]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 필드를 터치된 상태로 설정
    setTouched({
      loginId: true,
      password: true,
      passwordConfirm: true,
      name: true,
      phone: true,
      email: true,
    });

    if (validateForm()) {
      const signupData = {
        loginId: signupFormData.loginId,
        password: signupFormData.password,
        name: signupFormData.name,
        phone: signupFormData.phone,
        email: signupFormData.email,
      };

      try {
        await postSignup(signupData);
        // 회원가입 성공 시 로그인 페이지로 이동
        router.push('/login');
      } catch (error) {
        // 서버 에러 메시지를 alert로 표시
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('회원가입 중 오류가 발생했습니다.');
        }
      }
    }
  };

  const handleCheckId = async (loginId: string) => {
    if (!loginId.trim()) {
      setErrors((prev) => ({
        ...prev,
        loginId: SIGNUP_ERROR_MESSAGES.EMPTY_SIGNUP,
      }));
      return;
    }

    try {
      const response = await getCheckId(loginId);

      if (response === '사용 가능한 ID입니다.') {
        setIsIdChecked(true);
        setErrors((prev) => ({ ...prev, loginId: '' }));
        setSuccessMessages((prev) => ({ ...prev, loginId: response }));
      } else {
        setIsIdChecked(false);
        setSuccessMessages((prev) => ({ ...prev, loginId: '' }));
        setErrors((prev) => ({
          ...prev,
          loginId: response || SIGNUP_ERROR_MESSAGES.DUPLICATE_ID,
        }));
      }
    } catch {
      setIsIdChecked(false);
      setSuccessMessages((prev) => ({ ...prev, loginId: '' }));
      setErrors((prev) => ({
        ...prev,
        loginId: SIGNUP_ERROR_MESSAGES.DUPLICATE_ID,
      }));
    }
  };

  return {
    signupFormData,
    errors,
    successMessages,
    disabled,
    handleSignupChange,
    handleBlur,
    handleSubmit,
    handleCheckId,
  };
};
