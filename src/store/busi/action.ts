import { Action } from '../../constant/store';

export const enum BusiAction {
  SET_OS_RUNNING = 'SET_IS_RUNNING',
}

export interface SetIsRunningPayload {
  isRunning: boolean;
}

export const setIsRunning = (payload: SetIsRunningPayload): Action => ({
  type: BusiAction.SET_OS_RUNNING,
  payload,
});
