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

/**
 * 判断是否是日期格式
 * @param {number | string} value yyyy-mm-dd hh:mm:ss 或 时间戳
 */
export const isDate = (value: string | number) => {
  if (!value) return false;
  // number类型，判断是否是时间戳
  if (typeof value === "number") {
    // len === 10 秒级时间戳 len === 13 毫秒级时间戳
    if (value.toString().length !== 10 && value.toString().length !== 13) {
      return false;
    }
    return !isNaN(new Date(value).getTime());
  }
  if (typeof value === "string") {
    // 是否为string类型时间戳
    const numV = Number(value);
    if (!isNaN(numV)) {
      if (numV.toString().length === 10 || numV.toString().length === 13) {
        return !isNaN(new Date(numV).getTime());
      }
    }
    // 非时间戳，且长度在yyyy-mm-dd 至 yyyy-mm-dd hh:mm:ss 之间
    if (value.length < 10 || value.length > 19) {
      return false;
    }
    const dateRegex = /^\d{4}[-\/]\d{2}[-\/]\d{2}( \d{1,2}:\d{2}(:\d{2})?)?$/;
    if (!dateRegex.test(value)) {
      return false;
    }
    // 检查是否为有效日期
    const dateValue = new Date(value);
    return !isNaN(dateValue.getTime());
  }
  // 非number和string类型，不做校验
  return false;
};
