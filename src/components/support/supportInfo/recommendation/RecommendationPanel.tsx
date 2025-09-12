import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RecommendationList from './RecommendationList';
import { useChatSocket } from '@/hooks/support/useChatSocket';
import { RecommendationItemType } from '@/types/support';
import { getRecommendations } from '@/api/support/chatRoomPanelApi';
import { useChatStatusStore } from '@/store/chatStatusStore';
import { useLoading } from '@/hooks/useLoading';
import LoadingDots from '@/components/common/loading/LoadingDots';

interface RecommendationPanelProps {
  setInputMessage?: (message: string) => void;
}

const RecommendationPanel = ({ setInputMessage }: RecommendationPanelProps) => {
  const sessionId = useSearchParams().get('sessionId');
  const { isLoading, stopLoading, startLoading } = useLoading(true);

  const handleRecommendations = useCallback(
    (s: { recommendations: RecommendationItemType[] }) => {
      setRecommendationList(s.recommendations);
      if (s.recommendations && s.recommendations.length > 0) {
        // 종료된 세션이 아니고 웹소켓으로 추천 목록을 받으면 로딩 해제
        stopLoading();
        return;
      }
    },
    [stopLoading],
  );

  const { recommendations } = useChatSocket(
    /* onReceive   */ undefined,
    /* onStatus    */ undefined,
    /* onRecs      */ handleRecommendations,
    /* onRecsStat  */ (s) => {
      if (s.state === 'STARTED') {
        startLoading();
      } else if (s.state === 'DONE' || s.state === 'ERROR') {
        stopLoading();
      }
    },
  );

  const [recommendationList, setRecommendationList] = useState<
    RecommendationItemType[]
  >([]);

  const liveStatus = useChatStatusStore((s) =>
    sessionId ? s.bySession[Number(sessionId)] : undefined,
  );
  const isFinished = liveStatus === 'FINISHED';
  const disabled =
    isFinished || !recommendations || recommendationList.length === 0;

  // 세션 전환 시 즉시 초기화
  useEffect(() => {
    setRecommendationList([]);
    stopLoading();
  }, [sessionId, stopLoading]);

  useEffect(() => {
    if (isFinished) {
      setRecommendationList([]);
      stopLoading(); // sessionId가 없으면 로딩 상태 해제
      return;
    }
  }, [isFinished, stopLoading]);

  useEffect(() => {
    if (recommendations && recommendations.length > 0) {
      setRecommendationList(recommendations);
      stopLoading(); // 웹소켓으로 추천 답변을 받으면 로딩 상태 해제
      return;
    }
    const sid = Number(sessionId);
    if (!sid) {
      setRecommendationList([]);
      stopLoading(); // sessionId가 없으면 로딩 상태 해제
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
  }, [recommendations, sessionId, stopLoading, isFinished]);

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
        ) : isLoading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-3">
            <LoadingDots
              size="md"
              dotColors={['primary', 'secondary', 'lightBlue']}
            />
            <p className="text-textLightGray text-sm font-medium">
              추천 답변을 생성하고 있습니다.
            </p>
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
