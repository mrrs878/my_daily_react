import * as types from './type';

type SetLoadingT = {
  type: types.SET_LOADING;
  data: LoadingI;
};

type SetUserT = {
  type: types.SET_USER_INFO;
  data: UserI;
};

type SetTasksI = {
  type: types.SET_TASKS;
  data: Array<TaskI>;
};

type SetHabitsI = {
  type: types.SET_HABITS;
  data: Array<HabitI>;
};

type SetMessagesI = {
  type: types.SET_MESSAGES;
  data: Array<MessageI>;
};

type ActionI =
  SetLoadingT |
  SetHabitsI |
  SetTasksI |
  SetMessagesI |
  SetUserT;

export default ActionI;
