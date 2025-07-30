import React from 'react';
import { InputFieldPropsType } from '@/types/login';

function InputField({
  placeholder,
  type,
  value,
  onChange,
}: InputFieldPropsType) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full h-12 px-5 py-3.5 text-textBlack text-base font-medium outline-none shadow-inputShadow rounded-[20px] border-[1px] border-lineGray focus:border-[1px] focus:border-mainColor"
    />
  );
}

export default InputField;
