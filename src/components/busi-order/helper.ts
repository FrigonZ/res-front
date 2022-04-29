import { FormatDish, OrderDish } from '../../constant/entity';

export const countDish = (dishes: OrderDish[]) => {
  const formatDishes: FormatDish[] = [];
  const dishesWithOptions = dishes.filter((dish) => dish.option?.length);
  const pureDishes = dishes.filter((dish) => !dish.option?.length);
  pureDishes.forEach((dish) => {
    const target = formatDishes.findIndex((formatDish) => formatDish.did === dish.did);
    if (target === -1) {
      formatDishes.push({
        ...dish,
        num: 1,
      });
    } else {
      formatDishes[target] = {
        ...formatDishes[target],
        num: formatDishes[target].num + 1,
      };
    }
  });
  return [
    ...formatDishes,
    ...dishesWithOptions.map((dish) => ({
      ...dish,
      num: 1,
    })),
  ];
};
