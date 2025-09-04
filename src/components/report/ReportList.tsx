import React, { useEffect, useState } from 'react';
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
import { CalendarX2 } from 'lucide-react';

const ReportList = ({
  reportListItems,
  isSearchMode = false,
}: {
  reportListItems: ReportItemType[];
  isSearchMode: boolean;
}) => {
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

  // 리스트 데이터가 변경되면 첫 페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [reportListItems]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      {isSearchMode && (
        <div className="px-4 py-2 text-sm text-textGray border-b border-lineGray">
          검색 결과 ({paginatedItems.length}건)
        </div>
      )}
      {paginatedItems.length > 0 ? (
        <div className="flex-1 flex flex-col">
          <div
            className={`flex flex-col ${
              isSearchMode
                ? 'min-h-[calc(100dvh-260px)]'
                : 'min-h-[calc(100dvh-220px)]'
            }`}
          >
            {paginatedItems.map((reportItem) => (
              <ReportItem
                reportItem={reportItem}
                key={reportItem.id}
                onClick={() =>
                  router.push(`/reports/${reportItem.id}?date=${date}`)
                }
              />
            ))}
          </div>
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
          <CalendarX2 className="size-10 text-textLightGray" />
          <div className="text-textLightGray text-base font-medium mt-2">
            해당 날짜에 상담 내역이 없습니다.
          </div>
        </div>
      )}
    </>
  );
};

export default ReportList;
