const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const Cyptocoin_API_URL = process.env.NEXT_PUBLIC_CYRPTO_BASE_URL
const Cyptocoin_API_HOST = process.env.NEXT_PUBLIC_CYRPTO_BASE_HOST
const Cyptocoin_API_KEY = process.env.NEXT_PUBLIC_CYRPTO_KEY
const COINGECKO_API = process.env.NEXT_PUBLIC_COINGECKO_API_BASE_URL




export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/user/register`,
    LOGIN: `${API_BASE_URL}/auth/user/login`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/user/forgot-password`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/user/verify-email`,
    RESEND_OPT:`${API_BASE_URL}/auth/user/resend-otp`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/user/reset-password`,
   
  },
  USER:{
    USER_PROFILE:`${API_BASE_URL}/user/get-user`
  },
  WALLETCONNECT:{
    WALLET_CONNECT:`${API_BASE_URL}/auth/user/connect-wallet`
  }
};

export const Cyptocoin_API={
    URL: Cyptocoin_API_URL,
    HOST: Cyptocoin_API_HOST,
    KEY: Cyptocoin_API_KEY
}

export const COINGECKO_ENDPOINTS={
  COINS_MARKET:`${COINGECKO_API}/coins/markets`
}