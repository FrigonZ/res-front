/* eslint-disable @typescript-eslint/default-param-last */
import { Action, busiState, BusiState } from '../../constant/store';
import { BusiAction, SetBusiOrdersPayload, SetIsRunningPayload } from './action';

const setIsRunning = (state: BusiState, action: Action): BusiState => {
  const { isRunning } = action.payload as SetIsRunningPayload;
  return {
    ...state,
    isRunning,
  };
};

const setBusiOrders = (state: BusiState, action: Action): BusiState => {
  const { orders } = action.payload as SetBusiOrdersPayload;
  return {
    ...state,
    orders,
  };
};

const defaultHandler = (state: BusiState): BusiState => ({ ...state });

const handleActionMap = {
  [BusiAction.SET_OS_RUNNING]: setIsRunning,
  [BusiAction.SET_BUSI_ORDERS]: setBusiOrders,
};

export const busi = (state: BusiState = busiState, action: Action): BusiState => {
  const { type } = action;
  const handler = handleActionMap[type as BusiAction] || defaultHandler;
  return handler(state, action);
};
