import type IProps from "./typing";

const defaultProps: IProps = {
  list: [],
  show: false,
  name: "",
  key: "id",
  disabled: false,
  threshold: 20,
  autoClose: true,
  options: [{ text: "删除" }],
  duration: 300,
  closeOnClick: true,
};

export default defaultProps;
