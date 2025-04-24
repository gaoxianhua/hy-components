import type IProps from "./typing";

const defaultProps: IProps = {
  list: [],
  current: 0,
  keyName: "name",
  duration: 300,
  lineColor: "#3c9cff",
  activeStyle: {
    color: "#303133",
  },
  inactiveStyle: {
    color: "#606266",
  },
  lineWidth: 20,
  lineHeight: 3,
  lineBgSize: "cover",
  itemStyle: {
    height: "44px",
  },
  swiperHeight: "calc(100vh - 44px)",
  scrollable: true,
  iconStyle: {},
};

export default defaultProps;
