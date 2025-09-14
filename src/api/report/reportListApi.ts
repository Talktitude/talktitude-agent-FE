import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const accessToken =
  typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

export const getReportList = async (date: string) => {
  try {
    const response = await axios.get(`${API_URL}/reports?date=${date}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log('리포트 목록', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getReportListBySearch = async (keyword: string, date: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/reports/search?keyword=${keyword}&date=${date}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    // console.log('리포트 검색 목록', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
