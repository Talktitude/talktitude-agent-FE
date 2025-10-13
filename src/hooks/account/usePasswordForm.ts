import { useState, useMemo } from 'react';
import { PASSWORD_CHANGE_ERROR_MESSAGES } from '@/lib/constants/errorMessages';
import { patchUserPassword } from '@/api/accountApi';

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
  confirmPassword: string;
}

interface PasswordErrors {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
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
    case 'confirmPassword':
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
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<PasswordErrors>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);

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
      confirmPassword: validateField(
        'confirmPassword',
        passwordData.confirmPassword,
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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await patchUserPassword(passwordData);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setErrors({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setModalMessage('비밀번호가 성공적으로 변경되었습니다.');
        setIsSuccess(true);
        setIsPasswordChangeModalOpen(true);
        return true;
      } catch (error) {
        const errorMessage =
          typeof error === 'string'
            ? error
            : '비밀번호 변경에 실패했습니다.\n다시 시도해주세요.';
        setModalMessage(errorMessage);
        setIsSuccess(false);
        setIsPasswordChangeModalOpen(true);
        return false;
      }
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
      passwordData.confirmPassword &&
      !Object.values(errors).some((error) => error !== '')
    );
  };

  const disabled = useMemo(() => {
    return (
      Object.values(passwordData).some((v) => v.trim() === '') ||
      Object.values(errors).some((error) => error !== '')
    );
  }, [passwordData, errors]);

  return {
    passwordData,
    errors,
    onPasswordChange,
    handleSubmit,
    isFormValid,
    disabled,
    modalMessage,
    isSuccess,
    isPasswordChangeModalOpen,
    setIsPasswordChangeModalOpen,
  };
};
