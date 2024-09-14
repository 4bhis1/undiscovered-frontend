import {TaskAddForm, TaskEditForm} from './screens';

const stackRoutes = [
  {
    name: 'task-add',
    path: '/task-add',
    component: TaskAddForm,
  },
  {
    name: 'task-edit',
    path: '/task-edit',
    component: TaskEditForm,
  },
];

export default {
  stack: stackRoutes,
};
