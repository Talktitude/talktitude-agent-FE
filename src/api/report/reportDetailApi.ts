import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const accessToken =
  typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

export const getReportDetail = async (reportId: number) => {
  try {
    const response = await axios.get(`${API_URL}/reports/detail/${reportId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postMemoComment = async (sessionId: number, memoText: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/memos/register/${sessionId}`,
      {
        memoText,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    // console.log(sessionId, '에 메모 저장', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteMemoComment = async (memoId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/memos/delete/${memoId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
