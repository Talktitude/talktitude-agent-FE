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
