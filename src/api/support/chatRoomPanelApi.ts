import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const accessToken =
  typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

export const getChatHeaderInfo = async (sessionId: number) => {
  try {
    const response = await axios.get(`${API_URL}/chat/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChatMessage = async (sessionId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/chat/sessions/${sessionId}/messages`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    // console.log('채팅 내역 조회', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patchEndChat = async (sessionId: number) => {
  try {
    const response = await axios.patch(
      `${API_URL}/chat/sessions/${sessionId}/finish`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    // console.log('채팅 종료', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getRecommendations = async (sessionId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/chat/sessions/${sessionId}/recommendations/latest`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    // console.log('추천 답변 조회', response.data.data.items);
    return response.data.data.items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
