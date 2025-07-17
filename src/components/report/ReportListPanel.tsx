import React from 'react';
import ReportList from './ReportList';

const ReportListPanel = () => {
  return (
    <div className="flex flex-col overflow-y-auto h-full w-[50%] bg-white">
      <ReportList />
    </div>
  );
};

export default ReportListPanel;
