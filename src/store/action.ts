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
type AddTaskI = {
  type: types.ADD_TASK,
  data: TaskI
};
type UpdateTaskI = {
  type: types.UPDATE_TASK,
  data: TaskI
};

type SetHabitsI = {
  type: types.SET_HABITS;
  data: Array<HabitI>;
};
type AddHabitI = {
  type: types.ADD_HABIT,
  data: HabitI
};
type UpdateHabitI = {
  type: types.UPDATE_HABIT,
  data: HabitI
};

type SetMessagesI = {
  type: types.SET_MESSAGES;
  data: Array<MessageI>;
};

type ActionI =
  SetLoadingT |
  SetHabitsI |
  AddHabitI |
  UpdateHabitI |
  SetTasksI |
  AddTaskI |
  UpdateTaskI |
  SetMessagesI |
  SetUserT;

export default ActionI;
