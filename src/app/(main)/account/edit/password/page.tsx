'use client';

import Header from '@/components/common/Header';
import SectionHeader from '@/components/support/SectionHeader';
import ChangePasswordForm from '@/components/account/password/ChangePasswordForm';
import { usePasswordForm } from '@/hooks/account/usePasswordForm';

export default function PasswordChangePage() {
  const { passwordData, errors, onPasswordChange, handleSubmit } =
    usePasswordForm();

  return (
    <div>
      <Header />
      <SectionHeader title="비밀번호 변경" />
      <ChangePasswordForm
        passwordData={passwordData}
        errors={errors}
        onPasswordChange={onPasswordChange}
        onChangePasswordSubmit={handleSubmit}
      />
    </div>
  );
}
