'use client';

import React from 'react';
import ReportList from './ReportList';
import SearchInput from '@/components/common/SearchInput';
import { useReportList } from '@/hooks/report/useReportList';

const ReportListPanel = () => {
  const {
    reportListItems,
    handleSearchReport,
    handleChangeReport,
    searchValue,
  } = useReportList();

  return (
    <div className="flex flex-col overflow-y-auto h-full w-[50%] bg-white p-3">
      <SearchInput
        onSearchClick={() => {
          handleSearchReport();
        }}
        onChange={handleChangeReport}
        value={searchValue}
      />
      <ReportList reportListItems={reportListItems} />
    </div>
  );
};

export default ReportListPanel;
