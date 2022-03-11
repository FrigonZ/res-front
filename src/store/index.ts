import { combineReducers, createStore } from 'redux';
import { user } from './user/dispatch';
import { dish } from './dish/dispatch';

const reducers = combineReducers({
  user,
  dish,
});

export const store = createStore(reducers);

export type Dispatch = typeof store.dispatch;
