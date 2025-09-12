import { PLACEHOLDERS } from '@/lib/constants/placeholders';
import React, { useState } from 'react';
import { IoMdArrowRoundUp } from 'react-icons/io';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  forcedRefresh?: boolean;
}

export default function ChatInput({
  onSendMessage,
  value: externalValue,
  onChange: externalOnChange,
  disabled,
  forcedRefresh,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const isDisabled = !!disabled;

  // 외부에서 제어하는 경우(추천 답변 선택 시) 내부에서 제어하는 경우(기본 입력 시) 구분하여 값 설정
  const inputValue = externalValue !== undefined ? externalValue : message;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    const newValue = e.target.value;
    if (externalOnChange) {
      externalOnChange(newValue);
    } else {
      setMessage(newValue);
    }
  };

  const handleSendMessage = () => {
    if (isDisabled || !inputValue.trim()) return;

    onSendMessage(inputValue);
    if (!externalOnChange) {
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="sticky bottom-0 flex items-center justify-center w-full bg-white border-t border-lineGray px-5 py-3.5">
      <input
        placeholder={
          isDisabled
            ? PLACEHOLDERS.CHAT_INPUT_FINISHED
            : PLACEHOLDERS.CHAT_INPUT
        }
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={isDisabled || forcedRefresh}
        className="w-full h-12 px-5 py-3 text-textBlack text-base font-medium outline-none shadow-inputShadow rounded-[1.25rem] border-[1px] border-lineGray focus:border-[1px] focus:border-mainColor resize-none flex-1"
      />
      <button
        className={`ml-3 flex h-10 w-10 items-center justify-center rounded-full ${
          !isDisabled && inputValue.trim() && !forcedRefresh
            ? 'bg-mainColor'
            : 'bg-lineGray cursor-not-allowed'
        }`}
        onClick={handleSendMessage}
        disabled={isDisabled || !inputValue.trim() || forcedRefresh}
      >
        <IoMdArrowRoundUp size={30} color="white" />
      </button>
    </div>
  );
}
