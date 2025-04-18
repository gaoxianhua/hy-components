import { DateModeEnum } from "./enum";
import { CheckboxColumnsVo } from "../../components/hy-check-button/typing";

/**
 * 类型
 * */
export enum FormTypeEnum {
  /**
   * 上传文件
   * */
  UPLOAD = "upload",
  /**
   * 普通输入框
   * */
  TEXT = "text",
  /**
   * 数字输入框
   * */
  NUMBER = "number",
  /**
   * 密码输入框
   * */
  PASSWORD = "password",
  /**
   * 身份证id输入框
   * */
  ID_CARD = "idcard",
  /**
   * 单选
   * */
  RADIO = "radio",
  /**
   * 时间选择器
   * */
  DATE = "date",
  /**
   * 选择器
   * */
  SELECT = "select",
  /**
   * 地址选择器
   * */
  ADDRESS = "address",
  /**
   * 开关
   * */
  SWITCH = "switch",
  /**
   * 详情
   * */
  DETAIL = "detail",
  /**
   * 文本域
   * */
  TEXTAREA = "textarea",
  /**
   * 自定义
   * */
  CUSTOM = "custom"
}

export interface FormColumnsType {
  /**
   * 标题
   * */
  label: string;
  /**
   * 字段
   * */
  field: string;
  /**
   * 是否需要校验
   * */
  required?: boolean;
  /**
   * 右固定
   * */
  right?: boolean;
  /**
   * @description 表单类型
   * */
  type: FormTypeEnum;
  /**
   * @description 文件最大上传数据
   * */
  maxCount?: number;
  /**
   * @description 是否禁用
   * */
  disabled?: boolean;
  /**
   * @description 输入框为空时的占位符
   * */
  placeholder?: string;
  /**
   * @description 清除输入框
   * */
  clearable?: boolean;
  /**
   * @description 只读
   * */
  readonly?: boolean;
  /**
   * @description type = select时候必填
   * */
  select?: string[][] | { text: string; id: string }[][];
  /**
   * @description type = radio时候必填
   * */
  actions?: CheckboxColumnsVo[];
  /**
   * @description 输入框形状
   * */
  shape?: HyApp.ShapeType;
  /**
   * @description 输入框边框
   * */
  border?: HyApp.BorderType;
  /**
   * @description 输入框边框
   * */
  mode?: DateModeEnum;
  /**
   * @description 规则校验
   * */
  rules?: RulesVo | RulesVo[];
}

export interface RulesVo {
  /**
   * @description 是否必填
   * */
  required?: boolean;
  /**
   * @description 校验不通过时的提示信息
   * */
  message?: string;
  /**
   * @description 表单事件校验
   * */
  trigger?: ("blur" | "change")[];
  /**
   * @description 最小值
   * */
  min?: number;
  /**
   * @description 最大值
   * */
  max?: number;
  /**
   * @description 基础正则校验
   * phone - 手机号校验
   * email - 邮箱校验
   * password - 复杂密码校验
   * */
  type?: "phone" | "email" | "password";
  /**
   * @description 自定义校验规则
   * */
  validator?: (rule: any, value: string, callback?: Function) => boolean;
}
