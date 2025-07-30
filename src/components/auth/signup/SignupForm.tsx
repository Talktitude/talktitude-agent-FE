import React from 'react';
import InputField from '../InputField';
import { SIGNUP_PLACEHOLDERS } from '@/lib/constants/placeholders';
import { SignupFormPropsType } from '@/types/auth';
import BottomButton from '../BottomButton';

const SignupForm = ({
  signupFormData,
  onSubmit,
  onSignupChange,
  handleCheckId,
  disabled,
}: SignupFormPropsType) => {
  return (
    <div className="w-full max-w-[420px]">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <div className="flex flex-row items-end gap-1.5 w-full">
          <InputField
            placeholder={SIGNUP_PLACEHOLDERS.ID_INPUT}
            type="text"
            value={signupFormData.loginId}
            onChange={onSignupChange('loginId')}
            isSignup
            inputLabel="아이디"
          />
          <button
            className="h-12 bg-mainColor text-base font-semibold text-white rounded-[20px] px-5 py-2 justify-center items-center"
            onClick={() => handleCheckId(signupFormData.loginId)}
            type="button"
          >
            중복 확인
          </button>
        </div>
        <InputField
          placeholder={SIGNUP_PLACEHOLDERS.PW_INPUT}
          type="password"
          value={signupFormData.password}
          onChange={onSignupChange('password')}
          isSignup
          inputLabel="비밀번호"
        />
        <InputField
          placeholder={SIGNUP_PLACEHOLDERS.PW_CONFIRM_INPUT}
          type="password"
          value={signupFormData.password1}
          onChange={onSignupChange('password1')}
          isSignup
          inputLabel="비밀번호 확인"
        />
        <InputField
          placeholder={SIGNUP_PLACEHOLDERS.NAME_INPUT}
          type="text"
          value={signupFormData.name}
          onChange={onSignupChange('name')}
          isSignup
          inputLabel="이름"
        />
        <InputField
          placeholder={SIGNUP_PLACEHOLDERS.PHONE_INPUT}
          type="text"
          value={signupFormData.phone}
          onChange={onSignupChange('phone')}
          isSignup
          inputLabel="전화번호"
        />
        <InputField
          placeholder={SIGNUP_PLACEHOLDERS.EMAIL_INPUT}
          type="email"
          value={signupFormData.email}
          onChange={onSignupChange('email')}
          isSignup
          inputLabel="이메일"
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
