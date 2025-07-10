import React from 'react';
import InfoPanel from './info/InfoPanel';
import RecommendationPanel from './recommendation/RecommendationPanel';

interface SupportInfoPanelProps {
  setInputMessage?: (message: string) => void;
}

const SupportInfoPanel = ({ setInputMessage }: SupportInfoPanelProps) => {
  return (
    <div className="flex flex-col w-[35%] border-r border-lineGray bg-white">
      <InfoPanel />
      <RecommendationPanel setInputMessage={setInputMessage} />
    </div>
  );
};

export default SupportInfoPanel;
