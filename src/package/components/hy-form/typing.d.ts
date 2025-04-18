import { FormColumnsType } from "../../typing";

export default interface IProps {
  /**
   * @description 表单域提示文字的位置
   * left - 左侧
   * top - 上方
   * */
  labelPosition?: "left" | "top";
  /**
   * @description label宽度
   * 数字 - 固定值
   * auto - 自适应
   * */
  labelWidth?: string | number;
  /**
   * @description 是否右对齐
   * */
  right?: boolean;
  /**
   * @description label字体的对齐方式
   * left - 左对齐
   * center - 中间对齐
   * right - 右对齐
   * */
  labelAlign?: HyApp.LeftRightType | "center";
  /**
   * @description 当行内容高度
   * */
  itemHeight?: number | string;
  /**
   * @description 是否全部禁用
   * */
  disabled?: boolean;
  /**
   * @description 输入框形状
   * */
  shape?: HyApp.ShapeType;
  /**
   * @description 输入框边框
   * */
  border?: HyApp.BorderType;
  /**
   * @description 表单配置
   * */
  columns: FormColumnsType[];
  /**
   * @description 表单值
   * */
  formData: Record<string, any>;
}
