<template>
  <view class="hy-card" @tap.stop="click" :class="cardClass" :style="cardStyle">
    <view
      v-if="showHead"
      class="hy-card__head"
      :style="[{ padding: addUnit(paddingHead || padding) }, headStyle]"
      :class="{
        'hy-border-bottom': headBorderBottom
      }"
      @tap="headClick"
    >
      <view v-if="!$slots.header" class="hy-card__head--flex">
        <view class="hy-card__head--left" v-if="title">
          <image
            :src="thumb"
            class="hy-card__head--left__thumb"
            mode="aspectFill"
            v-if="thumb"
            :style="{
              height: addUnit(thumbWidth),
              width: addUnit(thumbWidth),
              borderRadius: thumbCircle ? '50px' : '4px'
            }"
          ></image>
          <text
            class="hy-card__head--left__title"
            :style="{
              fontSize: addUnit(titleSize),
              color: titleColor
            }"
          >
            {{ title }}
          </text>
        </view>
        <view class="hy-card__head--right hy-line-1" v-if="subTitle">
          <text
            class="hy-card__head__title__text"
            :style="{
              fontSize: addUnit(subTitleSize),
              color: subTitleColor
            }"
          >
            {{ subTitle }}
          </text>
        </view>
      </view>
      <slot name="header" v-else />
    </view>
    <view
      @tap="bodyClick"
      class="hy-card__body"
      :style="[{ padding: addUnit(paddingBody || padding) }, bodyStyle]"
    >
      <slot name="body" />
    </view>
    <view
      v-if="showFoot"
      class="hy-card__foot"
      @tap="footClick"
      :style="[
        { padding: $slots.foot ? addUnit(paddingFoot || padding) : 0 },
        footStyle
      ]"
      :class="{
        'hy-border-top': footBorderTop
      }"
    >
      <slot name="footer" />
    </view>
  </view>
</template>

<script setup lang="ts">
import defaultProps from "./props";
import IProps from "./typing";
import { addUnit } from "../../utils";
import { computed, toRefs } from "vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { border, full, borderRadius, margin, boxShadow, customStyle } =
  toRefs(props);
const emit = defineEmits(["click", "head-click", "body-click", "foot-click"]);

const cardClass = computed(() => {
  return [
    border.value && "hy-border",
    full.value && "hy-border",
    border.value && "hy-card-full",
    (typeof borderRadius.value === "number"
      ? borderRadius.value
      : parseInt(borderRadius.value.replace(/px|rpx|vw|vh/g, "")) > 0) &&
      "hy-card--border"
  ].filter(Boolean);
});
const cardStyle = computed(() => {
  return Object.assign(customStyle.value, {
    borderRadius: addUnit(borderRadius.value),
    margin: margin.value,
    boxShadow: boxShadow.value
      ? typeof boxShadow.value === "boolean"
        ? "0 0 10rpx 4rpx rgba(0, 0, 0, 0.16)"
        : boxShadow.value
      : ""
  });
});

const click = () => {
  emit("click", props.index);
};
/**
 * @description 点击头部
 * */
const headClick = () => {
  emit("head-click", props.index);
};
/**
 * @description 点击身体
 * */
const bodyClick = () => {
  emit("body-click", props.index);
};
/**
 * @description 点击尾部
 * */
const footClick = () => {
  emit("foot-click", props.index);
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";
@import "../../theme.scss";

.hy-card {
  position: relative;
  overflow: hidden;
  font-size: 28rpx;
  background-color: #ffffff;
  box-sizing: border-box;

  &-full {
    // 如果是与屏幕之间不留空隙，应该设置左右边距为0
    margin-left: 0 !important;
    margin-right: 0 !important;
    width: 100%;
  }

  &--border:after {
    border-radius: 16rpx;
  }

  &__head {
    &--flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &--left {
      color: #303133ff;
      display: flex;

      &__thumb {
        margin-right: 16rpx;
      }

      &__title {
        max-width: 400rpx;
        height: 20px;
        @include line-feed;
      }
    }

    &--right {
      color: $hy-text-color-grey;
      margin-left: 6rpx;
    }
  }

  &__body {
    color: $hy-bg-color;
  }

  &__foot {
    color: $hy-text-color-grey;
  }
}
.hy-border-bottom {
  border-bottom: $hy-border-line;
}

.hy-border-top {
  border-top: $hy-border-line;
}
.hy-border {
  border: $hy-border-line;
}
</style>
