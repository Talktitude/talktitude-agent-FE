'use client';

import React, { useState, useEffect } from 'react';
import CustomModal from '@/components/common/modal/CustomModal';
import Image from 'next/image';
// import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { MyInfoModalPropsType } from '@/types/account';
import { getUserInfo } from '@/api/accountApi';
import { UserInfoType } from '@/types/account';

const MyInfoModal = ({ open, onOpenChange }: MyInfoModalPropsType) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const router = useRouter();

  const handleGoEdit = () => {
    router.push('/account/edit');
    onOpenChange(false);
  };

  // const handleChangeFiltering = (checked: boolean) => {
  //   setUserInfo({
  //     ...userInfo,
  //     isFiltering: checked,
  //   });
  //   console.log(checked);
  // };

  const handleLogout = () => {
    router.push('/login');
    onOpenChange(false);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await getUserInfo();
      setUserInfo(response.data);
    };
    fetchUserInfo();
  }, []);

  return (
    <div>
      <CustomModal
        open={open}
        onOpenChange={onOpenChange}
        mode="top-right"
        isFooter
        onLogout={handleLogout}
      >
        <div className="flex flex-col items-center gap-2 pt-6 border-b border-lineGray pb-4">
          <Image
            src={
              userInfo?.profileImageUrl ||
              'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg'
            }
            alt="profile"
            width={85}
            height={85}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col items-center">
            <span className="text- textBlack text-2xl font-bold">
              {userInfo?.name}
            </span>
            <span className="text-textLightGray text-xs font-medium leading-none">
              {userInfo?.email}
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
        {/* <div className="flex flex-row items-center justify-between border-y border-lineGray py-4 px-6   ">
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
        </div> */}
      </CustomModal>
    </div>
  );
};

export default MyInfoModal;
