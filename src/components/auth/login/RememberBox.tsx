import React from 'react';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoCheckmarkCircle } from 'react-icons/io5';

// 로그인 유지 체크박스 타입
interface RememberBoxProps {
  keepLoggedIn: boolean; // 로그인 유지 체크박스 상태
  handleKeepLoggedInClick: () => void; // 로그인 유지 토큰 설정 로직 함수 연결
}

const RememberBox = ({
  keepLoggedIn,
  handleKeepLoggedInClick,
}: RememberBoxProps) => {
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
