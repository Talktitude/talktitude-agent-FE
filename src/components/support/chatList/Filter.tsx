import React from 'react';
import type { FilterPropsType } from '@/types/support';

const Filter = ({ filterOption, onFilterChange }: FilterPropsType) => {
  const filterButtons = [
    { value: 'ALL', label: '전체' },
    { value: 'IN_PROGRESS', label: '진행중' },
    { value: 'FINISHED', label: '종료' },
  ] as const;
  return (
    <div className="px-4 py-2 flex justify-end gap-4 text-sm font-medium">
      {filterButtons.map((filter) => (
        <button
          key={filter.value}
          className={`${
            filterOption === filter.value
              ? 'text-mainColor font-bold'
              : 'text-textLightGray'
          }`}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
