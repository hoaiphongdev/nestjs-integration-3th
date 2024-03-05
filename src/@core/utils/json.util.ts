export const jsonParse = <T>(data: Stringified<T> | string, defaultValue?: any) => {
  try {
    return JSON.parse(data as string);
  } catch (error) {
    return defaultValue ?? undefined;
  }
};
