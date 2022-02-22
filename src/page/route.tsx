import React from 'react';
import Dish from './dish';
import Main from './main';

export interface PageRoute {
  name: string;
  path: string;
  component: JSX.Element;
}

export const routers: PageRoute[] = [
  {
    name: '主页',
    path: '/',
    component: <Main />,
  },
  {
    name: '菜单',
    path: '/dish',
    component: <Dish />,
  },
];
