import { LOGIN, LOGIN_BY_GITHUB, REGISTER } from '@/api/auth';
import { RES_CODE } from '@/constant';
import { ALL_ACTION, ContextI } from '@/store';
import CONFIG from '@/config';
import { Toast } from 'antd-mobile';
import User from '@/model/User';

class AuthModule {
  rootContext: ContextI;

  constructor(rootContext: ContextI) {
    this.rootContext = rootContext;
  }

  async login(data: LoginReqI): Promise<boolean> {
    try {
      const res = await LOGIN(data);
      Toast.info(res.msg);
      if (res.code === RES_CODE.success) {
        this.updateToken(res.data);
      }
      return Promise.resolve(res.code === RES_CODE.success);
    } catch (e) {
      console.log(e);
      return Promise.resolve(false);
    }
  }

  updateToken(data: UserI) {
    this.rootContext.dispatch({ type: ALL_ACTION.SET_USER, data });
    localStorage.setItem(CONFIG.TOKEN_NAME, data.token);
  }

  async logout(): Promise<boolean> {
    localStorage.removeItem(CONFIG.TOKEN_NAME);
    this.rootContext.dispatch({ type: ALL_ACTION.SET_USER, data: new User() });
    this.rootContext.dispatch({ type: ALL_ACTION.SET_TASKS, data: [] });
    this.rootContext.dispatch({ type: ALL_ACTION.SET_MESSAGES, data: [] });
    return Promise.resolve(true);
  }

  static async register(data: LoginReqI): Promise<boolean> {
    try {
      const res = await REGISTER(data);
      Toast.info(res.msg);
      return Promise.resolve(res.code === RES_CODE.success);
    } catch (e) {
      console.log(e);
      return Promise.resolve(false);
    }
  }

  static async loginByGithub(code: string): Promise<UserI | null> {
    try {
      const res = await LOGIN_BY_GITHUB(code);
      return Promise.resolve(res.data);
    } catch (e) {
      console.log(e);
      return Promise.resolve(null);
    }
  }

  static getInstance(context: ContextI) {
    let instance: AuthModule;
    return () => {
      if (instance !== undefined) return instance;
      instance = new AuthModule(context);
      return instance;
    };
  }
}

const getAuthModule = AuthModule.getInstance;
export default getAuthModule;
