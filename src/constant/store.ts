import { Action as Act } from 'redux';
import {
  DishForm, DishGroup, DishProps, Order,
} from './entity';

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
  /** 实时运营模块 */
  busi: BusiState;
  /** 订单模块状态 */
  order: OrderState;
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
  initialDish: null,
  editId: '',
  subDishes: [],
  groupModalVisible: false,
  groups: [],
};

/** 实时默认运营模块 */
export const busiState: BusiState = {
  isRunning: false,
  orders: [],
};

export const orderState: OrderState = {
  orders: [],
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
  /** 新增餐品表单预设 */
  initialDish: DishForm | null;
  /** 编辑餐品id */
  editId: string;
  /** 餐品搜索结果 */
  subDishes: DishProps[];
  /** 分组管理弹窗 */
  groupModalVisible: boolean;
  /** 分组 */
  groups: DishGroup[];
}

/** 实时运营模块 */
export interface BusiState {
  /** 当前运营状态 */
  isRunning: boolean;
  /** 当前订单 */
  orders: Order[];
}

export interface OrderState {
  /** 订单 */
  orders: Order[],
}
