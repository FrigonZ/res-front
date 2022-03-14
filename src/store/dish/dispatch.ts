/* eslint-disable @typescript-eslint/default-param-last */
import { Action, dishState, DishState } from '../../constant/store';
import {
  AddDishesPayload, DishAction, SetCreateModalVisiblePaylod, SetDishesPayload, SetIsFetchingPayload,
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

const defaultHandler = (state: DishState): DishState => ({ ...state });

const handleActionMap = {
  [DishAction.SET_CREATE_MODAL_VISIBLE]: setCreateModalVisable,
  [DishAction.SET_DISHES]: setDishes,
  [DishAction.ADD_DISHES]: addDishes,
  [DishAction.SET_IS_FETCHING_DISH]: setIsFetching,
};

export const dish = (state: DishState = dishState, action: Action): DishState => {
  const { type } = action;
  const handler = handleActionMap[type as DishAction] || defaultHandler;
  return handler(state, action);
};
