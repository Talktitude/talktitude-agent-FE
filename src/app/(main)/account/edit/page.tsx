'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import SectionHeader from '@/components/support/SectionHeader';
import EditForm from '@/components/account/EditForm';
import ProfileImage from '@/components/account/ProfileImage';
import ConfirmDeleteAccountModal from '@/components/account/ConfirmDeleteAccountModal';
import { getUserInfo } from '@/api/accountApi';
import { UserInfoType, EditUserData } from '@/types/account';

export default function AccountEditPage() {
  const [userData, setUserData] = useState<EditUserData>({
    name: '',
    phone: '',
    email: '',
    password: '',
    profileImageUrl: '',
  });

  const onEditChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [key]: e.target.value });
    };

  const onEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userData);
  };

  const handleChangePhoto = () => {
    // 파일 선택 dialog 열기
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Selected file:', file.name);
        // 파일로 이미지 변경 구현
        setUserData({
          ...userData,
          profileImageUrl: URL.createObjectURL(file),
        });
      }
    };
    input.click();
  };
  const [isConfirmDeleteAccountModalOpen, setIsConfirmDeleteAccountModalOpen] =
    useState(false);

  const handleDeleteAccount = () => {
    setIsConfirmDeleteAccountModalOpen(true);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await getUserInfo();
      const data: UserInfoType = response.data;
      setUserData({
        name: data.name,
        phone: data.phoneNum,
        email: data.email,
        password: '',
        profileImageUrl: data.profileImageUrl,
      });
    };
    fetchUserInfo();
  }, []);

  return (
    <div>
      <Header />
      <SectionHeader title="내 정보 수정" />
      <div className="py-6">
        <ProfileImage
          profileImageUrl={
            userData.profileImageUrl ||
            'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg'
          }
          onChangePhoto={handleChangePhoto}
        />
        <EditForm
          userData={userData}
          onEditChange={onEditChange}
          onEditSubmit={onEditSubmit}
        />
        <div className="max-w-[420px] mx-auto mt-6">
          <button
            className="text-xs font-medium rounded-full underline text-textLightGray"
            onClick={handleDeleteAccount}
          >
            탈퇴하기
          </button>
        </div>
      </div>
      {isConfirmDeleteAccountModalOpen && (
        <ConfirmDeleteAccountModal
          open={isConfirmDeleteAccountModalOpen}
          onOpenChange={setIsConfirmDeleteAccountModalOpen}
        />
      )}
    </div>
  );
}
