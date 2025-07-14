import React from 'react';

interface DetailTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DetailTabs = ({ activeTab, onTabChange }: DetailTabsProps) => {
  const tabs = ['주문 메뉴', '결제 정보', '배달 정보'];

  return (
    <div className="flex justify-start items-center gap-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-2 py-1 text-xs rounded-2xl font-semibold transition-colors ${
            activeTab === tab
              ? 'text-white bg-mainColor border border-mainColor'
              : 'text-mainColor border border-mainColor hover:bg-mainColor/80 hover:text-white'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default DetailTabs;
