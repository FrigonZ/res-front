import React from 'react';
import { IMAGE } from '../constant/image';
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
  /** icon */
  icon: string;
}

/** 页面路由 */
export const routers: PageRoute[] = [
  {
    name: '主页',
    path: '/',
    component: <Main />,
    icon: IMAGE.UPLOAD,
  },
  {
    name: '菜单',
    path: '/dish',
    component: <Dish />,
    icon: IMAGE.UPLOAD,
  },
];
