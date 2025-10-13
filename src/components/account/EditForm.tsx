import React, { useEffect, useState } from 'react';
import InputField from '../auth/InputField';
import ProfileImage from './ProfileImage';
import { EditFormPropsType } from '@/types/account';
import { useRouter } from 'next/navigation';

const EditForm = ({
  userData,
  currentProfileImageUrl,
  onEditChange,
  onProfileImageChange,
  onEditSubmit,
}: EditFormPropsType) => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const isPasswordEmpty =
    !userData.currentPassword || userData.currentPassword.trim() === '';

  // 프로필 이미지 URL 생성
  useEffect(() => {
    if (userData.profileImage) {
      const url = URL.createObjectURL(userData.profileImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    return setPreviewUrl(
      currentProfileImageUrl ||
        'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
    );
  }, [userData.profileImage, currentProfileImageUrl]);

  return (
    <div className="w-full max-w-[420px] mx-auto py-4">
      <form className="flex flex-col gap-4 h-full" onSubmit={onEditSubmit}>
        <ProfileImage
          profileImageUrl={previewUrl}
          onChangePhoto={onProfileImageChange}
        />
        <InputField
          type="text"
          value={userData.name}
          onChange={onEditChange('name')}
          inputLabel="이름"
          isSignup
        />
        <InputField
          type="text"
          value={userData.phone}
          onChange={onEditChange('phone')}
          inputLabel="전화번호"
          isSignup
        />
        <InputField
          type="email"
          value={userData.email}
          onChange={onEditChange('email')}
          inputLabel="이메일"
          isSignup
        />
        <InputField
          placeholder="정보를 안전하게 보호하기 위해 비밀번호를 입력해주세요."
          type="password"
          value={userData.currentPassword}
          onChange={onEditChange('currentPassword')}
          inputLabel="현재 비밀번호"
          isSignup
        />
        <div className="flex justify-between items-center gap-4 mt-4">
          <button
            className="px-5 py-3 w-[35%] text-l font-semibold rounded-2xl border border-lineGray text-textBlack hover:bg-gray-50"
            type="button"
            onClick={() => router.push('/account/edit/password')}
          >
            비밀번호 변경
          </button>
          <button
            className={`px-5 py-3 flex-1 text-l font-semibold rounded-2xl ${
              isPasswordEmpty
                ? 'bg-lineGray text-white'
                : 'bg-mainColor text-white hover:bg-[#4A66C9]'
            }`}
            type="submit"
            disabled={isPasswordEmpty}
          >
            정보 수정하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
