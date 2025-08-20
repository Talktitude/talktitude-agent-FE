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
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOrderHistory = async (sessionId: number) => {
  try {
    const response = await axios.get(`${API_URL}/clients/${sessionId}/orders`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOrderDetail = async (
  sessionId: number,
  orderNumber: string,
) => {
  try {
    const response = await axios.get(
      `${API_URL}/clients/${sessionId}/orders/${orderNumber}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSupportHistory = async (sessionId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/clients/${sessionId}/reports`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    console.log('상담 이력 조회', response.data.data.content);
    return response.data.data.content;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
