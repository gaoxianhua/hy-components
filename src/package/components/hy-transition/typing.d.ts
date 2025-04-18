import type { CSSProperties } from "vue";

export default interface IProps {
  /**
   * @description 是否展示组件
   * */
  show: boolean;
  /**
   * @description 使用的动画模式（默认：fade）
   * */
  mode?:
    | "fade"
    | "fade-up"
    | "fade-down"
    | "fade-left"
    | "fade-right"
    | "fade-zoom"
    | "slide-up"
    | "slide-down"
    | "slide-left"
    | "slide-right"
    | "zoom-in"
    | "zoom-out";
  /**
   * @description 动画的执行时间，单位ms
   * */
  duration?: number;
  /**
   * @description 使用的动画过渡函数（默认：ease-out）
   * */
  timingFunction?: string;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
