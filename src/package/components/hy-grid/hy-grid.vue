<template>
  <view class="hy-grid" ref="hy-grid" :style="gridStyle">
    <template v-for="item in list">
      <view
        class="hy-grid-item"
        hover-class="hy-grid-item--hover-class"
        :hover-stay-time="200"
        @tap="childClick(item)"
        :style="itemStyle"
      >
        <slot :record="item">
          <HyIcon
            :name="item.icon"
            :size="iconSize"
            :round="round"
            label-pos="bottom"
            :space="space"
            :label="item.name"
          ></HyIcon>
          <!--          <view class="hy-grid-item__title">{{ item.name }}</view>-->
        </slot>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, toRefs } from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import { addUnit } from "../../utils";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { align, customStyle, bgColor, itemHeight, border } = toRefs(props);
const emit = defineEmits(["click"]);

/**
 * @description 宫格对齐方式
 * */
const gridStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  switch (align.value) {
    case "left":
      style.justifyContent = "flex-start";
      break;
    case "center":
      style.justifyContent = "center";
      break;
    case "right":
      style.justifyContent = "flex-end";
      break;
    default:
      style.justifyContent = "flex-start";
  }
  return Object.assign(style, customStyle.value || {});
});

const itemStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    background: bgColor.value,
    height: addUnit(itemHeight.value),
    width: "100%",
    border: border.value ? "0.5px solid #c8c7cc66" : "",
  };
  return style;
});

/**
 * @description 点击事件
 * */
const childClick = (name: string | Record<string, any>) => {
  emit("click", name);
};
</script>

<style lang="scss" scoped>
.hy-grid {
  grid-gap: v-bind(gap);
  grid-template-columns: repeat(v-bind(col), 1fr);
}
@import "./index.scss";
</style>
