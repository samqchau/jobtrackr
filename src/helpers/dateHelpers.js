export const formatDate = (date) => {
  let month = `${date.slice(5, 7)}`;
  let day = `${date.slice(8, 10)}`;
  let year = date.slice(0, 4);
  return `${month}/${day}/${year}`;
};

export const trimDate = (date) => {
  return date.slice(0, 10);
};
