import { DateModeEnum } from "../../typing";
import type { CSSProperties } from "vue";

export default interface IProps {
  /**
   * @description 用于控制选择器的弹出和收起 ( 默认 false )
   * */
  show?: boolean;
  /**
   * @description 弹出层弹出方向
   * */
  popupMode?: HyApp.LayoutType;
  /**
   * @description 是否显示顶部的操作栏  ( 默认 true )
   * */
  showToolbar?: boolean;
  /**
   * @description 绑定值
   * @note 类型有问题,需要调整（加了Date类型）
   * */
  modelValue: string | number | Date;
  /**
   * @description 顶部标题
   * */
  title?: string;
  /**
   * @description 展示格式 mode=date为日期选择，mode=time为时间选择，mode=year-month为年月选择，mode=datetime为日期时间选择  ( 默认 ‘datetime )
   * */
  mode?: DateModeEnum;
  /**
   * @description 可选的最大时间  默认值为后10年
   * */
  maxDate?: number;
  /**
   * @description 可选的最小时间  默认值为前10年
   * */
  minDate?: number;
  /**
   * @description 可选的最小小时，仅mode=time有效
   * */
  minHour?: number;
  /**
   * @description 可选的最大小时，仅mode=time有效
   * */
  maxHour?: number;
  /**
   * @description 可选的最小分钟，仅mode=time有效
   * */
  minMinute?: number;
  /**
   * @description 可选的最大分钟，仅mode=time有效
   * */
  maxMinute?: number;
  /**
   * @description 选项过滤函数
   * */
  filter?: null | ((type: string, values: string[]) => string[]);
  /**
   * @description 选项格式化函数
   * */
  formatter?: null | ((type: string, value: string) => string);
  /**
   * @description 是否显示加载中状态   ( 默认 false )
   * */
  loading?: boolean;
  /**
   * @description 各列中，单个选项的高度   ( 默认 44 )
   * */
  itemHeight?: number;
  /**
   * @description 取消按钮的文字  ( 默认 '取消' )
   * */
  cancelText?: string;
  /**
   * @description 确认按钮的文字  ( 默认 '确认' )
   * */
  confirmText?: string;
  /**
   * @description 取消按钮的颜色  ( 默认 '#909193' )
   * */
  cancelColor?: string;
  /**
   * @description 确认按钮的颜色  ( 默认 '#3c9cff' )
   * */
  confirmColor?: string;
  /**
   * @description 每列中可见选项的数量  ( 默认 5 )
   * */
  visibleItemCount?: number;
  /**
   * @description 是否允许点击遮罩关闭选择器  ( 默认 false )
   * */
  closeOnClickOverlay?: boolean;
  /**
   * @description 各列的默认索引
   * @note 类型有问题,需要调整
   * */
  defaultIndex?: Array<any>;
  /**
   * @description 是否禁用输入框 ( 默认 false )
   * */
  disabled?: boolean;
  /**
   * @description 输入框是否显示边框 ( 默认 false )
   * */
  hasInput?: boolean;
  /**
   * @description 自定义时间格式
   * */
  format?: string;
  /**
   * @description 输入框提示信息
   * */
  placeholder?: string;
  /**
   * @description 禁用时候输入框颜色
   * */
  disabledColor?: string;
  /**
   * @description 右边插槽
   * */
  toolbarRightSlot?: boolean;
  /**
   * @description 输入框形状
   * */
  shape?: HyApp.ShapeType;
  /**
   * @description 输入框边框
   * */
  border?: HyApp.BorderType;
  /**
   * @description 自定义输入框外部样式
   * */
  customStyle?: CSSProperties;
}
