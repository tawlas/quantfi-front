export const setInputText = (key: string, value: string) => {
  return {
    type: key,
    payload: value
  };
};
