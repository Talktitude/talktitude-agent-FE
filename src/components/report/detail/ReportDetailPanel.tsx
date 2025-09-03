'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ReportDetailType, MemoCommentType } from '@/types/reports';
import ReportInfo from './ReportInfo';
import SummaryBox from './SummaryBox';
import MemoBox from './MemoBox';
import { getReportDetail } from '@/api/report/reportDetailApi';

const ReportDetailPanel = () => {
  const [reportDetail, setReportDetail] = useState<ReportDetailType | null>(
    null,
  );
  const reportId = useParams().id;
  const [chatmemoList, setChatmemoList] = useState<MemoCommentType[]>([]);
  const duringMemo = chatmemoList.filter(
    (memo) => memo.memoPhase === 'DURING_CHAT',
  );
  const afterMemo = chatmemoList.filter(
    (memo) => memo.memoPhase === 'AFTER_CHAT',
  );

  useEffect(() => {
    const fetchReportDetail = async () => {
      const response = await getReportDetail(Number(reportId));
      setReportDetail(response.data);
      console.log('response.data', response.data);
      setChatmemoList(response.data?.memos ?? []);
    };
    fetchReportDetail();
  }, [reportId]);

  return (
    <div className="w-[calc(50%-60px)] bg-white rounded-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] mx-6 my-4 p-8 flex flex-col gap-3 justify-between">
      {reportDetail && <ReportInfo reportDetail={reportDetail} />}
      <SummaryBox summaryText={reportDetail?.summaryText ?? ''} />
      <MemoBox
        duringMemoCreateAt={duringMemo[0]?.createdAt}
        duringMemo={duringMemo[0]?.memoText}
        afterMemo={afterMemo}
      />
    </div>
  );
};

export default ReportDetailPanel;
