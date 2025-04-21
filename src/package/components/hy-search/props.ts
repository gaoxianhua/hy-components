import type IProps from "./typing";

const defaultProps: IProps = {
  modelValue: "",
  shape: "circle",
  bgColor: "#f2f2f2",
  placeholder: "请输入关键字",
  clear: true,
  focus: false,
  showAction: true,
  actionText: "搜索",
  inputAlign: "left",
  disabled: false,
  borderColor: "transparent",
  searchIconColor: "#909399",
  searchIconSize: 18,
  color: "#606266",
  placeholderColor: "#909399",
  searchIcon: "search",
  margin: "0",
  animation: false,
  maxlength: "-1",
  height: 32,
  label: null,
  adjustPosition: true,
  autoBlur: true,
};

export default defaultProps;
