interface AjaxResponseI<T> {
  data: T;
  code: number;
  msg: string;
  status: number;
}

interface LoginReqI {
  name: string;
  password: string;
}

interface UpdateTaskStatusReqT {
  id: number;
  status: number;
}
