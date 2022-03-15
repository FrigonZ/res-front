import { DishForm, DishProps } from '../constant/entity';
import { STORAGE } from '../constant/storage';

export const setDraft = (draft: DishForm) => {
  localStorage.setItem(STORAGE.DISH_DRAFT, JSON.stringify(draft));
};

export const removeDraft = () => {
  localStorage.removeItem(STORAGE.DISH_DRAFT);
};

export const getDraft = (): DishForm | null => {
  const draftJson = localStorage.getItem(STORAGE.DISH_DRAFT);
  if (!draftJson) return null;

  try {
    const draft = JSON.parse(draftJson);
    return draft;
  } catch (error) {
    return null;
  }
};

export const format2DishForm = (dish: DishProps): DishForm => ({
  ...dish,
  isNecessary: Number(dish.isNecessary) as 0 | 1,
});

export const format2Dish = (form: DishForm): DishProps => ({
  ...form,
  isNecessary: Boolean(form.isNecessary),
});
