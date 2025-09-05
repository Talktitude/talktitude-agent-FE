'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { getChatList, getChatSearch } from '@/api/support/chatListPanelApi';
import type { ChatListItemType, FilterOption } from '@/types/support';
import { validateSessionId } from '@/lib/utils';
import { useSessionPush } from '@/hooks/support/useSessionPush';

// utility: 최신 메시지 시간 내림차순 정렬 함수
function sortByLastMessageDesc<T extends { lastMessageTime?: string }>(
  arr: T[],
) {
  return [...arr].sort((a, b) => {
    const at = a.lastMessageTime ? Date.parse(a.lastMessageTime) : 0;
    const bt = b.lastMessageTime ? Date.parse(b.lastMessageTime) : 0;
    return bt - at;
  });
}

// utility: 상태 필터 매칭 함수
function matchFilter(status: string, filter: FilterOption) {
  if (filter === 'ALL') return true;
  return status === filter;
}

export const useChatList = ({
  onChatSelect,
}: {
  onChatSelect: (chatItem: ChatListItemType) => void;
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [allChatListItems, setAllChatListItems] = useState<ChatListItemType[]>(
    [],
  );
  const [chatListItems, setChatListItems] = useState<ChatListItemType[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOption>('ALL');
  const [searchResultItems, setSearchResultItems] = useState<
    ChatListItemType[]
  >([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const searchParams = useSearchParams();

  // 상담 목록 검색 함수
  const handleSearchChat = useCallback(() => {
    if (!searchValue.trim()) return;
    (async () => {
      const response = await getChatSearch(searchValue, filterOption);
      setSearchResultItems(response.data);
      setIsSearchMode(true);
    })();
  }, [searchValue, filterOption]);

  const onChangeSearchChat = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setSearchValue(v);
      if (!v.trim()) {
        setIsSearchMode(false);
        setSearchResultItems([]);
      }
    },
    [],
  );

  // 상담 목록 필터 변경 함수
  const handleFilterChange = useCallback((filter: FilterOption) => {
    setFilterOption(filter);
    setIsSearchMode(false);
    setSearchResultItems([]);
  }, []);

  // 상담 목록 선택 함수
  const handleChatSelect = useCallback(
    (sessionId: number) => {
      if (typeof sessionId === 'number' && sessionId >= 0) {
        setSelectedChat(sessionId);
        const selectedChatItem =
          (isSearchMode ? searchResultItems : chatListItems).find(
            (chat) => chat.sessionId === sessionId,
          ) || allChatListItems.find((chat) => chat.sessionId === sessionId);
        if (selectedChatItem && onChatSelect) {
          onChatSelect(selectedChatItem);
        }
      }
    },
    [
      isSearchMode,
      searchResultItems,
      chatListItems,
      allChatListItems,
      onChatSelect,
    ],
  );

  // 초기 세션 ID
  useEffect(() => {
    const initSessionId = searchParams.get('sessionId');
    const valid = validateSessionId(initSessionId);
    setSelectedChat(valid);
  }, [searchParams]);

  // 전체/필터 데이터 로드
  useEffect(() => {
    (async () => {
      const res = await getChatList('ALL');
      setAllChatListItems(sortByLastMessageDesc(res.data));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getChatList(filterOption);
      setChatListItems(sortByLastMessageDesc(res.data));
    })();
  }, [filterOption]);

  // 새 상담 세션 푸시로 상담 목록 실시간 갱신
  useSessionPush({
    onSessionCreated: (p) => {
      const incoming: ChatListItemType = {
        sessionId: p.sessionId,
        clientLoginId: p.clientLoginId,
        clientPhone: p.clientPhone,
        profileImageUrl: p.profileImageUrl ?? '',
        status: p.status as 'ALL' | 'IN_PROGRESS' | 'FINISHED',
        lastMessageTime: p.lastMessageTime,
      };

      // 1) 전체 상담 목록에 prepend(중복 방지)
      setAllChatListItems((prev) => {
        const idx = prev.findIndex((x) => x.sessionId === incoming.sessionId);
        if (idx >= 0) {
          const next = prev.slice();
          const [exist] = next.splice(idx, 1);
          next.unshift({ ...exist, ...incoming });
          return sortByLastMessageDesc(next);
        }
        return sortByLastMessageDesc([incoming, ...prev]);
      });

      // 2) 현재 필터에 부합하면 표시 상담 목록에도 prepend
      if (matchFilter(incoming.status, filterOption)) {
        setChatListItems((prev) => {
          const idx = prev.findIndex((x) => x.sessionId === incoming.sessionId);
          if (idx >= 0) {
            const next = prev.slice();
            const [exist] = next.splice(idx, 1);
            next.unshift({ ...exist, ...incoming });
            return sortByLastMessageDesc(next);
          }
          return sortByLastMessageDesc([incoming, ...prev]);
        });
      }
    },
  });

  // 메모: 화면에 실제로 뿌릴 상담 목록
  const displayItems = useMemo(
    () => (isSearchMode ? searchResultItems : chatListItems),
    [isSearchMode, searchResultItems, chatListItems],
  );

  return {
    searchValue,
    selectedChat,
    allChatListItems,
    chatListItems: displayItems, // 화면 표시용
    filterOption,
    searchResultItems,
    isSearchMode,
    handleSearchChat,
    onChangeSearchChat,
    handleFilterChange,
    handleChatSelect,
    setChatListItems, // 필요 시 외부에서도 직접 갱신 가능
    setAllChatListItems,
  };
};
