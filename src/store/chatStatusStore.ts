import { create } from 'zustand';

type ChatStatus = 'IN_PROGRESS' | 'FINISHED';
type State = {
  bySession: Record<number, ChatStatus>;
  setStatus: (sessionId: number, status: ChatStatus) => void;
  getStatus: (sessionId: number) => ChatStatus | undefined;
};

export const useChatStatusStore = create<State>((set, get) => ({
  bySession: {},
  setStatus: (sessionId, status) =>
    set((state) => ({
      bySession: { ...state.bySession, [sessionId]: status },
    })),
  getStatus: (sessionId) => get().bySession[sessionId],
}));
