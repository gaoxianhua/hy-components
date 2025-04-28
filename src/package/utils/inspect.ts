/**
 * @description 判断字符串是否是数字
 * @param {string | number} text 值
 * @return {boolean}
 * */
export const isNumericString = (text: string | number): boolean => {
  return typeof text === "string" && !isNaN(Number(text));
};

/**
 * @description 判断是否是数字
 * @param {string | number} text 值
 * @return {boolean}
 * */
export const isNumber = (text: string | number): boolean => {
  return typeof text === "number" || isNumericString(text);
  // return !isNaN(Number(text)) && isFinite(Number(text));
};

/**
 * 是否视频格式
 * @param {String} value
 */
export function isVideo(value: string): boolean {
  const VIDEO_REGEXP =
    /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
  return VIDEO_REGEXP.test(value);
}
