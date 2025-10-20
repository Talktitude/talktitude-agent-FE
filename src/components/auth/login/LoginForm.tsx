import React from 'react';
import InputField from '../InputField';
import BottomButton from '../BottomButton';
import RememberBox from './RememberBox';
import { LOGIN_PLACEHOLDERS } from '@/lib/constants/placeholders';
import LoadingSpinner from '@/components/common/loading/LoadingSpinner';

export interface LoginFormProps {
  loginFormData: {
    loginId: string;
    password: string;
  };
  onLoginChange: (
    key: string,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void; // 로그인 아이디 또는 비밀번호 변경 함수 연결
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // 로그인 폼 제출 함수 연결
  keepLoggedIn: boolean; // 로그인 유지 체크박스 상태
  handleKeepLoggedInClick: () => void; // 로그인 유지 토큰 설정 로직 함수 연결
  disabled: boolean; // 로그인 버튼 비활성화 상태
  loginErrorMessage: string; // 로그인 에러 메시지
  isLoading?: boolean; // 로딩 상태
}

const LoginForm = ({
  loginFormData,
  onLoginChange,
  onSubmit,
  keepLoggedIn,
  handleKeepLoggedInClick,
  disabled,
  loginErrorMessage,
  isLoading = false,
}: LoginFormProps) => {
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
