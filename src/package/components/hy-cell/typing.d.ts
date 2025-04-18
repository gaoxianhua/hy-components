import type { CSSProperties } from "vue";
import { HyApp } from "@/package/typing/modules/common";

export interface CellContentVo extends AnyObject {
  /**
   * @description 单元格左图标
   * */
  icon?: string;
  /**
   * @description 单元格标题
   * */
  title?: string;
  /**
   * @description 单元格副标题
   * */
  subhead?: string;
  /**
   * @description 是否禁用单元格
   * */
  disabled?: boolean;
  /**
   * @description 单元格右图标
   * */
  rightIcon?: string;
  /**
   * @description 单元格值
   * */
  value?: string;
  /**
   * @description 跳转页面地址
   * */
  url?: string;
  /**
   * @description 单元格右侧箭头的方向，可选值为：left，up，down
   * */
  arrowDirection?: HyApp.RotateType;
}
export default interface IProps {
  /**
   * @description cell列表数据
   * */
  list: CellContentVo[];
  /**
   * @description 头部标题
   * */
  title?: string;
  /**
   * @description 是否显示头部底部边框
   * */
  titleBorder?: boolean;
  /**
   * @description 是否显示cell下边框 (默认 true )
   * */
  border?: boolean;
  /**
   * @description 标题前缀竖线颜色
   * */
  verticalColor?: string;
  /**
   * @description 是否显示标题前缀竖线
   * */
  showVertical?: boolean;
  /**
   * @description 是否禁用cell（默认false）
   * */
  disabled?: boolean;
  /**
   * @description 是否开启点击反馈(表现为点击时加上灰色背景) （默认 false ）
   * */
  clickable?: boolean;
  /**
   * @description 单元的大小，可选值为 large，medium，small
   * */
  size?: HyApp.SizeType;
  /**
   * @description 右侧的内容
   * */
  value?: string;
  /**
   * @description 内容是否垂直居中(主要是针对右侧的value部分) (默认 false )
   * */
  arrange?: HyApp.LeftRightType | "center";
  /**
   * @description 右侧的图标箭头 （默认 'right'）
   * */
  rightIcon?: string;
  /**
   * @description 右侧箭头的方向，可选值为：left，up，down
   * */
  arrowDirection?: "left" | "up" | "down" | "right";
  /**
   * @description 自定义右侧icon样式
   * */
  rightIconStyle?: CSSProperties;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
