import type IProps from "./typing";

const defaultProps: IProps = {
  show: false,
  popupMode: "bottom",
  showToolbar: true,
  modelValue: "",
  title: "",
  separator: " ",
  loading: false,
  itemHeight: 44,
  cancelText: "取消",
  confirmText: "确认",
  cancelColor: "#909193",
  confirmColor: "#3c9cff",
  visibleItemCount: 5,
  closeOnClickOverlay: false,
  defaultIndex: [],
  disabled: false,
  hasInput: false,
  placeholder: "请选择地址",
  disabledColor: "#F5F5F5",
  toolbarRightSlot: false,
};

export default defaultProps;
