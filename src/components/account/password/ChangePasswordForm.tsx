import InputField from '@/components/auth/InputField';
import { ChangePasswordFormPropsType } from '@/types/account';
import BottomButton from '@/components/auth/BottomButton';

const ChangePasswordForm = ({
  passwordData,
  errors,
  onPasswordChange,
  onChangePasswordSubmit,
}: ChangePasswordFormPropsType) => {
  const isPasswordEmpty =
    !passwordData.currentPassword ||
    !passwordData.newPassword ||
    !passwordData.newPasswordConfirm;

  const hasErrors = Object.values(errors).some((error) => error !== '');

  return (
    <div className="w-full max-w-[420px] mx-auto py-6 h-[calc(100vh-120px)]">
      <form
        className="flex flex-col justify-between h-full"
        onSubmit={onChangePasswordSubmit}
      >
        <div className="flex flex-col gap-4">
          <div>
            <InputField
              type="password"
              value={passwordData.currentPassword}
              onChange={onPasswordChange('currentPassword')}
              inputLabel="현재 비밀번호"
              placeholder="현재 비밀번호를 입력해주세요."
              isSignup
              errorMessage={errors.currentPassword}
            />
          </div>
          <div>
            <InputField
              type="password"
              value={passwordData.newPassword}
              onChange={onPasswordChange('newPassword')}
              inputLabel="새 비밀번호"
              placeholder="새 비밀번호를 입력해주세요."
              isSignup
              errorMessage={errors.newPassword}
            />
          </div>
          <div>
            <InputField
              type="password"
              value={passwordData.newPasswordConfirm}
              onChange={onPasswordChange('newPasswordConfirm')}
              inputLabel="새 비밀번호 확인"
              placeholder="새 비밀번호를 다시 입력해주세요."
              isSignup
              errorMessage={errors.newPasswordConfirm}
            />
          </div>
        </div>
        <div className="mt-8">
          <BottomButton type="submit" disabled={isPasswordEmpty || hasErrors}>
            비밀번호 변경하기
          </BottomButton>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
