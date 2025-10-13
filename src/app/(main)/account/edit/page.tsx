'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import SectionHeader from '@/components/support/SectionHeader';
import EditForm from '@/components/account/EditForm';
import ConfirmDeleteAccountModal from '@/components/account/ConfirmDeleteAccountModal';
import CustomModal from '@/components/common/modal/CustomModal';
import { SingleConfirmButton } from '@/components/common/modal/ModalButtonGroup';
import { getUserInfo, patchUserProfileInfo } from '@/api/accountApi';
import { UserInfoType, EditFormPropsType } from '@/types/account';

export default function AccountEditPage() {
  const [userData, setUserData] = useState<EditFormPropsType['userData']>({
    name: '',
    phone: '',
    email: '',
    currentPassword: '',
    profileImage: null,
  });
  const [currentProfileImageUrl, setCurrentProfileImageUrl] =
    useState<string>('');
  const [isProfileEditModalOpen, setIsProfileEditModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);

  const onEditChange =
    (key: 'name' | 'phone' | 'email' | 'currentPassword') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserData({ ...userData, [key]: e.target.value });
    };

  const onProfileImageChange = (file: File) => {
    setUserData({ ...userData, profileImage: file });
  };

  const onEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await patchUserProfileInfo({
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        currentPassword: userData.currentPassword,
        profileImage: userData.profileImage || undefined,
      });
      setModalMessage('프로필 정보가 성공적으로 수정되었습니다.');
      setIsSuccess(true);
      setIsProfileEditModalOpen(true);
      // 비밀번호 필드만 초기화
      setUserData((prev) => ({ ...prev, currentPassword: '' }));

      // 헤더의 사용자 정보 업데이트를 위한 이벤트 발생
      window.dispatchEvent(new CustomEvent('userInfoUpdated'));
    } catch (error) {
      // accountApi.ts에서 처리된 에러 메시지 사용
      const errorMessage =
        typeof error === 'string'
          ? { error: error + '\n다시 시도해주세요.' }
          : { error: '프로필 수정에 실패했습니다.\n다시 시도해주세요.' };
      setModalMessage(errorMessage.error);
      setIsSuccess(false);
      setIsProfileEditModalOpen(true);
    }
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
        currentPassword: '',
        profileImage: null,
      });
      setCurrentProfileImageUrl(data.profileImageUrl);
    };
    fetchUserInfo();
  }, []);

  return (
    <div>
      <Header />
      <SectionHeader title="내 정보 수정" />
      <div className="py-6">
        <EditForm
          userData={userData}
          currentProfileImageUrl={currentProfileImageUrl}
          onEditChange={onEditChange}
          onProfileImageChange={onProfileImageChange}
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
      {isProfileEditModalOpen && (
        <CustomModal
          open={isProfileEditModalOpen}
          onOpenChange={setIsProfileEditModalOpen}
          mode="center"
          isAlert={isSuccess}
          isWarning={!isSuccess}
        >
          <div className="text-center p-8 bg-bgLightBlue rounded-b-3xl">
            <div className="pb-8">
              <p
                className={`text-lg font-semibold whitespace-pre-line ${
                  isSuccess ? 'text-textBlack' : 'text-textRed'
                }`}
              >
                {modalMessage}
              </p>
            </div>
            <SingleConfirmButton
              onConfirm={() => setIsProfileEditModalOpen(false)}
              confirmText="확인"
              variant={isSuccess ? 'confirm' : 'warning'}
            />
          </div>
        </CustomModal>
      )}
    </div>
  );
}
