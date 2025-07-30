import { BottomButtonPropsType } from '@/types/login';

export const BottomButton = ({
  disabled,
  type,
  className,
  onClick,
  children,
}: BottomButtonPropsType) => {
  const loginStyle = disabled
    ? 'bg-lineGray text-white'
    : 'bg-mainColor text-white hover:bg-mainColor/80';
  const signupStyle =
    'bg-white text-mainColor border border-mainColor hover:bg-mainColor hover:text-white';
  return (
    <button
      onClick={onClick}
      aria-disabled={disabled}
      className={`w-full h-14 px-40 py-3.5 rounded-[20px] text-base font-bold ${
        type === 'submit' ? loginStyle : signupStyle
      } ${className}`}
    >
      {children}
    </button>
  );
};
