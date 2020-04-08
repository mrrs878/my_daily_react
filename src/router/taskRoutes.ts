const Task = () => import('@/views/task');
const AddTask = () => import('@/views/task/addTask/addTask');
const TaskDetail = () => import('@/views/task/taskDetail');

const BASE_PATH = '/task';

const TASK_ROUTES_MAP = {
  task: `${BASE_PATH}`,
  addTask: `${BASE_PATH}/add`,
  taskDetail: `${BASE_PATH}/:id`,
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
  {
    path: TASK_ROUTES_MAP.taskDetail,
    component: TaskDetail,
  },
];

export { TASK_ROUTES_MAP, TASK_ROUTES };
