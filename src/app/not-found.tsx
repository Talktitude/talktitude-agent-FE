'use client';

import React from 'react';
import Link from 'next/link';
import ErrorPage from '@/components/common/error/ErrorPage';

export default function NotFound() {
  const actions = (
    <>
      <Link
        href="/support"
        className="inline-block w-full bg-mainColor hover:bg-[#4A66C9] text-white font-medium py-3 px-6 rounded-2xl transition-colors duration-200"
      >
        메인 페이지로 돌아가기
      </Link>

      <button
        onClick={() => window.history.back()}
        className="inline-block w-full bg-gray-100 hover:bg-gray-200 text-textGray font-medium py-3 px-6 rounded-2xl transition-colors duration-200"
      >
        이전 페이지로
      </button>
    </>
  );

  return (
    <ErrorPage
      title="404"
      message="에러가 발생했어요."
      subMessage={
        '존재하지 않는 주소를 입력하셨거나 \n 요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없어요.'
      }
      actions={actions}
    />
  );
}
