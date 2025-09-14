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
  const [searchResultItems, setSearchResultItems] = useState<ReportItemType[]>(
    [],
  );
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSearchReport = async () => {
    if (!searchValue.trim()) return;

    const fetchReportSearch = async () => {
      const response = await getReportListBySearch(searchValue, date || '');
      // 검색 모드
      setSearchResultItems(response.data);
      setIsSearchMode(true);
    };
    fetchReportSearch();
  };

  const handleChangeReport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // 검색어 비어있는 경우 검색 모드 false로 변경
    if (!e.target.value.trim()) {
      setIsSearchMode(false);
      setSearchResultItems([]);
    }
  };

  useEffect(() => {
    const fetchReportList = async (date: string) => {
      const response = await getReportList(date || '');
      setReportListItems(response.data);
    };
    fetchReportList(date || '');
    // 날짜 변경 시 검색 모드 해제, 검색 결과 초기화
    setIsSearchMode(false);
    setSearchResultItems([]);
    setSearchValue('');
  }, [date]);

  return {
    reportListItems,
    handleSearchReport,
    handleChangeReport,
    searchValue,
    searchResultItems,
    isSearchMode,
  };
};
