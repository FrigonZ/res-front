import { Action as Act } from 'redux';

export interface Action extends Act<string> {
  payload: any;
}

export const defaultState: State = {
  user: {
    isLogin: false,
  },
};

export interface State {
  user: UserState;
}

export const userState: UserState = {
  isLogin: false,
};

export interface UserState {
  isLogin: boolean;
}
