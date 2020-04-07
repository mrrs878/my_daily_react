import {
  ADD_HABIT, VIEW_HABITS, UPDATE_HABIT, VIEW_HABIT,
} from '@/api/habit';
import { RES_CODE } from '@/constant';
import store, {ALL_ACTION, ContextI} from '@/store';
import equals from 'ramda/src/equals';

class UserModule {
  rootContext: ContextI;

  constructor(rootContext: ContextI) {
    this.rootContext = rootContext;
  }

  async addHabit(habit: HabitI): Promise<ModuleResI> {
    try {
      const res = await ADD_HABIT(habit);
      if (res.code === RES_CODE.success) {
        await this.rootContext.dispatch({ type: ALL_ACTION.SET_HABITS, data: res.data });
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
      if (res.code === RES_CODE.success && !equals<Array<HabitI>>(res.data, this.rootContext.state.habits)) {
        await this.rootContext.dispatch({ type: ALL_ACTION.SET_HABITS, data: res.data });
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
        await store.dispatch(ACTIONS_E.updateHabit, res.data);
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
        await store.dispatch(ACTIONS_E.updateHabit, res.data);
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  }
}
