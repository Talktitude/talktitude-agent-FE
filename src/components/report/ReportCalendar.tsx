import React, { useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useRouter } from 'next/navigation';

const ReportCalendar = () => {
  const router = useRouter();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  // 새로고침 시 항상 오늘 날짜로 URL 변경
  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('sv-SE', {
      timeZone: 'Asia/Seoul',
    });
    router.replace(`/reports?date=${formatted}`);
    setDate(today);
  }, [router]);

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
        className="rounded-lg"
      />
    </div>
  );
};

export default ReportCalendar;
