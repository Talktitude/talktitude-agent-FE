import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SignupData {
  loginId: string;
  password: string;
  name: string;
  phone: string;
  email: string;
}

export const postSignup = async (data: SignupData) => {
  try {
    const response = await axios.post(`${API_URL}/members/signup`, data);
    console.log(response.data);
    alert(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; // 호출한 곳에서 에러 처리할 수 있게
  }
};
