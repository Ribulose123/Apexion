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
   WALLET_CONNECT:`${API_BASE_URL}/auth/user/connect-wallet`
  },
  USER:{
    USER_PROFILE:`${API_BASE_URL}/user/get-user`,
    USER_CHART:`${API_BASE_URL}/user/balance-chart/{platformAssetId}`,
    USER_UPDATEPASSWORD:`${API_BASE_URL}/user/update-password`,
    CONVERT_ASSEST:`${API_BASE_URL}/user/convert-asset`,
    TWO_FACTOR:`${API_BASE_URL}/user/update-user`
  },
ASSET:{
  ASSET_LIST:`${API_BASE_URL}/asset`,
  ASSET_CREATE:`${API_BASE_URL}/asset/create-platform-asset`,
},
TRANSACTION:{
  CREATE_TRANCSACTION:`${API_BASE_URL}/transaction`,
  TRANSACTION_HISTORY:`${API_BASE_URL}/transaction/user`,
},
SIGNAL:{
  GET_SIGNAL:`${API_BASE_URL}/signal`
},
STAKING:{
  GET_SIGNAL:`${API_BASE_URL}/staking`
},
SUBSCRIPTION:{
  GET_SUB:`${API_BASE_URL}/subscription`
},
TRADERS:{
  GET_ALL_TRADERS:`${API_BASE_URL}/trade/user/traders`,
  GET_ALL_TRADERS_DETAILS:`${API_BASE_URL}/trade/user/trader/{traderId}`,
  COPY_TRADER: `${API_BASE_URL}/trade/copy`,
  COPY_FAVOURITE: `${API_BASE_URL}/trade/favorites`
}, 

};

export const Cyptocoin_API={
    URL: Cyptocoin_API_URL,
    HOST: Cyptocoin_API_HOST,
    KEY: Cyptocoin_API_KEY
}

export const COINGECKO_ENDPOINTS={
  COINS_MARKET:`${COINGECKO_API}/coins/markets`
}