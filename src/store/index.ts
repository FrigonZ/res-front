import { combineReducers, createStore } from 'redux';
import { user } from './user/dispatch';

const reducers = combineReducers({
  user,
});

export const store = createStore(reducers);

export type Dispatch = typeof store.dispatch;
