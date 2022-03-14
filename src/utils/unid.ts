import { nanoid } from 'nanoid';

/** unid编码长度 */
const idLength = 9;

/**
 * 生成unid
 * @param prefix unid前缀
 * @returns unid
 */
export const generateUnid = (prefix = ''): string => {
  const id = prefix + nanoid(idLength);
  return id;
};
