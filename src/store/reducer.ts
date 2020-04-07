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
    default:
      return state;
  }
}

export { rootReducer, DEFAULT_STATE };
