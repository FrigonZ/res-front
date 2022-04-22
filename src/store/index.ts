import { combineReducers, createStore } from 'redux';
import { user } from './user/dispatch';
import { dish } from './dish/dispatch';
import { busi } from './busi/dispatch';
import { order } from './order/dispatch';

/** 注册所有reducer */
const reducers = combineReducers({
  user,
  dish,
  busi,
  order,
});

export const store = createStore(reducers);

export type Dispatch = typeof store.dispatch;
