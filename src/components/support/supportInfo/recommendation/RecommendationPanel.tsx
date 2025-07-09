import React, { useState } from 'react';
import RecommendationList from './RecommendationList';

const MOCK_RECOMMENDATION_LIST = [
  {
    id: 1,
    recommendation: '원래 그래요',
  },
  {
    id: 2,
    recommendation:
      '저도 잘 몰라요. 확인 후 다시 연락드릴게요. 확인 후 다시 연락드릴게요',
  },
  {
    id: 3,
    recommendation: '원래 그래요',
  },
  {
    id: 4,
    recommendation: '원래 그래요',
  },
  {
    id: 5,
    recommendation:
      '저도 잘 몰라요. 확인 후 다시 연락드릴게요. 확인 후 다시 연락드릴게요',
  },
  {
    id: 6,
    recommendation: '원래 그래요',
  },
  {
    id: 7,
    recommendation: '원래 그래요',
  },
];

const RecommendationPanel = () => {
  const [recommendationList] = useState(MOCK_RECOMMENDATION_LIST);
  return (
    <div className="h-[50%] flex-1 overflow-y-auto">
      {recommendationList.length > 0 ? (
        <RecommendationList recommendationList={recommendationList} />
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="text-textGray font-medium">추천 답변이 없습니다.</div>
        </div>
      )}
    </div>
  );
};

export default RecommendationPanel;
