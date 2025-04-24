import type IProps from "./typing";

const defaultProps: IProps = {
  showHeight: 200,
  toggle: true,
  closeText: "展开阅读全文",
  openText: "收起",
  color: "#2979ff",
  fontSize: 14,
  textIndent: "2em",
  name: "",
  shadowStyle: {
    backgroundImage:
      "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
    paddingTop: "100px",
    marginTop: "-100px",
  },
};

export default defaultProps;
