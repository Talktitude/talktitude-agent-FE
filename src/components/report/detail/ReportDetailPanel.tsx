'use client';

import React, { useState } from 'react';
import { ReportDetailType } from '@/types/reports';
import ReportInfo from './ReportInfo';
import SummaryBox from './SummaryBox';
import MemoBox from './MemoBox';

const ReportDetailPanel = () => {
  const MOCK_REPORT_DETAIL: ReportDetailType = {
    reportId: 1,
    sessionId: 1,
    clientName: '홍길동',
    clientPhone: '010-1234-5678',
    createdAt: '2025-04-29 16:32',
    userName: '성윤정',
    category: '주문 문의',
    summaryText:
      '회원님이 주문 취소를 요청했으나 주문이 이미 접수되어서 요청이 반영되어지지 못함. 주문을 취소에서 상담을 마무리함 회원님이 주문 취소를 요청했으나 주문이 이미 접수되어서 요청이 반영되어지지 못함. 주문을 취소에서 상담을 마무리함 회원님이 주문 취소를 요청했으나 주문이 이미 접수되어서 요청이 반영되어지지 못함. 주문을 취소에서 상담을 마무리함',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
    memoCreateAt: '2025.05.08',
    chatMemo: '상담 예약 잡힘',
  };
  const [reportDetail] = useState<ReportDetailType>(MOCK_REPORT_DETAIL);
  return (
    <div className="w-[calc(50%-60px)] bg-white rounded-[20px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] mx-6 my-4 p-8 space-y-4">
      <ReportInfo reportDetail={reportDetail} />
      <SummaryBox summaryText={reportDetail.summaryText} />
      <MemoBox
        memoCreateAt={reportDetail.memoCreateAt}
        chatMemo={reportDetail.chatMemo}
      />
    </div>
  );
};

export default ReportDetailPanel;
