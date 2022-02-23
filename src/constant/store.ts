import { Action as Act } from 'redux';

export interface Action extends Act<string> {
  payload: any;
}

export const defaultState: State = {
  user: {
    isLogin: true,
  },
};

export interface State {
  user: UserState;
}

export const userState: UserState = {
  isLogin: true,
};

export interface UserState {
  isLogin: boolean;
}
