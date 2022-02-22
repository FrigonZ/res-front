let token = '';

const key = 'res-token';

export const initToken = () => {
  if (token) return;
  const cache = localStorage.getItem(key) || '';
  token = cache;
};

export const checkToken = () => {
  if (!token) return false;
  return true;
};

export const setToken = (jwt: string) => {
  token = jwt;
  localStorage.setItem(key, token);
};

export const removeToken = () => {
  localStorage.removeItem(key);
};
