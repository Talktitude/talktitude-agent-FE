import React from 'react';

// 로그인, 회원가입, 내 정보 수정 공통 인터페이스 (input 필드, 버튼)
interface InputFieldProps {
  placeholder?: string; // 입력 필드 플레이스홀더
  type: string; // 입력 필드 타입
  value: string; // 입력 필드 값
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 입력 필드 값 변경 함수
  onBlur?: () => void; // 입력 필드 포커스 아웃 함수
  isSignup?: boolean; // 회원가입 페이지 여부
  inputLabel?: string; // 입력 필드 라벨
  errorMessage?: string; // 입력 필드 에러 메시지
  successMessage?: string; // 입력 필드 성공 메시지
  handleCheckId?: (loginId: string) => void; // 아이디 중복 확인 함수
}

function InputField({
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  isSignup,
  inputLabel,
  errorMessage,
  successMessage,
  handleCheckId,
}: InputFieldProps) {
  return (
    <div className="flex-1 flex flex-col gap-1.5">
      {isSignup && (
        <label className="text-base font-bold text-textBlack">
          {inputLabel}
        </label>
      )}
      <div className="flex flex-row gap-1.5 w-full">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`flex-1 h-12 px-5 py-3.5 text-textBlack text-sm font-medium outline-none shadow-inputShadow rounded-[20px] border-[1px] ${
            errorMessage
              ? 'border-textRed focus:border-textRed'
              : 'border-lineGray focus:border-mainColor'
          }`}
        />
        {handleCheckId && (
          <button
            className="h-12 bg-mainColor text-base font-semibold text-white rounded-[20px] px-5 py-2 justify-center items-center"
            onClick={() => handleCheckId(value)}
            type="button"
          >
            중복 확인
          </button>
        )}
      </div>
      {errorMessage ? (
        <p className="text-textRed text-xs font-medium ml-1">{errorMessage}</p>
      ) : successMessage ? (
        <p className="text-mainColor text-xs font-medium ml-1">
          {successMessage}
        </p>
      ) : null}
    </div>
  );
}

export default InputField;
