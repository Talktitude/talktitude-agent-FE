'use client';

import React, { useState, useEffect } from 'react';
import CustomModal from '@/components/common/modal/CustomModal';
import Image from 'next/image';
// import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';
import { getUserInfo, postLogout } from '@/api/accountApi';
import { UserInfoType } from '@/types/account';

interface MyInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MyInfoModal = ({ open, onOpenChange }: MyInfoModalProps) => {
  const [userInfo, setUserInfo] = useState<UserInfoType | null>(null);
  const router = useRouter();

  const handleGoEdit = () => {
    router.push('/account/edit');
    onOpenChange(false);
  };

  const handleLogout = () => {
    try {
      postLogout();
      router.push('/login');
      onOpenChange(false);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      console.error(error);
    }
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
          <div className="relative aspect-square w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={
                userInfo?.profileImageUrl ||
                'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg'
              }
              alt={`${userInfo?.name}의 profile`}
              fill
              unoptimized={true}
              sizes="85px"
              className="object-cover"
            />
          </div>
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
      </CustomModal>
    </div>
  );
};

export default MyInfoModal;
