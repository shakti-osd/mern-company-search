export const setLocalData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
