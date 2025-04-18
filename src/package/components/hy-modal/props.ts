import IProps from "./typing";
import { ColorConfig } from "../../config";

const defaultProps: IProps = {
  show: false,
  title: "",
  content: "",
  confirmText: "确认",
  cancelText: "取消",
  showConfirmButton: true,
  showCancelButton: false,
  confirmColor: ColorConfig.primary,
  cancelColor: "#606266",
  buttonReverse: false,
  zoom: true,
  asyncClose: false,
  closeOnClickOverlay: false,
  negativeTop: 0,
  width: "650rpx",
  confirmButtonShape: "",
  contentTextAlign: "left"
};

export default defaultProps;
