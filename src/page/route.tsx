import React from 'react';
import { IMAGE } from '../constant/image';
import Comment from './comment';
import Dish from './dish';
import Main from './main';
import Order from './order';

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
    name: '店铺营业',
    path: '/',
    component: <Main />,
    icon: IMAGE.MY_RES,
  },
  {
    name: '餐品管理',
    path: '/dish',
    component: <Dish />,
    icon: IMAGE.DISH,
  },
  {
    name: '历史订单',
    path: '/order',
    component: <Order />,
    icon: IMAGE.ORDER,
  },
  {
    name: '客户留言',
    path: '/comment',
    component: <Comment />,
    icon: IMAGE.COMMENT,
  },
];

export const getRouteName = (path: string): string => {
  switch (path) {
    case '/':
      return '店铺营业';
    case '/dish':
      return '餐品管理';
    case '/order':
      return '历史订单';
    case '/comment':
      return '客户留言';
    default:
      return '';
  }
};
