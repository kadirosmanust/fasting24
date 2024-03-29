const getItemFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

const setItemToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const removeItemFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export {
  getItemFromLocalStorage,
  setItemToLocalStorage,
  removeItemFromLocalStorage,
};
