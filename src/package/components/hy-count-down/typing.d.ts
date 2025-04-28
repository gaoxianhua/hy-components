import type { CSSProperties } from "vue";

export default interface IProps {
  /**
   * @description 倒计时时长，单位ms （默认 0 ）
   * */
  time: number;
  /**
   * @description 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒  （默认 'HH:mm:ss' ）
   * */
  format?: string;
  /**
   * @description 是否自动开始倒计时 （默认 true ）
   * */
  autoStart?: boolean;
  /**
   * @description 是否展示毫秒倒计时 （默认 false ）
   * */
  millisecond?: boolean;
}
