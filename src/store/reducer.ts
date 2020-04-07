import User from '@/model/User';
import Loading from '../model/Loading';
import * as types from './type';
import ActionI from './action';

const DEFAULT_STATE: StateI = {
  loading: new Loading(),
  user: new User(),
  habits: [],
  tasks: [],
};

function rootReducer(state = DEFAULT_STATE, action: ActionI): typeof DEFAULT_STATE {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: action.data };
    case types.SET_USER:
      return { ...state, user: action.data };
    case types.SET_TASKS:
      return { ...state, tasks: action.data };
    case types.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.data] };
    case types.UPDATE_TASK: {
      const { ID } = action.data;
      const index = state.tasks.findIndex((item) => item.ID === ID);
      const tasks = [...state.tasks];
      tasks[index] = action.data;
      return { ...state, tasks };
    }
    case types.SET_HABITS:
      return { ...state, habits: action.data };
    case types.ADD_HABIT:
      return { ...state, habits: [...state.habits, action.data] };
    case types.UPDATE_HABIT: {
      const { ID } = action.data;
      const index = state.habits.findIndex((item) => item.ID === ID);
      const habits = [...state.habits];
      habits[index] = action.data;
      return { ...state, habits };
    }
    default:
      return state;
  }
}

export { rootReducer, DEFAULT_STATE };
