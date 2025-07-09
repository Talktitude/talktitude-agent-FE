import React from 'react';
import InfoPanel from './info/InfoPanel';
import RecommendationPanel from './recommendation/RecommendationPanel';

const SupportInfoPanel = () => {
  return (
    <div className="flex flex-col w-[35%] border-r border-lineGray bg-white">
      <InfoPanel />
      <RecommendationPanel />
    </div>
  );
};

export default SupportInfoPanel;
