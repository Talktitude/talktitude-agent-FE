import React, { useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const ReportCalendar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());

  useEffect(() => {
    // URL에서 date 파라미터 읽기
    const dateParam = searchParams.get('date');

    if (dateParam) {
      // URL에 date가 있으면 해당 날짜로 설정
      const parsedDate = new Date(dateParam);
      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
        setCurrentMonth(parsedDate); // 선택된 날짜의 월로 설정
      }
    } else if (pathname === '/reports') {
      // URL에 date가 없고 목록 페이지일 때만 오늘 날짜로 설정
      const today = new Date();
      const formatted = today.toLocaleDateString('sv-SE', {
        timeZone: 'Asia/Seoul',
      });
      router.replace(`/reports?date=${formatted}`);
      setDate(today);
      setCurrentMonth(today);
    }
  }, [router, pathname, searchParams]);

  return (
    <div className="flex items-center justify-center w-full md:w-[50%] bg-bgLightBlue p-0 md:p-0 lg:p-8">
      <Calendar
        onDayClick={(date) => {
          const formatted = date.toLocaleDateString('sv-SE', {
            timeZone: 'Asia/Seoul',
          });
          router.push(`/reports?date=${formatted}`);
        }}
        mode="single"
        selected={date}
        onSelect={setDate}
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        className="rounded-lg"
      />
    </div>
  );
};

export default ReportCalendar;
