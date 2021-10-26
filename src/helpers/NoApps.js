export const noApps = (apps) => {
  for (let key in apps) {
    if (apps[key].length !== 0) return false;
  }
  return true;
};
