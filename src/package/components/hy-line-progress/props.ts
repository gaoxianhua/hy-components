import IProps from "./typing";
import { ColorConfig } from "../../config";

const defaultProps: IProps = {
  activeColor: ColorConfig.primary,
  inactiveColor: "#ececec",
  percentage: 0,
  showText: true,
  height: 12
};

export default defaultProps;
