'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ReportList from './ReportList';
import SearchInput from '@/components/common/SearchInput';
import { ReportItemType } from '@/types/reports';
import {
  getReportListBySearch,
  getReportList,
} from '@/api/report/reportListApi';

const ReportListPanel = () => {
  const [searchValue, setSearchValue] = useState('');
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const [reportListItems, setReportListItems] = useState<ReportItemType[]>([]);

  const handleSearchReport = async () => {
    const response = await getReportListBySearch(searchValue, date || '');
    setReportListItems(response.data);
    setSearchValue('');
  };
  const handleChangeReport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    const fetchReportList = async (date: string) => {
      const response = await getReportList(date || '');
      setReportListItems(response.data);
    };
    fetchReportList(date || '');
  }, [date]);

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
