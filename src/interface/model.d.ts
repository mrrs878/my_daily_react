interface LoadingI {
  animating: boolean;
  text?: string;
}

interface BaseModelI {
  ID: number;
  CreatedAt: string;
  DeletedAt: string;
  UpdatedAt: string;
}

interface UserI extends BaseModelI {
  name: string;
  role: number;
  token: string;
}

interface TaskI extends BaseModelI {
  title: string;
  label: Array<string>;
  detail: string;
  status: number;
  alarmTime: number;
  validate: (...params: Array<any>) => string;
}

interface HabitI extends BaseModelI {
  title: string;
  label: Array<string>;
  detail: string;
  status: number;
  alarmTime: string;
  alarmDate: Array<string>;
  validate: (...params: Array<any>) => string;
}

interface MessageI extends BaseModelI {
  title: string;
  label: Array<string>;
  detail: string;
  status: number;
  userId: number;
}

interface ToastErrorI extends Error{
  msg: string;
}
