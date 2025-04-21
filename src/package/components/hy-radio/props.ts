import type IProps from "./typing";
import { ColorConfig } from "../../config";

const defaultProps: IProps = {
  modelValue: "",
  columns: [],
  fieldNames: {
    label: "label",
    value: "value",
    checked: "checked",
  },
  shape: "circle",
  size: "medium",
  disabled: false,
  activeColor: ColorConfig.primary,
  inactiveColor: "#c8c9cc",
  iconSize: "20",
  iconColor: "",
  iconPlacement: "left",
  borderBottom: false,
  label: "",
  labelSize: "",
  labelColor: "",
  labelDisabled: "",
  placement: "row",
};

export default defaultProps;
