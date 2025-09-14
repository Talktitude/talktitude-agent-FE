import React from 'react';
import { ProfileImagePropsType } from '@/types/account';
import Image from 'next/image';

const ProfileImage = ({
  profileImageUrl,
  onChangePhoto,
}: ProfileImagePropsType) => {
  return (
    <div className="max-w-[420px] mx-auto flex items-center justify-start gap-6 mb-2">
      <div className="w-20 h-20 border border-lineGray rounded-full flex items-center justify-center">
        <Image
          src={profileImageUrl}
          alt="profile"
          width={82}
          height={82}
          className="text-white rounded-full object-cover w-full h-full"
        />
      </div>
      <button
        type="button"
        onClick={onChangePhoto}
        className="px-6 py-2 text-l font-semibold rounded-full border border-lineGray text-textBlack hover:bg-gray-50"
      >
        사진 변경하기
      </button>
    </div>
  );
};

export default ProfileImage;
