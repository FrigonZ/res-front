import { Order } from '../../constant/entity';
import { Action } from '../../constant/store';

export const enum OrderAction {
  SET_ORDERS = 'SET_ORDERS',
}

export interface SetOrdersPayload {
  orders: Order[];
}

export const setOrders = (payload: SetOrdersPayload): Action => ({
  type: OrderAction.SET_ORDERS,
  payload,
});
