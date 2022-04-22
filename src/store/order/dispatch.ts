/* eslint-disable @typescript-eslint/default-param-last */

import { Action, orderState, OrderState } from '../../constant/store';
import { OrderAction, SetOrdersPayload } from './action';

const setOrders = (state: OrderState, action: Action): OrderState => {
  const { orders } = action.payload as SetOrdersPayload;
  return {
    ...state,
    orders,
  };
};

const defaultHandler = (state: OrderState): OrderState => ({ ...state });

const handleActionMap = {
  [OrderAction.SET_ORDERS]: setOrders,
};

export const order = (state: OrderState = orderState, action: Action): OrderState => {
  const { type } = action;
  const handler = handleActionMap[type as OrderAction] || defaultHandler;
  return handler(state, action);
};
