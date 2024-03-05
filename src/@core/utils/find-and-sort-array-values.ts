import { cloneDeep, isArray, sortBy } from 'lodash';

export const findAndSortAllArrayValuesInObject = (obj?: Record<string, any>) => {
  if (!obj) return obj;
  const clonedOptions = cloneDeep(obj);
  const keys = Object.keys(clonedOptions);
  keys.forEach((key) => {
    if (isArray(clonedOptions[key])) {
      clonedOptions[key] = sortBy(clonedOptions[key]);
    }
  });
  return clonedOptions;
};
