import React from 'react';
import { LoginFormPropsType } from '@/types/auth';
import InputField from '../InputField';
import BottomButton from '../BottomButton';
import RememberBox from './RememberBox';
import { LOGIN_PLACEHOLDERS } from '@/lib/constants/placeholders';
import LoadingSpinner from '@/components/common/loading/LoadingSpinner';

const LoginForm = ({
  loginFormData,
  onLoginChange,
  onSubmit,
  keepLoggedIn,
  handleKeepLoggedInClick,
  disabled,
  loginErrorMessage,
  isLoading = false,
}: LoginFormPropsType) => {
  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <InputField
          placeholder={LOGIN_PLACEHOLDERS.ID_INPUT}
          type="text"
          value={loginFormData.loginId}
          onChange={onLoginChange('loginId')}
        />
        <InputField
          placeholder={LOGIN_PLACEHOLDERS.PW_INPUT}
          type="password"
          value={loginFormData.password}
          onChange={onLoginChange('password')}
        />

        <RememberBox
          keepLoggedIn={keepLoggedIn}
          handleKeepLoggedInClick={handleKeepLoggedInClick}
        />
        {loginErrorMessage && (
          <p className="text-textRed text-[13px] font-semibold">
            {loginErrorMessage}
          </p>
        )}
        <BottomButton type="submit" disabled={disabled}>
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner size="sm" color="white" />
              로그인 중...
            </div>
          ) : (
            '로그인'
          )}
        </BottomButton>
      </form>
    </div>
  );
};

export default LoginForm;
