import { Order } from '../../constant/entity';
import { Action } from '../../constant/store';

export const enum BusiAction {
  SET_OS_RUNNING = 'SET_IS_RUNNING',
  SET_BUSI_ORDERS = 'SET_BUSI_ORDERS',
}

export interface SetIsRunningPayload {
  isRunning: boolean;
}

export interface SetBusiOrdersPayload {
  orders: Order[];
}

export const setIsRunning = (payload: SetIsRunningPayload): Action => ({
  type: BusiAction.SET_OS_RUNNING,
  payload,
});

export const setBusiOrders = (payload: SetBusiOrdersPayload): Action => ({
  type: BusiAction.SET_BUSI_ORDERS,
  payload,
});
