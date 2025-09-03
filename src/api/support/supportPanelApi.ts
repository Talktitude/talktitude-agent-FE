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
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        console.log('고객 정보를 찾을 수 없습니다.');
        return {
          data: [],
        };
      }
    }
    console.error(error);
    return {
      data: [],
    };
  }
};

export const getOrderHistory = async (sessionId: number) => {
  try {
    const response = await axios.get(`${API_URL}/clients/${sessionId}/orders`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        console.log('주문 내역을 찾을 수 없습니다.');
        return {
          data: [],
        };
      }
    }
    console.error(error);
    return {
      data: [],
    };
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
    // console.log('상담 이력 조회', response.data.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getChatMemo = async (sessionId: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/clients/${sessionId}/during-session`,
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

export const postChatMemo = async (sessionId: number, memo: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/memos/register/${sessionId}`,
      {
        memoText: memo,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    alert('메모 저장 완료');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
