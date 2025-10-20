interface BottomButtonProps {
  type?: 'submit' | 'button'; // 버튼 타입
  disabled?: boolean; // 버튼 비활성화 상태
  className?: string; // 버튼 클래스 이름
  onClick?: () => void; // 버튼 클릭 함수
  children: React.ReactNode; // 버튼 자식 요소
}

export default function BottomButton({
  disabled,
  type,
  className,
  onClick,
  children,
}: BottomButtonProps) {
  const loginStyle = disabled
    ? 'bg-lineGray text-white'
    : 'bg-mainColor text-white hover:bg-[#4A66C9]';
  const signupStyle =
    'bg-white text-mainColor border border-mainColor hover:bg-mainColor hover:text-white';
  return (
    <button
      onClick={onClick}
      aria-disabled={disabled}
      className={`w-full h-14 px-auto py-3.5 rounded-[20px] text-base font-bold flex items-center justify-center ${
        type === 'submit' ? loginStyle : signupStyle
      } ${className}`}
    >
      {children}
    </button>
  );
}
