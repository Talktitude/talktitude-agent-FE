import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const accessToken =
  typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

export const getClientInfo = async (sessionId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/clients/${sessionId}/client-info`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
