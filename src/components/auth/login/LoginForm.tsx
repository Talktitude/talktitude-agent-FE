import React from 'react';
import { LoginFormPropsType } from '@/types/auth';
import InputField from '../InputField';
import BottomButton from '../BottomButton';
import RememberBox from './RememberBox';
import { PLACEHOLDERS } from '@/lib/constants/placeholders';

const LoginForm = ({
  loginFormData,
  onLoginChange,
  onSubmit,
  keepLoggedIn,
  handleKeepLoggedInClick,
  disabled,
  loginErrorMessage,
}: LoginFormPropsType) => {
  return (
    <div className="w-full max-w-[420px]">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputField
          placeholder={PLACEHOLDERS.ID_INPUT}
          type="text"
          value={loginFormData.loginId}
          onChange={onLoginChange('loginId')}
        />
        <InputField
          placeholder={PLACEHOLDERS.PW_INPUT}
          type="password"
          value={loginFormData.password}
          onChange={onLoginChange('password')}
        />

        <RememberBox
          keepLoggedIn={keepLoggedIn}
          handleKeepLoggedInClick={handleKeepLoggedInClick}
        />
        {disabled && (
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
