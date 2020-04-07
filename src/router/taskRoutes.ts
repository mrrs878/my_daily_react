const Task = () => import('../views/task');
const AddTask = () => import('../views/task/addTask');

const BASE_PATH = '/task';

const TASK_ROUTES_MAP = {
  task: `${BASE_PATH}`,
  addTask: `${BASE_PATH}/add`,
};

const TASK_ROUTES: Array<RouteConfigI> = [
  {
    path: TASK_ROUTES_MAP.task,
    auth: false,
    component: Task,
  },
  {
    path: TASK_ROUTES_MAP.addTask,
    component: AddTask,
  },
];

export { TASK_ROUTES_MAP, TASK_ROUTES };
