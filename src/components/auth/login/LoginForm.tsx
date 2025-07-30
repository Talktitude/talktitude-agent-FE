import React from 'react';
import { LoginFormPropsType } from '@/types/auth';
import InputField from '../InputField';
import { BottomButton } from '../BottomButton';
import RememberBox from './RememberBox';
import { PLACEHOLDERS } from '@/lib/constants/placeholders';

const LoginForm = ({
  loginFormData,
  onIdChange,
  onPasswordChange,
  onSubmit,
  keepLoggedIn,
  handleKeepLoggedInClick,
  disabled,
  isEmptyLogin,
  loginErrorMessage,
}: LoginFormPropsType) => {
  return (
    <div className="w-full max-w-[420px]">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputField
          placeholder={PLACEHOLDERS.ID_INPUT}
          type="text"
          value={loginFormData.loginId}
          onChange={onIdChange}
        />
        <InputField
          placeholder={PLACEHOLDERS.PW_INPUT}
          type="password"
          value={loginFormData.password}
          onChange={onPasswordChange}
        />

        <RememberBox
          keepLoggedIn={keepLoggedIn}
          handleKeepLoggedInClick={handleKeepLoggedInClick}
        />
        {isEmptyLogin && (
          <p className="text-textRed text-sm font-semibold">
            {loginErrorMessage}
          </p>
        )}
        <BottomButton type="submit" disabled={disabled}>
          로그인
        </BottomButton>
      </form>
    </div>
  );
};

export default LoginForm;
