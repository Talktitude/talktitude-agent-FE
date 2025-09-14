import { useMemo } from 'react';

export const useTimeFormat = (dateString: string) => {
  return useMemo(() => {
    const now = new Date();
    const targetDate = new Date(dateString);

    // 날짜 차이 계산 (밀리초)
    // const diffInMs = now.getTime() - targetDate.getTime();
    // const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    // const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    // 오늘 날짜
    const isToday = now.toDateString() === targetDate.toDateString();

    // 어제 날짜
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = yesterday.toDateString() === targetDate.toDateString();

    if (isToday) {
      // 오늘인 경우 HH:MM 형태로 시간 반환
      const hours = targetDate.getHours().toString().padStart(2, '0');
      const minutes = targetDate.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    if (isYesterday) {
      return '어제';
    }

    // 그 이전 날짜는 "n월 n일" 형식
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();
    return `${month}월 ${day}일`;
  }, [dateString]);
};
