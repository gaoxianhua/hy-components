import type IProps from "./typing";

const defaultProps: IProps = {
  show: false,
  closeOnClick: true,
  name: "",
  disabled: false,
  threshold: 20,
  autoClose: true,
  options: ["删除"],
  duration: 300,
  openItem: false,
};

export default defaultProps;
