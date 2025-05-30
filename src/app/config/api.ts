const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


if (!API_BASE_URL) {
  console.error('API_BASE_URL is not defined! Check your .env file');
}

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/user/register`,
    LOGIN: `${API_BASE_URL}/auth/user/login`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/user/forgot-password`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/user/verify-email`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/user/reset-password`,
   
  },
  USER:{
    USER_PROFILE:`${API_BASE_URL}/user/get-user`
  }
};