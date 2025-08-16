'use client';

import { useEffect, useState } from 'react';
import { getChatList, getChatSearch } from '@/api/support/chatListPanelApi';
import type { ChatListItemType, FilterOption } from '@/types/support';

export const useChatList = ({
  onChatSelect,
}: {
  onChatSelect: (chatItem: ChatListItemType) => void;
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedChat, setSelectedChat] = useState(-1);
  const [allChatListItems, setAllChatListItems] = useState<ChatListItemType[]>(
    [],
  );
  const [chatListItems, setChatListItems] = useState<ChatListItemType[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOption>('ALL');
  const [searchResultItems, setSearchResultItems] = useState<
    ChatListItemType[]
  >([]);
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSearchChat = () => {
    if (!searchValue.trim()) return;

    const fetchChatSearch = async () => {
      const response = await getChatSearch(searchValue, filterOption);
      setSearchResultItems(response.data);
      setIsSearchMode(true);
    };
    fetchChatSearch();
  };

  const onChangeSearchChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    // 검색어 비어있는 경우 검색 모드 false로 변경
    if (!e.target.value.trim()) {
      setIsSearchMode(false);
      setSearchResultItems([]);
    }
  };

  const handleFilterChange = (filter: 'ALL' | 'IN_PROGRESS' | 'FINISHED') => {
    setFilterOption(filter);
    // 필터 변경 시 검색 모드 false로 변경
    setIsSearchMode(false);
    setSearchResultItems([]);
  };

  const handleChatSelect = (sessionId: number) => {
    setSelectedChat(sessionId);
    const selectedChatItem = chatListItems.find(
      (chat) => chat.sessionId === sessionId,
    );
    if (selectedChatItem && onChatSelect) {
      onChatSelect(selectedChatItem);
    }
  };

  // 전체 데이터: 최초 1회 렌더링
  useEffect(() => {
    const fetchAllChatList = async () => {
      const response = await getChatList('ALL');
      setAllChatListItems(response.data);
    };
    fetchAllChatList();
  }, []);

  // 필터링된 데이터: filterOption 바뀔 때마다 렌더링
  useEffect(() => {
    const fetchChatList = async () => {
      const response = await getChatList(filterOption);
      setChatListItems(response.data);
    };
    fetchChatList();
  }, [filterOption]);

  return {
    searchValue,
    selectedChat,
    allChatListItems,
    chatListItems,
    filterOption,
    searchResultItems,
    isSearchMode,
    handleSearchChat,
    onChangeSearchChat,
    handleFilterChange,
    handleChatSelect,
  };
};
