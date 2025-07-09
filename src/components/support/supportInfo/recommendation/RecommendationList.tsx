import React from 'react';
import RecommendationItem from './RecommendationItem';
import { RecommendationItemType } from '@/types/support';

const RecommendationList = ({
  recommendationList,
}: {
  recommendationList: RecommendationItemType[];
}) => {
  return (
    <div className="px-5 py-4 flex flex-col gap-4">
      <div className="justify-start text-mainColor text-lg font-bold">
        추천 답변 리스트
      </div>
      <div className="flex flex-col gap-3.5">
        {recommendationList.map((item) => (
          <RecommendationItem
            key={item.id}
            recommendation={item.recommendation}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
