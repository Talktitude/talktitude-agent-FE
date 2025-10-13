import React, { useRef } from 'react';
import { ProfileImagePropsType } from '@/types/account';
import Image from 'next/image';

const ProfileImage = ({
  profileImageUrl,
  onChangePhoto,
}: ProfileImagePropsType) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChangePhoto(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-[420px] mx-auto flex items-center justify-start gap-6 mb-2">
      <div className="w-20 h-20 border border-lineGray rounded-full flex items-center justify-center">
        <Image
          src={
            profileImageUrl ||
            'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg'
          }
          alt="profile"
          width={82}
          height={82}
          className="text-white rounded-full object-cover w-full h-full"
        />
      </div>
      <button
        type="button"
        onClick={handleButtonClick}
        className="px-6 py-2 text-l font-semibold rounded-full border border-lineGray text-textBlack hover:bg-gray-50"
      >
        사진 변경하기
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ProfileImage;
