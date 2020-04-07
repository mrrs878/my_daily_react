import { ENVS } from '@/constant';

const MAIN_CONFIG = {
  // ENV: process.env.NODE_ENV === 'production' ? ENVS.dev : ENVS.test,
  ENV: ENVS.dev,
  TOKEN_NAME: 'access_token',
};

export default MAIN_CONFIG;
