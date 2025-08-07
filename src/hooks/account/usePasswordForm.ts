import { useState } from 'react';
import { PASSWORD_CHANGE_ERROR_MESSAGES } from '@/lib/constants/errorMessages';

// 비밀번호 유효성 검사 함수
function validatePassword(password: string): boolean {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  return passwordRegex.test(password);
}

// 비밀번호 확인 검사 함수
function validatePasswordConfirm(
  password: string,
  confirmPassword: string,
): boolean {
  return password === confirmPassword;
}

// 현재 비밀번호와 새 비밀번호가 다른지 검사
function validateDifferentPassword(
  currentPassword: string,
  newPassword: string,
): boolean {
  return currentPassword !== newPassword;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface PasswordErrors {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

// 필드별 유효성 검사 함수
const validateField = (
  key: keyof PasswordData,
  value: string,
  data: PasswordData,
): string => {
  switch (key) {
    case 'currentPassword':
      if (!value) return PASSWORD_CHANGE_ERROR_MESSAGES.EMPTY_CURRENT_PASSWORD;
      return '';
    case 'newPassword':
      if (!value) return PASSWORD_CHANGE_ERROR_MESSAGES.EMPTY_NEW_PASSWORD;
      if (!validatePassword(value))
        return PASSWORD_CHANGE_ERROR_MESSAGES.WEAK_PASSWORD;
      if (
        data.currentPassword &&
        !validateDifferentPassword(data.currentPassword, value)
      ) {
        return PASSWORD_CHANGE_ERROR_MESSAGES.SAME_AS_CURRENT;
      }
      return '';
    case 'newPasswordConfirm':
      if (!value)
        return PASSWORD_CHANGE_ERROR_MESSAGES.EMPTY_NEW_PASSWORD_CONFIRM;
      if (!validatePasswordConfirm(data.newPassword, value)) {
        return PASSWORD_CHANGE_ERROR_MESSAGES.PASSWORD_MISMATCH;
      }
      return '';
    default:
      return '';
  }
};

export const usePasswordForm = () => {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const [errors, setErrors] = useState<PasswordErrors>({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  // 전체 폼 유효성 검사
  const validateForm = (): boolean => {
    const newErrors: PasswordErrors = {
      currentPassword: validateField(
        'currentPassword',
        passwordData.currentPassword,
        passwordData,
      ),
      newPassword: validateField(
        'newPassword',
        passwordData.newPassword,
        passwordData,
      ),
      newPasswordConfirm: validateField(
        'newPasswordConfirm',
        passwordData.newPasswordConfirm,
        passwordData,
      ),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  // onChange 핸들러
  const onPasswordChange =
    (key: keyof PasswordData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      const updatedData = { ...passwordData, [key]: newValue };
      const errorMessage = validateField(key, newValue, updatedData);

      setPasswordData(updatedData);
      setErrors({ ...errors, [key]: errorMessage });
    };

  // submit 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('비밀번호 변경 API 연결 필요:', passwordData);

      return true;
    } else {
      console.log('유효성 검사 실패');
      return false;
    }
  };

  // 실시간 폼 유효 여부 확인 함수
  const isFormValid = () => {
    return (
      passwordData.currentPassword &&
      passwordData.newPassword &&
      passwordData.newPasswordConfirm &&
      !Object.values(errors).some((error) => error !== '')
    );
  };

  return {
    passwordData,
    errors,
    onPasswordChange,
    handleSubmit,
    isFormValid,
  };
};
