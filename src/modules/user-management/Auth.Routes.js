// import ChangePassword from './screens/ChangePassword-Router';
// import ForgotPassword from './screens/ForgotPassword-Router';
// import ResetPassword from './screens/ResetPassword-Router';
import Login from './screens/LoginForm';
import RegisterForm from './screens/RegisterForm';

const stackRoutes = [
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
  {
    name: 'register',
    path: '/register',
    component: RegisterForm,
  },
  // {
  //   name: 'change-password',
  //   path: '/change-password',
  //   component: ChangePassword,
  // },
  // {
  //   name: 'forgot-password',
  //   path: '/forgot-password',
  //   component: ForgotPassword,
  // },
  // {
  //   name: 'reset-password',
  //   path: '/reset-password',
  //   component: ResetPassword,
  // },
];

export default {stack: stackRoutes};
