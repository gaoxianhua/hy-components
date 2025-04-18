import IProps from "./typing";
import { IconConfig } from "../../config";

const defaultProps: IProps = {
  dashed: false,
  hairline: true,
  dot: false,
  textPosition: "center",
  text: "",
  textSize: 14,
  textColor: "#909399",
  lineColor: "#dcdfe6",
  loadingIcon: IconConfig.LOADING,
  loadMoreText: "加载更多",
  loadingText: "正在加载...",
  noMoreText: "没有更多了",
  marginTop: "0",
  marginBottom: "0"
};

export default defaultProps;
