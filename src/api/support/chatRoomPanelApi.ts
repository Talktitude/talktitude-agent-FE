import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const accessToken =
  typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

export const getChatHeaderInfo = async (sessionId: number) => {
  try {
    const response = await axios.get(`${API_URL}/chat/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
