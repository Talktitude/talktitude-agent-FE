'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LoadingPage from '@/components/common/loading/LoadingPage';
import ErrorPage from '@/components/common/error/ErrorPage';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    setIsAuthed(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading || isAuthed === null) {
    return <LoadingPage />;
  }

  if (!isAuthed) {
    return (
      <ErrorPage
        title="로그인이 필요합니다"
        message={'접근 권한이 없습니다. 로그인 후 이용해 주세요.'}
        actions={
          <>
            <Link
              href="/"
              className="inline-block w-full bg-mainColor hover:bg-[#4A66C9] text-white font-medium py-3 px-6 rounded-2xl transition-colors duration-200"
            >
              로그인 페이지로 이동
            </Link>
          </>
        }
      />
    );
  }

  return <>{children}</>;
}
