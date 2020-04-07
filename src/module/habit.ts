import {
  ADD_HABIT, VIEW_HABITS, UPDATE_HABIT, VIEW_HABIT,
} from '@/api/habit';
import { RES_CODE } from '@/constant';
import { ALL_ACTION, ContextI } from '@/store';
import equals from 'ramda/src/equals';

class HabitModule {
  rootContext: ContextI;

  constructor(rootContext: ContextI) {
    this.rootContext = rootContext;
  }

  async addHabit(habit: HabitI): Promise<ModuleResI> {
    try {
      const res = await ADD_HABIT(habit);
      if (res.code === RES_CODE.success) {
        this.rootContext.dispatch({ type: ALL_ACTION.ADD_HABIT, data: res.data });
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  }

  async viewHabits(): Promise<ModuleResI> {
    try {
      const res = await VIEW_HABITS();
      if (res.code === RES_CODE.success
          && !equals<Array<HabitI>>(res.data, this.rootContext.state.habits)) {
        this.rootContext.dispatch({ type: ALL_ACTION.SET_HABITS, data: res.data });
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  }

  async updateHabitStatus(id: number, status: number): Promise<ModuleResI> {
    try {
      const res = await UPDATE_HABIT({ id, status });
      if (res.code === RES_CODE.success) {
        this.rootContext.dispatch({ type: ALL_ACTION.UPDATE_HABIT, data: res.data });
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  }

  async refreshHabit(id: number): Promise<ModuleResI> {
    try {
      const res = await VIEW_HABIT(id);
      if (res.code === RES_CODE.success) {
        this.rootContext.dispatch({ type: ALL_ACTION.ADD_HABIT, data: res.data });
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  }

  static getInstance(context: ContextI) {
    let instance: HabitModule;
    return () => {
      if (instance !== undefined) return instance;
      instance = new HabitModule(context);
      return instance;
    };
  }
}

const getHabitModule = HabitModule.getInstance;
export default getHabitModule;
