'use client';

import React, { useState } from 'react';
import CustomModal from '@/components/common/CustomModal';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { MyInfoModalPropsType } from '@/types/account';

const userInfoData = {
  name: '성윤정',
  loginId: 'ynzung',
  isFiltering: true,
  profileImageUrl:
    'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
};

const MyInfoModal = ({ open, onOpenChange }: MyInfoModalPropsType) => {
  const [userInfo, setUserInfo] = useState(userInfoData);
  const router = useRouter();

  const handleGoEdit = () => {
    router.push('/account/edit');
    onOpenChange(false);
  };

  const handleChangeFiltering = (checked: boolean) => {
    setUserInfo({
      ...userInfo,
      isFiltering: checked,
    });
    console.log(checked);
  };

  const handleLogout = () => {
    // 로그아웃 API 연결
    router.push('/login');
    onOpenChange(false);
  };

  return (
    <div>
      <CustomModal
        open={open}
        onOpenChange={onOpenChange}
        mode="top-right"
        isFooter
        onLogout={handleLogout}
      >
        <div className="flex flex-col items-center gap-2 pt-6 mb-4">
          <Image
            src={userInfo.profileImageUrl}
            alt="profile"
            width={85}
            height={85}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col items-center">
            <span className="text- textBlack text-2xl font-bold">
              {userInfo.name}
            </span>
            <span className="text-textLightGray text-xs font-medium leading-none">
              {userInfo.loginId}
            </span>
          </div>
          <button
            type="button"
            onClick={handleGoEdit}
            className="px-6 py-2 text-l font-semibold rounded-full border border-lineGray text-textBlack hover:bg-gray-50"
          >
            내 정보 수정
          </button>
        </div>
        <div className="flex flex-row items-center justify-between border-y border-lineGray py-4 px-6   ">
          <div className="flex flex-col">
            <div className="text-base font-semibold">필터링 설정</div>
            <div className="text-sm text-textLightGray">
              공손하지 않은 표현을 자동으로 완화해 보여줘요.
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={userInfo.isFiltering}
              onCheckedChange={handleChangeFiltering}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default MyInfoModal;
