// dataConversionUtils.js
export const stringToArray = (value) => {
  return value.split(",").map((item) => item.trim());
};

export const arrayToString = (arr) => {
  return arr.join(",");
};
