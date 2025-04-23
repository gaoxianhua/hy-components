import type IProps from "./typing";
import { ColorConfig } from "../../config";

const defaultProps: IProps = {
  indicatorWidth: 50,
  indicatorBarWidth: 20,
  indicator: true,
  indicatorColor: "#f2f2f2",
  indicatorActiveColor: ColorConfig.primary,
};

export default defaultProps;
