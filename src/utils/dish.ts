/* eslint-disable no-restricted-syntax */
import { DishOption } from '../constant/entity';

export const parseOption = (raw: string): DishOption[] => {
  try {
    const options = JSON.parse(raw);
    if (!Array.isArray(options)) {
      return [];
    }
    const isOption = options.every((option) => checkoutOption(option));
    if (!isOption) return [];
    return options;
  } catch (error) {
    return [];
  }
};

export const checkoutOption = (option: DishOption): boolean => {
  try {
    const keys = Object.keys(option);
    const { group, content } = option;
    if (keys.length !== 2) return false;
    if (typeof group !== 'string') return false;
    if (!content || !checkContent(content)) return false;
    return true;
  } catch (error) {
    return false;
  }
};

export const checkContent = (content: Record<string, number>): boolean => {
  for (const key in content as any) {
    if (Object.prototype.hasOwnProperty.call(content, key)) {
      if (typeof content[key] !== 'number') return false;
    }
  }
  return true;
};

export const stringsifyOptions = (options: DishOption[], showPrice = false): string => {
  if (!options.length) return '';
  const format = options.map((option) => {
    const { group, content } = option;
    return `${group}: ${stringsifyContent(content as any, showPrice)}`;
  });
  return format.join(' | ');
};

export const stringsifyContent = (content: Record<string, number>, showPrice = false): string => {
  if (!showPrice) return Object.keys(content).join(',');

  const tmp = [];
  for (const key in content as any) {
    if (Object.prototype.hasOwnProperty.call(content, key)) {
      tmp.push(`${key}-${content[key]}`);
    }
  }
  return tmp.join(',');
};
