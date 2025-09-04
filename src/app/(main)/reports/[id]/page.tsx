'use client';

import React from 'react';
import Header from '@/components/common/Header';
import ReportCalendar from '@/components/report/ReportCalendar';
import ReportDetailPanel from '@/components/report/detail/ReportDetailPanel';

export default function ReportDetailPage() {
  return (
    <>
      <Header />
      <div className="flex w-full h-[calc(100vh-60px)] bg-bgLightBlue overflow-hidden">
        <ReportCalendar />
        <ReportDetailPanel />
      </div>
    </>
  );
}
