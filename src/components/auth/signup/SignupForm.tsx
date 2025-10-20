import React from 'react';
import InputField from '../InputField';
import { SIGNUP_PLACEHOLDERS } from '@/lib/constants/placeholders';
import BottomButton from '../BottomButton';

// 회원가입 폼 타입
export interface SignupFormProps {
  signupFormData: {
    loginId: string;
    password: string;
    passwordConfirm: string;
    name: string;
    phone: string;
    email: string;
  };
  errors?: Record<string, string>;
  successMessages?: Record<string, string>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onSignupChange: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (key: string) => () => void;
  handleCheckId: (loginId: string) => void;
  disabled: boolean;
}

const SignupForm = ({
  signupFormData,
  errors,
  successMessages,
  onSubmit,
  onSignupChange,
  handleBlur,
  handleCheckId,
  disabled,
}: SignupFormProps) => {
  return (
    <div className="w-full max-w-[420px]">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <InputField
          placeholder={SIGNUP_PLACEHOLDERS.ID_INPUT}
          type="text"
          value={signupFormData.loginId}
          onChange={onSignupChange('loginId')}
          onBlur={handleBlur('loginId')}
          isSignup
          inputLabel="아이디"
          errorMessage={errors?.loginId}
          successMessage={successMessages?.loginId}
          handleCheckId={() => handleCheckId(signupFormData.loginId)}
        />
        <InputField
          placeholder={SIGNUP_PLACEHOLDERS.PW_INPUT}
          type="password"
          value={signupFormData.password}
          onChange={onSignupChange('password')}
          onBlur={handleBlur('password')}
          isSignup
          inputLabel="비밀번호"
          errorMessage={errors?.password}
        />
        <InputField
          placeholder={SIGNUP_PLACEHOLDERS.PW_CONFIRM_INPUT}
          type="password"
          value={signupFormData.passwordConfirm}
          onChange={onSignupChange('passwordConfirm')}
          onBlur={handleBlur('passwordConfirm')}
          isSignup
          inputLabel="비밀번호 확인"
          errorMessage={errors?.passwordConfirm}
        />
        <InputField
          placeholder={SIGNUP_PLACEHOLDERS.NAME_INPUT}
          type="text"
          value={signupFormData.name}
          onChange={onSignupChange('name')}
          onBlur={handleBlur('name')}
          isSignup
          inputLabel="이름"
          errorMessage={errors?.name}
        />
        <InputField
          placeholder={SIGNUP_PLACEHOLDERS.PHONE_INPUT}
          type="text"
          value={signupFormData.phone}
          onChange={onSignupChange('phone')}
          onBlur={handleBlur('phone')}
          isSignup
          inputLabel="전화번호"
          errorMessage={errors?.phone}
        />
        <InputField
          placeholder={SIGNUP_PLACEHOLDERS.EMAIL_INPUT}
          type="email"
          value={signupFormData.email}
          onChange={onSignupChange('email')}
          onBlur={handleBlur('email')}
          isSignup
          inputLabel="이메일"
          errorMessage={errors?.email}
        />
        <div className="pt-6">
          <BottomButton type="submit" disabled={disabled}>
            회원가입
          </BottomButton>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
