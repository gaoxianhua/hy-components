import type { CSSProperties } from "vue";

export default interface IProps {
  /**
   * @description 是否显示遮罩（默认 false ）
   * */
  show?: boolean;
  closeOnClick?: boolean;
  name?: string;
  disabled?: boolean;
  threshold?: number;
  autoClose?: boolean;
  options?: any[];
  duration?: number;
  openItem?: boolean;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
