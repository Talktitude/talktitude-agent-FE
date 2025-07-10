import React, { useState } from 'react';
import RecommendationList from './RecommendationList';

interface RecommendationPanelProps {
  setInputMessage?: (message: string) => void;
}

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

const RecommendationPanel = ({ setInputMessage }: RecommendationPanelProps) => {
  const [recommendationList] = useState(MOCK_RECOMMENDATION_LIST);
  return (
    <div className="h-[50%]">
      <div className="px-5 py-3 justify-start text-mainColor text-lg font-bold">
        추천 답변 리스트
      </div>
      <div className="h-[calc(100%-51px)] flex-1 overflow-y-auto">
        {recommendationList.length > 0 ? (
          <RecommendationList
            recommendationList={recommendationList}
            setInputMessage={setInputMessage}
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-textGray font-medium">
              추천 답변이 없습니다.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPanel;
