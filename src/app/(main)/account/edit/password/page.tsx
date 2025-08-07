'use client';

import { useState } from 'react';
import Header from '@/components/common/Header';
import SectionHeader from '@/components/support/SectionHeader';
import ChangePasswordForm from '@/components/account/password/ChangePasswordForm';

export default function PasswordChangePage() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const onPasswordChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordData({
        ...passwordData,
        [key]: e.target.value,
      });
    };

  const onChangePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(passwordData);
  };

  return (
    <div>
      <Header />
      <SectionHeader title="비밀번호 변경" />
      <ChangePasswordForm
        passwordData={passwordData}
        onPasswordChange={onPasswordChange}
        onChangePasswordSubmit={onChangePasswordSubmit}
      />
    </div>
  );
}
