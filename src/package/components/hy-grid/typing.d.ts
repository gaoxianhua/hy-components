import { CSSProperties } from "vue";

interface GridItem {
  /**
   * @description 图片或者icon
   * */
  icon: string;
  /**
   * @description 名称
   * */
  name: string;
  /**
   * @description 自定义内容键值对
   * */
  [key: string]: any;
}
export default interface IProps {
  /**
   * @description 数据集
   * */
  list: GridItem[];
  /**
   * @description 宫格的列数（默认 3 ）
   * */
  col?: number;
  /**
   * @description 是否显示宫格的边框（默认 false ）
   * */
  border?: boolean;
  /**
   * @description 单个宫格高度（默认 60px ）
   * */
  itemHeight?: number | string;
  /**
   * @description 宫格对齐方式，表现为数量少的时候，靠左，居中，还是靠右 （默认 'left' ）
   * */
  align?: "center" | HyApp.LeftRightType;
  /**
   * @description 间隔（默认 0px）
   * */
  gap?: number | string;
  /**
   * @description 宫格的背景颜色 （默认 'transparent' ）
   * */
  bgColor?: string;
  /**
   * @description icon图片大小
   * */
  iconSize?: number | string;
  /**
   * @description icon图片圆角
   * */
  round?: number | string;
  /**
   * @description icon图片和文字间距
   * */
  space?: number | string;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
