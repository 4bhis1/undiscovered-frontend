import React from 'react';
import Home from './screens/Home';

const stackRoutes = [
  {
    name: 'home',
    path: '/home',
    component: Home,
  },
  {
    name: 'apple',
    path: '/apple',
    component: () => {
      return <div>Apple</div>;
    },
  },
];

export default {
  stack: stackRoutes,
};
