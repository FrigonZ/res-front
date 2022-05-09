import {
  Discount, DishForm, DishGroup, DishProps,
} from '../../constant/entity';
import { Action } from '../../constant/store';

export const enum DishAction {
  SET_CREATE_MODAL_VISIBLE = 'SET_CREATE_MODAL_VISIBLE',
  SET_DISHES = 'SET_DISHES',
  ADD_DISHES = 'ADD_DISHES',
  SET_IS_FETCHING_DISH = 'SET_IS_FETCHING_DISH',
  SET_INITIAL_DISH = 'SET_INITIAL_DISH',
  SET_EDIT_DISH_ID = 'SET_EDIT_DISH_ID',
  SET_SUB_DISHES = 'SET_SUB_DISHES',
  SET_GROUP_MODAL_VISIBLE = 'SET_GROUP_MODAL_VISIBLE',
  SET_GROUPS = 'SET_GROUPS',
  SET_DISCOUNT_MODAL_VISIBLE = 'SET_DISCOUNT_MODAL_VISIBLE',
  SET_DISCOUNT = 'SET_DISCOUNT',
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

export interface SetInitialDishPayload {
  initialDish: DishForm | null;
}

export interface SetEditDishIdPayload {
  editId: string;
}

export interface SetSubDishesPayload {
  subDishes: DishProps[];
}

export interface SetGroupModalVisiblePayload {
  groupModalVisible: boolean;
}

export interface SetGroupsPayload {
  groups: DishGroup[];
}

export interface SetDiscountModalVisiblePayload {
  discountModalVisible: boolean;
}

export interface SetDiscountPayload {
  discounts: Discount[];
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

export const setInitialDish = (payload: SetInitialDishPayload): Action => ({
  type: DishAction.SET_INITIAL_DISH,
  payload,
});

export const setEditDishId = (payload: SetEditDishIdPayload): Action => ({
  type: DishAction.SET_EDIT_DISH_ID,
  payload,
});

export const setSubDishes = (payload: SetSubDishesPayload): Action => ({
  type: DishAction.SET_SUB_DISHES,
  payload,
});

export const setGroupModalVisible = (payload: SetGroupModalVisiblePayload): Action => ({
  type: DishAction.SET_GROUP_MODAL_VISIBLE,
  payload,
});

export const setGroups = (payload: SetGroupsPayload): Action => ({
  type: DishAction.SET_GROUPS,
  payload,
});

export const setDiscountModalVisible = (payload: SetDiscountModalVisiblePayload): Action => ({
  type: DishAction.SET_DISCOUNT_MODAL_VISIBLE,
  payload,
});

export const setDiscount = (payload: SetDiscountPayload): Action => ({
  type: DishAction.SET_DISCOUNT,
  payload,
});
