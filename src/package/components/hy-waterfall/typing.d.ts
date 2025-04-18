import { CSSProperties } from "vue";

export default interface IProps {
  /**
   * @description 数据列表
   * */
  list: (AnyObject | string)[];
  /**
   * @description 容器高度，必须给个高度，否则加载全部数据
   * */
  containerHeight: string;
  /**
   * @description 子容器的高度，必须和内容一致，否则计算有问题
   * */
  itemHeight?: number | string;
  /**
   * @description 定义需要用到的外部样式
   * */
  customStyle?: CSSProperties;
}
