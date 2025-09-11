import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RecommendationList from './RecommendationList';
import { useChatSocket } from '@/hooks/support/useChatSocket';
import { RecommendationItemType } from '@/types/support';
import { getRecommendations } from '@/api/support/chatRoomPanelApi';
import { useChatStatusStore } from '@/store/chatStatusStore';

interface RecommendationPanelProps {
  setInputMessage?: (message: string) => void;
}

const RecommendationPanel = ({ setInputMessage }: RecommendationPanelProps) => {
  const sessionId = useSearchParams().get('sessionId');
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
    if (recommendations && recommendations.length > 0) {
      setRecommendationList(recommendations);
      return;
    }
    const sid = Number(sessionId);
    if (!sid) {
      setRecommendationList([]);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const items = await getRecommendations(sid);
        if (cancelled) return;
        const wrapped: RecommendationItemType[] = items?.length
          ? [{ messageId: 0, items }]
          : [];
        setRecommendationList(wrapped);
      } catch (e) {
        if (cancelled) return;
        console.error('추천 답변 조회 API 오류', e);
        setRecommendationList([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [recommendations, sessionId]);

  const liveStatus = useChatStatusStore((s) =>
    sessionId ? s.bySession[Number(sessionId)] : undefined,
  );
  const isFinished = liveStatus === 'FINISHED';
  const disabled =
    isFinished || !recommendations || recommendationList.length === 0;
  return (
    <div className="h-[50%]">
      <div className="px-5 py-3 justify-start text-mainColor text-lg font-bold">
        추천 답변 리스트
      </div>
      <div className="h-[calc(100%-51px)] flex-1 overflow-y-auto">
        {disabled ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-textLightGray font-medium">
              추천 답변이 없습니다.
            </div>
          </div>
        ) : (
          <RecommendationList
            recommendationList={recommendationList}
            setInputMessage={setInputMessage}
          />
        )}
      </div>
    </div>
  );
};

export default RecommendationPanel;
