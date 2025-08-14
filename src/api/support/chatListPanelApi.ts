import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getChatList = async (
  status: 'ALL' | 'IN_PROGRESS' | 'FINISHED' = 'ALL',
) => {
  try {
    // 클라이언트 사이드에서만 localStorage 접근
    const accessToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    const response = await axios.get(
      `${API_URL}/chat/sessions?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
