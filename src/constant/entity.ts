/** 餐品状态 */
export const enum DishStatus {
  /** 正常 */
  NORMAL,
  /** 售罄 */
  SOLD_OUT,
  /** 下架 */
  CLOSED,
}

/** 餐品自定义 */
export interface DishOption {
  /** 分组名 */
  group?: string;
  /** 选项名 */
  names: string[];
  /** 选项价格 */
  prices: number[];
  /** 是否多选 */
  isMulti: boolean;
}

export interface DishProps {
  /** id */
  did?: string;
  /** 餐品名 */
  name: string;
  /** 餐品价格 */
  price: number;
  /** 餐品图片 */
  pic?: string;
  /** 餐品描述 */
  desc?: string;
  /** 是否为必选品 */
  isNecessary: boolean;
  /** 餐品状态 */
  status?: DishStatus;
  /** 餐品自定义 */
  options?: DishOption[];
}

export interface DishForm {
  /** id */
  did?: string;
  /** 餐品名 */
  name: string;
  /** 餐品价格 */
  price: number;
  /** 餐品图片 */
  pic?: string;
  /** 餐品描述 */
  desc?: string;
  /** 是否为必选品 */
  isNecessary: 0 | 1;
  /** 餐品状态 */
  status?: DishStatus;
  /** 餐品自定义 */
  options?: DishOption[];
}
