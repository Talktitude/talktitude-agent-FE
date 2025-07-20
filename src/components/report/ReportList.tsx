import React, { useState } from 'react';
import ReportItem from './ReportItem';
import { ReportItemType } from '@/types/reports';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

const MOCK_REPORT_LIST: ReportItemType[] = [
  {
    reportId: 1,
    sessionId: 1,
    clientName: '홍길동',
    clientPhone: '010-1234-5678',
    createdAt: '2025-04-23',
    category: '주문 문의',
    clientId: '1',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    reportId: 2,
    sessionId: 2,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    createdAt: '2025-04-23',
    category: '주문 문의',
    clientId: '3',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    reportId: 3,
    sessionId: 3,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    createdAt: '2025-04-23',
    category: '주문 문의',
    clientId: '3',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    reportId: 4,
    sessionId: 4,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    createdAt: '2025-04-23',
    category: '주문 문의',
    clientId: '3',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    reportId: 5,
    sessionId: 5,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    createdAt: '2025-04-23',
    category: '주문 문의',
    clientId: '3',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    reportId: 6,
    sessionId: 6,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    createdAt: '2025-04-23',
    category: '주문 문의',
    clientId: '3',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    reportId: 7,
    sessionId: 7,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    createdAt: '2025-04-23',
    category: '주문 문의',
    clientId: '3',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
  {
    reportId: 8,
    sessionId: 8,
    clientName: '비회원',
    clientPhone: '010-1234-5678',
    createdAt: '2025-04-23',
    category: '주문 문의',
    clientId: '3',
    profileImageUrl:
      'https://i.pinimg.com/736x/d5/cc/bb/d5ccbb3c0796509fdaa7696da65cc8e2.jpg',
  },
];

const ReportList = () => {
  const reportListItems = MOCK_REPORT_LIST;
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(reportListItems.length / itemsPerPage);
  const paginatedItems = reportListItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      {paginatedItems.length > 0 ? (
        <div className="flex-1 flex flex-col">
          {paginatedItems.map((reportItem) => (
            <ReportItem
              reportItem={reportItem}
              key={reportItem.reportId}
              onClick={() =>
                router.push(`/reports/${reportItem.reportId}?date=${date}`)
              }
            />
          ))}
          <div className="flex justify-center mt-3">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    }}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, idx) => (
                  <PaginationItem key={idx + 1}>
                    <PaginationLink
                      isActive={currentPage === idx + 1}
                      onClick={() => handlePageChange(idx + 1)}
                      style={{ cursor: 'pointer' }}
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{
                      cursor:
                        currentPage === totalPages ? 'not-allowed' : 'pointer',
                    }}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-textBlack text-base font-medium">
            해당 날짜에 상담 내역이 없습니다.
          </div>
        </div>
      )}
    </>
  );
};

export default ReportList;
