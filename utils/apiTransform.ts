export const snakeToCamel = <T>(obj: Record<string, T>) => {
  const camelObj: Record<string, T> = {};

  Object.keys(obj).forEach((key) => {
    const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    camelObj[camelKey] = obj[key];
  });

  return camelObj;
};
