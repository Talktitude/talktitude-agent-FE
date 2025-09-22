'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import ChatHeader from './ChatHeader';
import ChatRoom from './ChatRoom';
import ChatInput from './ChatInput';
import CustomModal from '@/components/common/modal/CustomModal';
import {
  ConfirmCancelButtons,
  SingleConfirmButton,
} from '@/components/common/modal/ModalButtonGroup';
import { SupportMessageType, ChatHeaderInfoType } from '@/types/support';
import { useSearchParams } from 'next/navigation';
import {
  getChatHeaderInfo,
  getChatMessage,
  patchEndChat,
  triggerReport,
} from '@/api/support/chatRoomPanelApi';
import { validateSessionId } from '@/lib/utils';
import { useChatSocket } from '@/hooks/support/useChatSocket';
import { useChatStatusStore } from '@/store/chatStatusStore';

interface ChatRoomPanelProps {
  inputMessage?: string;
  setInputMessage?: (message: string) => void;
}

const ChatRoomPanel = ({
  inputMessage: externalInputMessage,
  setInputMessage: externalSetInputMessage,
}: ChatRoomPanelProps) => {
  const searchParams = useSearchParams();
  const sessionIdQS = searchParams.get('sessionId');
  const validSessionId = validateSessionId(sessionIdQS);

  const [chatInfo, setChatInfo] = useState<ChatHeaderInfoType | null>(null);
  const [messages, setMessages] = useState<SupportMessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isEndConfirmModalOpen, setIsEndConfirmModalOpen] = useState(false);
  const [isEndSuccessModalOpen, setIsEndSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // 외부 제어/내부 제어 분기
  const currentInputMessage =
    externalInputMessage !== undefined ? externalInputMessage : inputMessage;
  const currentSetInputMessage = externalSetInputMessage || setInputMessage;

  // 1) 초기 메시지
  const fetchChatMessage = useCallback(async () => {
    if (validSessionId == null) return;
    try {
      const data = await getChatMessage(validSessionId);
      setMessages(Array.isArray(data) ? data : data?.data ?? []);
    } catch (e) {
      console.error(e);
    }
  }, [validSessionId]);

  // 2) 헤더 정보
  const fetchHeaderInfo = useCallback(async () => {
    if (validSessionId == null) return;
    try {
      const data = await getChatHeaderInfo(validSessionId);
      setChatInfo(data?.data ?? data);
    } catch (e) {
      console.error(e);
    }
  }, [validSessionId]);

  // 3) 메시지 푸시 수신
  const handleReceive = useCallback((msg: unknown) => {
    setMessages((prev) => [...prev, msg as SupportMessageType]);
  }, []);

  // 4) 상태 푸시 수신
  const handleStatus = useCallback(
    (s: { sessionId: number; status: string }) => {
      if (validSessionId == null) return;
      if (s.sessionId !== validSessionId) return;

      // 전역 상태 업데이트
      if (s.status === 'IN_PROGRESS' || s.status === 'FINISHED') {
        useChatStatusStore.getState().setStatus(s.sessionId, s.status);
      }
    },
    [validSessionId],
  );

  // 5) 소켓 훅
  const { connected, sendMessage, finishedChat } = useChatSocket(
    handleReceive,
    handleStatus,
  );

  useEffect(() => {
    fetchHeaderInfo();
    fetchChatMessage();
  }, [fetchHeaderInfo, fetchChatMessage, validSessionId]);

  // 6) 전송
  const handleSendMessage = (text: string) => {
    if (validSessionId == null) return;
    if (!text.trim()) return;

    sendMessage({
      originalText: text,
      senderType: 'USER',
      sessionId: validSessionId,
    });

    currentSetInputMessage('');
  };

  // 7) 비활성화 조건: 헤더 상태 or 실시간 상태 중 하나라도 FINISHED
  const disabled = useMemo(() => {
    const headerFinished = chatInfo?.status === 'FINISHED';
    return (
      headerFinished || finishedChat || !connected || validSessionId == null
    );
  }, [chatInfo?.status, finishedChat, connected, validSessionId]);

  const handleSupportEnd = () => {
    setIsEndConfirmModalOpen(true);
  };

  const targetDate = new Date().toISOString().split('T')[0];
  // console.log('targetDate', targetDate);

  const handleConfirmEnd = async () => {
    if (validSessionId == null) return;
    try {
      const response = await patchEndChat(validSessionId);
      setSuccessMessage(response.message || '상담이 종료되었습니다.');
      setIsEndSuccessModalOpen(true);
      setIsEndConfirmModalOpen(false);
      await triggerReport(targetDate);
    } catch (e) {
      console.error(e);
      setIsEndConfirmModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col w-[40%] border-r border-lineGray bg-bgLightBlue">
      {chatInfo && (
        <ChatHeader chatInfo={chatInfo} onSupportEnd={handleSupportEnd} />
      )}

      <ChatRoom messages={messages} />

      <ChatInput
        onSendMessage={handleSendMessage}
        value={currentInputMessage}
        onChange={(v) => currentSetInputMessage(v)}
        disabled={disabled}
      />

      {/* 상담 종료 확인 모달 */}
      <CustomModal
        open={isEndConfirmModalOpen}
        onOpenChange={setIsEndConfirmModalOpen}
        mode="center"
        isAlert={true}
      >
        <div className="text-center p-8 bg-bgLightBlue rounded-b-3xl">
          <p className="text-textGray text-lg font-semibold pb-8">
            상담을 종료하시겠습니까?
          </p>
          <ConfirmCancelButtons
            onCancel={() => setIsEndConfirmModalOpen(false)}
            onConfirm={handleConfirmEnd}
            cancelText="취소"
            confirmText="종료"
            confirmVariant="confirm"
          />
        </div>
      </CustomModal>

      {/* 상담 종료 성공 모달 */}
      <CustomModal
        open={isEndSuccessModalOpen}
        onOpenChange={setIsEndSuccessModalOpen}
        mode="center"
        isAlert={true}
      >
        <div className="text-center p-8 bg-bgLightBlue rounded-b-3xl">
          <p className="text-textGray text-lg font-semibold pb-8">
            {successMessage}
          </p>
          <SingleConfirmButton
            onConfirm={() => setIsEndSuccessModalOpen(false)}
            confirmText="확인"
            variant="confirm"
          />
        </div>
      </CustomModal>
    </div>
  );
};

export default ChatRoomPanel;
