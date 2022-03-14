import React from 'react';
import Dish from './dish';
import Main from './main';

/** 页面路由项 */
export interface PageRoute {
  /** 导航名称 */
  name: string;
  /** 路径 */
  path: string;
  /** 渲染页面 */
  component: JSX.Element;
}

/** 页面路由 */
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
