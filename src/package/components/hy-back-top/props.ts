import type IProps from "./typing";
import { IconConfig } from "../../config";

const defaultProps: IProps = {
  mode: "circle",
  icon: IconConfig.DOWNLOAD,
  text: "",
  duration: 500,
  scrollTop: 0,
  top: 400,
  bottom: 100,
  right: 20,
  zIndex: 888,
  iconStyle: {
    color: "#909399",
    fontSize: "19px",
  },
  customStyle: {
    transform: "rotate(180deg)",
  },
};

export default defaultProps;
