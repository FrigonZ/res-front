export interface DishProps {
  /** 餐品名 */
  name: string;
  /** 餐品价格 */
  price: number;
  /** 餐品图片 */
  pic?: string;
  /** 餐品描述 */
  desc?: string;
  /** 是否为必选品 */
  isNecessary?: boolean;
}
