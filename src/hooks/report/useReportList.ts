'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  getReportListBySearch,
  getReportList,
} from '@/api/report/reportListApi';
import { ReportItemType } from '@/types/reports';

export const useReportList = () => {
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

  return {
    reportListItems,
    handleSearchReport,
    handleChangeReport,
    searchValue,
  };
};
