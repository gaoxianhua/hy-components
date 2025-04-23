<template>
  <view class="hy-navbar" :style="customStyle">
    <view
      class="hy-navbar__placeholder"
      v-if="fixed && placeholder"
      :style="{
        height: addUnit(getPx(height) + statusBarHeight),
      }"
    ></view>
    <view
      :class="[fixed && 'hy-navbar--fixed']"
      :style="{ paddingTop: addUnit(safeAreaInsets?.top) }"
    >
      <view
        :class="[border && 'hy-border-bottom', 'hy-navbar__content']"
        :style="{
          height: addUnit(height),
          backgroundColor: bgColor,
        }"
      >
        <view
          class="hy-navbar__content__left"
          hover-class="hy-navbar__content__left--hover"
          hover-start-time="150"
          @tap="leftClick"
        >
          <slot name="left">
            <HyIcon
              v-if="leftIcon"
              :name="leftIcon"
              :size="leftIconSize"
              :color="leftIconColor"
            ></HyIcon>
            <text
              v-if="leftText"
              :style="{
                color: leftIconColor,
              }"
              class="hy-navbar__content__left__text"
              >{{ leftText }}</text
            >
          </slot>
        </view>
        <slot name="center">
          <view class="hy-navbar__content__center">
            <text
              class="hy-navbar__content__center--title"
              :style="[
                {
                  width: addUnit(titleWidth),
                  color: titleColor,
                },
                titleStyle,
              ]"
              >{{ title }}</text
            >
            <text
              class="hy-navbar__content__center--sub"
              :style="[
                {
                  width: addUnit(titleWidth),
                  color: titleColor,
                },
                titleStyle,
              ]"
              >{{ sub }}</text
            >
          </view>
        </slot>
        <view
          class="hy-navbar__content__right"
          v-if="$slots.right || rightIcon || rightText"
          @tap="rightClick"
        >
          <slot name="right">
            <HyIcon v-if="rightIcon" :name="rightIcon" size="20"></HyIcon>
            <text v-if="rightText" class="hy-navbar__content__right__text">{{
              rightText
            }}</text>
          </slot>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import defaultProps from "./props";
import IProps from "./typing";
import { addUnit, getPx } from "../../utils";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const emit = defineEmits(["leftClick", "rightClick"]);

const { safeAreaInsets } = uni.getSystemSetting();
const { statusBarHeight } = uni.getWindowInfo();

/**
 * @description 点击左侧区域
 * */
const leftClick = () => {
  // 如果配置了autoBack，自动返回上一页
  emit("leftClick");
  if (config.interceptor.navbarLeftClick != null) {
    config.interceptor.navbarLeftClick();
  } else {
    if (this.autoBack) {
      uni.navigateBack();
    }
  }
};
/**
 * @description 点击右侧区域
 * */
const rightClick = () => {
  emit("rightClick");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
