import { GET_INFO } from '@/api/user';
import { RES_CODE } from '@/constant';
import { ALL_ACTION, ContextI } from '@/store';

class UserModule {
  rootContext: ContextI;

  constructor(rootContext: ContextI) {
    this.rootContext = rootContext;
  }

  async getUserInfo(): Promise<ModuleResI> {
    try {
      const res = await GET_INFO();
      if (res.code === RES_CODE.success) {
        await this.rootContext.dispatch({ type: ALL_ACTION.SET_USER, data: res.data });
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  }

  static getInstance(context: ContextI) {
    let instance: UserModule;
    return () => {
      if (instance !== undefined) return instance;
      instance = new UserModule(context);
      return instance;
    };
  }
}

const getUserModule = UserModule.getInstance;
export default getUserModule;
