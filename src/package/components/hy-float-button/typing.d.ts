import type { CSSProperties } from "vue";

interface MenusVo {
  /**
   * @description 显示菜单文本
   * */
  label?: string;
  /**
   * @description 跳转路径
   * */
  url?: string;
}

export type MenusType = MenusVo | string;

export default interface IProps {
  /**
   * @description 菜单栏集合
   * */
  menus?: MenusType[];
  /**
   * @description 打开方向，row-横向；column-纵向
   * */
  direction?: HyApp.DirectionType;
  /**
   * @description 按钮显示的图标
   * */
  icon?: string;
  /**
   * @description 按钮图标大小
   * */
  iconSize?: string | number;
  /**
   * @description 按钮图标颜色
   * */
  iconColor?: string;
  /**
   * @description 按钮距离底部的距离，默认单位为px
   * */
  bottom?: number | string;
  /**
   * @description 按钮距离左边的距离，默认单位为px
   * */
  left?: number | string;
  /**
   * @description 层级（默认：10086）
   * */
  zIndex?: number;
  /**
   * @description 按钮背景颜色
   * */
  bgColor?: string;
  /**
   * @description 按钮文字
   * */
  text?: string;
  /**
   * @description 按钮文字大小
   * */
  fontSize?: string | number;
  /**
   * @description 按钮文字的颜色
   * */
  textColor?: string;
  /**
   * @description 按钮的尺寸
   * */
  size?: HyApp.SizeType | string | number;
  /**
   * @description 按钮的形状
   * */
  shape?: HyApp.ShapeType;
  /**
   * @description 按钮的透明度
   * */
  opacity?: number;
  /**
   * @description 是否显示阴影（默认：true）
   * */
  shadow?: boolean;
  /**
   * @description 是否显示漂浮的动画（默认：true）
   * */
  float?: boolean;
  /**
   * @description 是否固定位置（默认：true）
   * */
  fixed?: boolean;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
