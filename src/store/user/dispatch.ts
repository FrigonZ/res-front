/* eslint-disable @typescript-eslint/default-param-last */
import { Action, userState, UserState } from '../../constant/store';
import { UserAction } from './action';

const setIsLogin = (state: UserState, action: Action) => {
  const { isLogin } = action.payload;
  return {
    ...state,
    isLogin,
  };
};

const defaultHandler = (state: UserState) => ({ ...state });

const handleActionMap = {
  [UserAction.SET_IS_LOGIN]: setIsLogin,
};

export const user = (state: UserState = userState, action: Action) => {
  const { type } = action;
  const handler = handleActionMap[type as UserAction] || defaultHandler;
  return handler(state, action);
};
