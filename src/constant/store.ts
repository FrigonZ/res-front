import { Action as Act } from 'redux';
import { DishProps } from './entity';

export interface Action extends Act<string> {
  payload: any;
}

export interface State {
  user: UserState;
  dish: DishState;
}

export const userState: UserState = {
  isLogin: true,
};

export const dishState: DishState = {
  createModalVisible: false,
  isFetching: false,
  dishes: [],
};

export interface UserState {
  isLogin: boolean;
}

export interface DishState {
  createModalVisible: boolean;
  isFetching: boolean;
  dishes: DishProps[];
}
