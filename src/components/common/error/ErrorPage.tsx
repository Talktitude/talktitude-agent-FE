import React from 'react';
import Header from '../Header';

interface ErrorPageProps {
  title: string;
  message: string;
  subMessage?: string;
  actions: React.ReactNode;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title,
  message,
  subMessage,
  actions,
}) => {
  const errorcode = Number(title);
  return (
    <div className="min-h-screen bg-white">
      <Header showNavItems={false} />
      <div className="h-[calc(100vh-60px)] text-center flex flex-col items-center justify-center max-w-md mx-auto">
        {/* 에러 메시지 */}
        <div className="mb-8">
          <h1
            className={`${
              errorcode ? 'text-6xl' : 'text-2xl'
            } text-textLightGray font-bold mb-2`}
          >
            {title}
          </h1>
          <p className="text-[#C5C6CB] font-bold mb-4 whitespace-pre-line">
            {message}
          </p>
          <p className="text-[#C5C6CB] font-semibold mb-4 whitespace-pre-line">
            {subMessage}
          </p>
        </div>

        {/* 액션 버튼 들어가는 곳 */}
        <div className="space-y-4">{actions}</div>
      </div>
    </div>
  );
};

export default ErrorPage;
