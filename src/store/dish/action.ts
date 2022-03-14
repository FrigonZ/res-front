import { DishProps } from '../../constant/entity';
import { Action } from '../../constant/store';

export const enum DishAction {
  SET_CREATE_MODAL_VISIBLE = 'SET_CREATE_MODAL_VISIBLE',
  SET_DISHES = 'SET_DISHES',
  ADD_DISHES = 'ADD_DISHES',
  SET_IS_FETCHING_DISH = 'SET_IS_FETCHING_DISH',
}

export interface SetCreateModalVisiblePaylod {
  createModalVisible: boolean;
}

export interface SetDishesPayload {
  dishes: DishProps[];
}

export interface AddDishesPayload {
  dishes: DishProps[];
}

export interface SetIsFetchingPayload {
  isFetching: boolean;
}

export const setCreateModalVisable = (payload: SetCreateModalVisiblePaylod): Action => ({
  type: DishAction.SET_CREATE_MODAL_VISIBLE,
  payload,
});

export const setDishes = (payload: SetDishesPayload): Action => ({
  type: DishAction.SET_DISHES,
  payload,
});

export const addDishes = (payload: AddDishesPayload): Action => ({
  type: DishAction.ADD_DISHES,
  payload,
});

export const setIsFetching = (payload: SetIsFetchingPayload): Action => ({
  type: DishAction.SET_IS_FETCHING_DISH,
  payload,
});
