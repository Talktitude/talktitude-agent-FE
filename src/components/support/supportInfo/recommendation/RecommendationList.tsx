import React from 'react';
import RecommendationItem from './RecommendationItem';
import { RecommendationItemType } from '@/types/support';

interface RecommendationListProps {
  recommendationList: RecommendationItemType[];
  setInputMessage?: (message: string) => void;
}

const RecommendationList = ({
  recommendationList,
  setInputMessage,
}: RecommendationListProps) => {
  return (
    <div className="px-5 py-4 flex flex-col">
      <div className="flex flex-col gap-3.5">
        {recommendationList.map((item) => (
          <RecommendationItem
            key={item.id}
            recommendation={item.recommendation}
            setInputMessage={setInputMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
