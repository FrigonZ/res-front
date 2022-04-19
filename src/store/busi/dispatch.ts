/* eslint-disable @typescript-eslint/default-param-last */
import { Action, busiState, BusiState } from '../../constant/store';
import { BusiAction, SetIsRunningPayload } from './action';

const setIsRunning = (state: BusiState, action: Action): BusiState => {
  const { isRunning } = action.payload as SetIsRunningPayload;
  return {
    ...state,
    isRunning,
  };
};

const defaultHandler = (state: BusiState): BusiState => ({ ...state });

const handleActionMap = {
  [BusiAction.SET_OS_RUNNING]: setIsRunning,
};

export const busi = (state: BusiState = busiState, action: Action): BusiState => {
  const { type } = action;
  const handler = handleActionMap[type as BusiAction] || defaultHandler;
  return handler(state, action);
};
