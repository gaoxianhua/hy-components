import type IProps from "./typing";

const defaultProps: IProps = {
  list: [],
  direction: "row",
  current: 0,
  activeColor: "#3c9cff",
  inactiveColor: "#969799",
  activeIcon: "",
  inactiveIcon: "",
  dot: false,
  iconSize: 17,
};

export default defaultProps;
