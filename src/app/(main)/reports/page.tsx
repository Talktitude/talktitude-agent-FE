'use client';

import React from 'react';
import Header from '@/components/common/Header';
import { Calendar } from '@/components/ui/calendar';

export default function ReportPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-[50%] h-[calc(100dvh-60px)] bg-bgLightBlue">
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
            console.log(formatted);
          }}
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border"
        />
      </div>
    </>
  );
}
