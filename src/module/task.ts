import {
  ADD_TASK, VIEW_TASKS, DEL_TASK, UPDATE_TASK, VIEW_TASK,
} from '@/api/task';
import { RootContext, ALL_ACTION } from '@/store';
import { RES_CODE } from '@/constant';
import ToastError from '@/model/ToastError';
import equals from 'ramda/src/equals';
import { Toast } from 'antd-mobile';
import { useContext } from 'react';

const { state, dispatch } = useContext(RootContext);
export default {
  async addTask(data: TaskI): Promise<ModuleResI> {
    try {
      const res = await ADD_TASK(data);
      if (res.code === RES_CODE.success) {
        await dispatch({ type: ALL_ACTION.SET_LOADING, data: false });
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  },
  async viewTasks(): Promise<ModuleResI> {
    try {
      const res = await VIEW_TASKS();
      if (res.code === RES_CODE.success && !equals<Array<TaskI>>(res.data, store.state.tasks)) {
        await store.dispatch(ACTIONS_E.updateTasks, res.data);
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  },
  async deleteTask(id: number): Promise<void> {
    try {
      const res = await DEL_TASK(id);
      Toast.info(res.msg);
      if (res.code !== RES_CODE.success) return;
      await store.dispatch(ACTIONS_E.delTask, id);
    } catch (e) {
      if (e instanceof ToastError) Toast.info(e.msg);
      console.log(e);
    }
  },
  async refreshTask(id: number): Promise<ModuleResI> {
    try {
      const res = await VIEW_TASK(id);
      if (res.code === RES_CODE.success) {
        await store.dispatch(ACTIONS_E.updateTask, res.data);
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  },
  async updateTaskStatus(id: number, status: number): Promise<ModuleResI> {
    try {
      const res = await UPDATE_TASK({ id, status });
      if (res.code === RES_CODE.success) {
        await store.dispatch(ACTIONS_E.updateTask, res.data);
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  },
};
