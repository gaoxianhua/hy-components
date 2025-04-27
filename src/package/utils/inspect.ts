/**
 * @description 判断字符串是否是数字
 * @param {string | number} text 值
 * @return {boolean}
 * */
export const isNumericString = (text: string | number): boolean => {
  return !isNaN(Number(text)) && typeof text === "string";
};
