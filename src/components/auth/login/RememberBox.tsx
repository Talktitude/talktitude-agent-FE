import React from 'react';
import { RememberBoxPropsType } from '@/types/auth';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircle } from 'react-icons/io5';

const RememberBox = ({
  keepLoggedIn,
  handleKeepLoggedInClick,
}: RememberBoxPropsType) => {
  return (
    <div className="flex items-center gap-1 group">
      <button
        type="button"
        onClick={handleKeepLoggedInClick}
        className="flex items-center justify-center w-5 h-5"
      >
        {keepLoggedIn ? (
          <IoCheckmarkCircle className="w-5 h-5" color="#5573E2" />
        ) : (
          <IoCheckmarkCircleOutline className="w-5 h-5 text-textLightGray group-hover:text-textGray transition-colors" />
        )}
      </button>
      <label
        onClick={handleKeepLoggedInClick}
        className={`text-base font-medium cursor-pointer select-none ${
          keepLoggedIn
            ? 'text-textBlack'
            : 'text-textLightGray group-hover:text-textGray transition-colors'
        }`}
      >
        로그인 상태 유지
      </label>
    </div>
  );
};

export default RememberBox;
