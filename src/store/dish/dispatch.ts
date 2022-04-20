/* eslint-disable @typescript-eslint/default-param-last */
import { Action, dishState, DishState } from '../../constant/store';
import {
  AddDishesPayload,
  DishAction,
  SetCreateModalVisiblePaylod,
  SetDishesPayload,
  SetEditDishIdPayload,
  SetGroupModalVisiblePayload,
  SetGroupsPayload,
  SetInitialDishPayload,
  SetIsFetchingPayload,
  SetSubDishesPayload,
} from './action';

const setCreateModalVisable = (state: DishState, action: Action): DishState => {
  const { createModalVisible } = action.payload as SetCreateModalVisiblePaylod;
  return {
    ...state,
    createModalVisible,
  };
};

const setDishes = (state: DishState, action: Action): DishState => {
  const { dishes } = action.payload as SetDishesPayload;
  return {
    ...state,
    dishes,
  };
};

const addDishes = (state: DishState, action: Action): DishState => {
  const { dishes } = action.payload as AddDishesPayload;
  return {
    ...state,
    dishes: [
      ...state.dishes,
      ...dishes,
    ],
  };
};

const setIsFetching = (state: DishState, action: Action): DishState => {
  const { isFetching } = action.payload as SetIsFetchingPayload;
  return {
    ...state,
    isFetching,
  };
};

const setInitialDish = (state: DishState, action: Action): DishState => {
  const { initialDish } = action.payload as SetInitialDishPayload;
  return {
    ...state,
    initialDish,
  };
};

const setEditDishId = (state: DishState, action: Action): DishState => {
  const { editId } = action.payload as SetEditDishIdPayload;
  return {
    ...state,
    editId,
  };
};

const setSubDishes = (state: DishState, action: Action): DishState => {
  const { subDishes } = action.payload as SetSubDishesPayload;
  return {
    ...state,
    subDishes,
  };
};

const setGroupModalVisible = (state: DishState, action: Action): DishState => {
  const { groupModalVisible } = action.payload as SetGroupModalVisiblePayload;
  return {
    ...state,
    groupModalVisible,
  };
};

const setGroups = (state: DishState, action: Action): DishState => {
  const { groups } = action.payload as SetGroupsPayload;
  return {
    ...state,
    groups,
  };
};

const defaultHandler = (state: DishState): DishState => ({ ...state });

const handleActionMap = {
  [DishAction.SET_CREATE_MODAL_VISIBLE]: setCreateModalVisable,
  [DishAction.SET_DISHES]: setDishes,
  [DishAction.ADD_DISHES]: addDishes,
  [DishAction.SET_IS_FETCHING_DISH]: setIsFetching,
  [DishAction.SET_INITIAL_DISH]: setInitialDish,
  [DishAction.SET_EDIT_DISH_ID]: setEditDishId,
  [DishAction.SET_SUB_DISHES]: setSubDishes,
  [DishAction.SET_GROUP_MODAL_VISIBLE]: setGroupModalVisible,
  [DishAction.SET_GROUPS]: setGroups,
};

export const dish = (state: DishState = dishState, action: Action): DishState => {
  const { type } = action;
  const handler = handleActionMap[type as DishAction] || defaultHandler;
  return handler(state, action);
};
