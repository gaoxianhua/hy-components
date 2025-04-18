import IProps from "./typing";
import { ColorConfig } from "../../config";

const defaultProps: IProps = {
  modelValue: false,
  loading: false,
  disabled: false,
  size: 25,
  activeColor: ColorConfig.primary,
  inactiveColor: "#ffffff",
  activeValue: true,
  inactiveValue: false,
  asyncChange: false,
  space: 0
};
export default defaultProps;
