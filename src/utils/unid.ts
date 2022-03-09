import { nanoid } from 'nanoid';

const idLength = 9;

export const generateUnid = (prefix = '') => {
  const id = prefix + nanoid(idLength);
  return id;
};
