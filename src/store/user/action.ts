import { Action } from '../../constant/store';

export const enum UserAction {
  SET_IS_LOGIN = 'SET_IS_LOGIN',
}

export interface SetIsLoginPayload {
  isLogin: boolean;
}

export const setIsLogin = (payload: SetIsLoginPayload): Action => ({
  type: UserAction.SET_IS_LOGIN,
  payload,
});
