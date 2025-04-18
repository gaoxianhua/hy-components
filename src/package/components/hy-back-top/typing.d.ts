import { CSSProperties } from "vue";
import { IconConfig } from "../../config";

export default interface IProps {
  /**
   * @description 返回顶部的形状，circle-圆形，square-方形 （默认 'circle' ）
   * */
  mode?: HyApp.ShapeType;
  /**
   * @description 自定义图标 （默认 'arrow-upward' ） 见官方文档示例
   * */
  icon?: string;
  /**
   * @description 提示文字
   * */
  text?: string;
  /**
   * @description 返回顶部滚动时间 （默认 500）
   * */
  duration?: number;
  /**
   * @description 滚动距离 （默认 0 ）
   * */
  scrollTop?: number;
  /**
   * @description 距离顶部多少距离显示，单位px （默认 400 ）
   * */
  top?: number | string;
  /**
   * @description 返回顶部按钮到底部的距离，单位px （默认 100 ）
   * */
  bottom?: number | string;
  /**
   * @description 返回顶部按钮到右边的距离，单位px （默认 20 ）
   * */
  right?: number | string;
  /**
   * @description 层级   （默认 888 ）
   * */
  zIndex?: number;
  /**
   * @description 图标的样式，对象形式   （默认 {color: '#909399',fontSize: '19px'}）
   * */
  iconStyle?: CSSProperties;
  /**
   * @description 定义需要用到的外部样式（默认{transform: "rotate(180deg)"}）
   * */
  customStyle?: CSSProperties;
}
