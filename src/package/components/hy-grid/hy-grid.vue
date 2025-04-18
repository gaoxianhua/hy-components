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
@import "../../libs/css/mixin.scss";
@import "../../theme.scss";
.hy-grid {
  /* #ifdef APP-NVUE */
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  display: block;
  /* #endif */
  justify-content: center;
  @include flex;
  flex-wrap: wrap;
  align-items: center;
  // 在uni-app中应尽量避免使用flex布局以外的方式,因为nvue/uvue等方案都支持flex布局
  // 这里使用grid布局使用为目前20240409uni-app在抖音小程序开启virtualHost时有bug，存在事件失效问题。
  /* #ifndef APP-NVUE */
  display: grid;
  grid-gap: v-bind(gap);
  grid-template-columns: repeat(v-bind(col), 1fr);
  /* #endif */
  &-item {
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: column;
    overflow: hidden;
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    display: flex;
    /* #endif */

    /* #ifdef MP */
    position: relative;
    float: left;
    /* #endif */

    &--hover-class {
      opacity: 0.7;
    }

    &__title {
      color: #000;
      line-height: 60rpx;
      font-size: $hy-font-size-sm;
    }
  }
}
</style>
