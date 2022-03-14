import { Action as Act } from 'redux';
import { DishProps } from './entity';

/** redux-action */
export interface Action extends Act<string> {
  payload: any;
}

/** 应用总状态 */
export interface State {
  /** 用户模块状态 */
  user: UserState;
  /** 餐品模块状态 */
  dish: DishState;
}

/** 用户模块默认状态 */
export const userState: UserState = {
  isLogin: true,
};

/** 餐品模块默认状态 */
export const dishState: DishState = {
  createModalVisible: false,
  isFetching: false,
  dishes: [],
};

/** 用户模块状态 */
export interface UserState {
  /** 登录标识 */
  isLogin: boolean;
}

/** 餐品模块状态 */
export interface DishState {
  /** 新增餐品弹窗可视度 */
  createModalVisible: boolean;
  /** 餐品信息拉取中 */
  isFetching: boolean;
  /** 线上餐品信息 */
  dishes: DishProps[];
}
