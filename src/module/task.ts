import {
  ADD_TASK, VIEW_TASKS, UPDATE_TASK, VIEW_TASK,
} from '@/api/task';
import { ALL_ACTION, ContextI } from '@/store';
import { RES_CODE } from '@/constant';
import { equals } from 'ramda';

class TaskModule {
  rootContext: ContextI;

  constructor(rootContext: ContextI) {
    this.rootContext = rootContext;
  }

  async addTask(data: TaskI): Promise<ModuleResI> {
    try {
      const res = await ADD_TASK(data);
      if (res.code === RES_CODE.success) {
        this.rootContext.dispatch({ type: ALL_ACTION.ADD_TASK, data: res.data });
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  }

  async viewTasks(): Promise<ModuleResI> {
    try {
      const res = await VIEW_TASKS();
      if (res.code === RES_CODE.success && !equals<Array<TaskI>>(res.data, this.rootContext.state.tasks)) {
        this.rootContext.dispatch({ type: ALL_ACTION.SET_TASKS, data: res.data });
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  }

  async refreshTask(id: number): Promise<ModuleResI> {
    try {
      const res = await VIEW_TASK(id);
      if (res.code === RES_CODE.success) {
        this.rootContext.dispatch({ type: ALL_ACTION.UPDATE_TASK, data: res.data });
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  }

  async updateTaskStatus(id: number, status: number): Promise<ModuleResI> {
    try {
      const res = await UPDATE_TASK({ id, status });
      if (res.code === RES_CODE.success) {
        this.rootContext.dispatch({ type: ALL_ACTION.UPDATE_TASK, data: res.data });
      }
      return Promise.resolve({ code: res.code, msg: res.msg });
    } catch (e) {
      console.log(e);
      return Promise.resolve({ code: RES_CODE.fail, msg: '' });
    }
  }

  static getInstance(context: ContextI) {
    let instance: TaskModule;
    return () => {
      if (instance !== undefined) return instance;
      instance = new TaskModule(context);
      return instance;
    };
  }
}

const getTaskModule = TaskModule.getInstance;
export default getTaskModule;
