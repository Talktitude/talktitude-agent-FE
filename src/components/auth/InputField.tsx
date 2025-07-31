import React from 'react';
import { InputFieldPropsType } from '@/types/auth';

function InputField({
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  isSignup,
  inputLabel,
  errorMessage,
  handleCheckId,
}: InputFieldPropsType) {
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
      {errorMessage && (
        <p className="text-textRed text-xs font-medium ml-1">{errorMessage}</p>
      )}
    </div>
  );
}

export default InputField;
