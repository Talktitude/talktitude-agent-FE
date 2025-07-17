import React from 'react';
import ReportList from './ReportList';

const ReportListPanel = () => {
  return (
    <div className="flex flex-col overflow-y-auto h-full">
      <ReportList />
    </div>
  );
};

export default ReportListPanel;
