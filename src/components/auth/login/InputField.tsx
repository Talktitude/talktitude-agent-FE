import React from 'react';
import { InputFieldPropsType } from '@/types/auth';

function InputField({
  placeholder,
  type,
  value,
  onChange,
  isSignup,
  inputLabel,
}: InputFieldPropsType) {
  return (
    <div className="flex flex-col gap-2">
      {isSignup && (
        <label className="text-xl font-bold text-textBlack">{inputLabel}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full h-12 px-5 py-3.5 text-textBlack text-base font-medium outline-none shadow-inputShadow rounded-[20px] border-[1px] border-lineGray focus:border-[1px] focus:border-mainColor"
      />
    </div>
  );
}

export default InputField;
