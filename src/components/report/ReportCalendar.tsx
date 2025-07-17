import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useRouter } from 'next/navigation';

const ReportCalendar = () => {
  const router = useRouter();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex items-center justify-center w-full md:w-[50%] bg-bgLightBlue p-0 md:p-0 lg:p-8">
      <Calendar
        onDayClick={(date) => {
          const formatted = date
            .toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(/\. /g, '-')
            .replace('.', '')
            .slice(0, 10);
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
