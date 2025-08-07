'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import SectionHeader from '@/components/support/SectionHeader';
import EditForm from '@/components/account/EditForm';
import ProfileImage from '@/components/account/ProfileImage';

export default function AccountEditPage() {
  const [userData, setUserData] = useState({
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
    name: '성윤정',
    phone: '010-1234-5678',
    email: 'yjseong@gmail.com',
    password: '',
  });

  const onEditChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [key]: e.target.value });
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

  return (
    <div>
      <Header />
      <SectionHeader title="내 정보 수정" />
      <div className="py-6">
        <ProfileImage
          profileImageUrl={userData.profileImageUrl}
          onChangePhoto={handleChangePhoto}
        />
        <EditForm userData={userData} onEditChange={onEditChange} />
        <div className="max-w-[420px] mx-auto mt-6">
          <button className="text-xs font-medium rounded-full underline text-textLightGray">
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}
