import { FormatDish, OrderDish } from '../../constant/entity';

export const countDish = (dishes: OrderDish[]) => {
  const formatDishes: FormatDish[] = [];
  dishes.forEach((dish) => {
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
  return formatDishes;
};
