import { Action } from '../../constant/store';

export const enum UserAction {
  SET_IS_LOGIN = 'SET_IS_LOGIN',
}

export const setIsLogin = (payload: any): Action => ({
  type: UserAction.SET_IS_LOGIN,
  payload,
});
