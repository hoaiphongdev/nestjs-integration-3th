export const modifyLoggerPinoBrowser = (loggerInput: object, level: string): object => {
  const timestamp = new Date(Date.now()).toISOString();
  delete (loggerInput as any)['time'];
  return { ...loggerInput, timestamp, level };
};

/**
 * @description
 * This function is used to remove circular references from objects.
 */
export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (_, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

export const jsonStringify = (obj: object): string => {
  return JSON.stringify(obj, getCircularReplacer());
};
