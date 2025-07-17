'use client';

import * as React from 'react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  onDayClick,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
  onDayClick?: (date: Date, e: React.MouseEvent) => void;
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-bgLightBlue text-textBlack group/calendar p-3 [--cell-size:3rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent border-none',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      onDayClick={onDayClick}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date: Date) =>
          date.toLocaleString('default', { month: 'short' }),
        formatCaption: (date: Date) =>
          date.toLocaleString('default', { year: 'numeric', month: 'short' }),
        ...formatters,
        formatWeekdayName: (date: Date) =>
          date.toLocaleDateString('en-US', { weekday: 'short' }),
      }}
      toMonth={new Date()} // 이번 달까지만 이동 가능
      disabled={{ after: new Date() }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-4 md:flex-row',
          defaultClassNames.months,
        ),
        month: cn(
          'flex w-full flex-col gap-4 text-textBlack text-[20px] font-medium',
          defaultClassNames.month,
        ), // 일 숫자 스타일 (1~30, 31)
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-end gap-1',
          defaultClassNames.nav,
        ), // 이전 달, 다음 달 변경 버튼 스타일
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'w-8 h-8 select-none p-0 aria-disabled:opacity-50 text-mainColor bg-white border',
          defaultClassNames.button_previous,
        ), // 이전 달 변경 버튼 스타일
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'w-8 h-8 select-none p-0 aria-disabled:opacity-50 text-mainColor bg-white border aria-disabled:pointer-events-none',
          defaultClassNames.button_next,
        ), // 다음 달 변경 버튼 스타일
        month_caption: cn(
          'flex h-full w-full items-center justify-start pl-3 text-mainColor mb-5',
          defaultClassNames.month_caption,
        ), // 월 제목 스타일 (2025년 7월)
        caption_label: cn(
          'select-none font-bold text-3xl',
          captionLayout === 'label'
            ? 'text-3xl font-bold'
            : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'flex-1 select-none rounded-3xl text-[#5D5D5D] text-[20px] font-medium',
          defaultClassNames.weekday,
        ), // 요일 영어 스타일 (mon, tue, wed, thu, fri, sat, sun 등)
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn(
          'w-[--cell-size] select-none',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-muted-foreground select-none text-[0.8rem]',
          defaultClassNames.week_number,
        ),
        day: cn(
          'group/day relative aspect-square h-full w-full select-none p-3.5 text-center',
          defaultClassNames.day,
        ),
        today: cn(
          'text-mainColor font-bold rounded-3xl data-[selected=true]:rounded-3xl',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-[#9f9f9f] aria-selected:text-[#9f9f9f]',
          defaultClassNames.outside,
        ), // 다른 달 날짜 스타일
        disabled: cn('text-[#a5a5a5] opacity-50', defaultClassNames.disabled), // 비활성화 날짜 스타일
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          );
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-6', className)} {...props} />
            );
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-6', className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn('size-4', className)} {...props} />
          );
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={modifiers.selected}
      // data-range-start={modifiers.range_start}
      // data-range-end={modifiers.range_end}
      // data-range-middle={modifiers.range_middle}
      className={cn(
        'data-[selected-single=true]:bg-mainColor data-[selected-single=true]:text-white data-[selected-single=true]:rounded-3xl group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 leading-none group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:bg-mainColor group-data-[focused=true]/day:text-white group-data-[focused=true]/day:rounded-3xl [&>span]:text-sm [&>span]:opacity-70',
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
