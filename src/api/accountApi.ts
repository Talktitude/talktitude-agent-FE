import axios from 'axios';
import { LoginFormPropsType } from '@/types/auth';
import { ChangePasswordFormProps } from '@/components/account/password/ChangePasswordForm';
import { EditFormProps } from '@/components/account/EditForm';

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
    return response.data;
  } catch (error) {
    // console.error(error);
    throw error; // 호출한 곳에서 에러 처리할 수 있게
  }
};

export const getCheckId = async (loginId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/members/check-duplicate?loginId=${loginId}`,
    );
    console.log(response.data.message);
    return response.data.message;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export const postLogin = async (data: LoginFormPropsType['loginFormData']) => {
  try {
    const response = await axios.post(`${API_URL}/members/login`, data);
    console.log(response.data);

    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    return response.data;
  } catch (error) {
    // console.error(error);
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      switch (status) {
        case 401:
          throw '아이디 또는 비밀번호가 올바르지 않습니다.';
        default:
          throw message || '로그인 중 오류가 발생했습니다.';
      }
    }
    throw '로그인 중 오류가 발생했습니다.';
  }
};

export const getUserInfo = async () => {
  try {
    const accessToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    const response = await axios.get(`${API_URL}/members/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export const postLogout = async () => {
  try {
    const accessToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    // console.log('로그아웃 성공');
    return response.data;
  } catch (error) {
    // console.error(error);
    throw error;
  }
};

export const patchUserProfileInfo = async (data: EditFormProps['userData']) => {
  try {
    const accessToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('currentPassword', data.currentPassword);

    if (data.profileImage) {
      formData.append('profileImage', data.profileImage);
    }

    const response = await axios.patch(`${API_URL}/members/me`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const code = error.response?.data?.code;
      const message = error.response?.data?.message;
      switch (code) {
        case 'MEMBER_006':
          throw message;
        default:
          throw '프로필 수정 중 오류가 발생했습니다.\n다시 시도해주세요.';
      }
    }
    throw '프로필 수정 중 오류가 발생했습니다.\n다시 시도해주세요.';
  }
};

export const patchUserPassword = async (
  data: ChangePasswordFormProps['passwordData'],
) => {
  try {
    const accessToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    const response = await axios.patch(`${API_URL}/members/me/password`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const code = error.response?.data?.code;
      const message = error.response?.data?.message;
      switch (status) {
        case 400:
          if (code === 'MEMBER_003') {
            throw message + '\n다시 시도해주세요.';
          } else if (code === 'MEMBER_006') {
            throw message + '\n다시 시도해주세요.';
          }
        default:
          throw '비밀번호 변경 중 오류가 발생했습니다.\n다시 시도해주세요.';
      }
    }
    throw '비밀번호 변경 중 오류가 발생했습니다.\n다시 시도해주세요.';
  }
};

export const deleteUser = async () => {
  try {
    const accessToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;
    const response = await axios.delete(`${API_URL}/members/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message;
      switch (status) {
        case 400:
          throw message;
      }
    }
    throw error;
  }
};
