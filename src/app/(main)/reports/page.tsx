'use client';

import React from 'react';
import Header from '@/components/common/Header';
import ReportCalendar from '@/components/report/ReportCalendar';
import ReportListPanel from '@/components/report/ReportListPanel';

export default function ReportPage() {
  return (
    <>
      <Header />
      <div className="flex w-full h-[calc(100vh-56px)]">
        <ReportCalendar />
        <ReportListPanel />
      </div>
    </>
  );
}
