import React, { useState, useCallback, useEffect } from 'react';
import RecommendationList from './RecommendationList';
import { useChatSocket } from '@/hooks/support/useChatSocket';
import { RecommendationItemType } from '@/types/support';

interface RecommendationPanelProps {
  setInputMessage?: (message: string) => void;
}

const RecommendationPanel = ({ setInputMessage }: RecommendationPanelProps) => {
  const handleRecommendations = useCallback(
    (s: { recommendations: RecommendationItemType[] }) => {
      setRecommendationList(s.recommendations);
    },
    [],
  );

  const { recommendations } = useChatSocket(
    /* onReceive   */ undefined,
    /* onStatus    */ undefined,
    /* onRecs      */ handleRecommendations,
  );

  const [recommendationList, setRecommendationList] = useState<
    RecommendationItemType[]
  >([]);

  useEffect(() => {
    setRecommendationList(recommendations);
  }, [recommendations]);
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
