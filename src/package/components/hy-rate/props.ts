import { ColorConfig, IconConfig } from "../../config";

const defaultProps = {
  modelValue: 1,
  count: 5,
  disabled: false,
  readonly: false,
  size: 18,
  inactiveColor: "#b2b2b2",
  activeColor: ColorConfig.primary,
  gutter: 4,
  minCount: 1,
  allowHalf: false,
  activeIcon: IconConfig.STAR_FILL,
  inactiveIcon: IconConfig.STAR,
  touchable: true
};
export default defaultProps;
