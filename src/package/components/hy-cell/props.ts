import type IProps from "./typing";
import { ColorConfig, IconConfig } from "../../config";

const defaultProps: IProps = {
  list: [],
  title: "",
  titleBorder: false,
  border: true,
  verticalColor: ColorConfig.primary,
  showVertical: true,
  disabled: false,
  clickable: false,
  size: "medium",
  value: "",
  arrange: "right",
  rightIcon: IconConfig.RIGHT,
  arrowDirection: "right",
};

export default defaultProps;
