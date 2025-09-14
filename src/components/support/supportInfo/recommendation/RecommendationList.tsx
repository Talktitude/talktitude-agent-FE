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
  const flattened = recommendationList.flatMap((group) =>
    [...group.items]
      .sort((a, b) => (a.priority ?? 9999) - (b.priority ?? 9999))
      .map((it) => ({
        key: `${group.messageId}-${it.id}`,
        text: it.text,
      })),
  );

  return (
    <div className="px-5 py-4 flex flex-col">
      <div className="flex flex-col gap-3.5">
        {flattened.map(({ key, text }) => (
          <RecommendationItem
            key={key}
            recommendation={text}
            setInputMessage={setInputMessage}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendationList;
