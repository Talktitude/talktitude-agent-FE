'use client';

import React, { useState } from 'react';
import ReportList from './ReportList';
import SearchInput from '@/components/common/SearchInput';

const ReportListPanel = () => {
  const [searchValue, setSearchValue] = useState('');
  const handleSearchReport = () => {
    console.log(searchValue);
    setSearchValue('');
  };
  const handleChangeReport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // console.log(searchValue);
  };
  return (
    <div className="flex flex-col overflow-y-auto h-full w-[50%] bg-white p-3">
      <SearchInput
        onSearchClick={() => {
          handleSearchReport();
        }}
        onChange={handleChangeReport}
      />
      <ReportList />
    </div>
  );
};

export default ReportListPanel;
