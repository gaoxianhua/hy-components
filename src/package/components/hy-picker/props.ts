import type IProps from "./typing";

const defaultProps: IProps = {
  modelValue: "",
  disabled: false,
  show: false,
  popupMode: "bottom",
  separator: "/",
  showToolbar: true,
  title: "",
  columns: [],
  loading: false,
  itemHeight: 44,
  cancelText: "取消",
  confirmText: "确定",
  cancelColor: "#909193",
  confirmColor: "#3c9cff",
  visibleItemCount: 5,
  keyName: "text",
  closeOnClickOverlay: false,
  defaultIndex: [],
  immediateChange: true,
  zIndex: 10076,
  hasInput: false,
  placeholder: "请选择",
  toolbarRightSlot: false,
  shape: "square",
  border: "surround",
};

export default defaultProps;
