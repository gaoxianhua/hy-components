<template>
  <view :style="customStyle" class="hy-cell">
    <view
      class="hy-cell__title"
      :style="{ borderBottom: titleBorder ? '1rpx solid #c8c7cc66' : '' }"
      v-if="title || $slots['title']"
    >
      <slot name="title" :title="title">
        <view class="hy-cell__title-nav">
          <view
            class="hy-cell__title-nav--ver"
            :style="{ background: verticalColor }"
            v-if="showVertical"
          ></view>
          <text class="hy-cell__title-nav--text">{{ title }}</text>
        </view>
      </slot>
    </view>
    <view class="hy-cell__body">
      <slot>
        <template v-for="(item, i) in list" :key="i">
          <view
            :class="ItemClass"
            :hover-class="containerClass(item)"
            :hover-stay-time="250"
            :style="{ borderBottom: border ? '1rpx solid #c8c7cc66' : '' }"
            @tap="clickHandler($event, item, i)"
          >
            <view class="hy-cell__body--container__content">
              <view class="hy-cell__body--container__content-icon">
                <slot name="icon" :icon="item?.icon">
                  <HyIcon
                    :size="iconSize"
                    :name="item?.icon"
                    :color="disabled || item?.disabled ? '#c0c0c0' : ''"
                  ></HyIcon>
                </slot>
              </view>
              <view class="hy-cell__body--container__content-title">
                <!-- 将slot与默认内容用if/else分开主要是因为微信小程序不支持slot嵌套传递，这样才能解决collapse组件的slot不失效问题，label暂时未用到。 -->
                <slot name="cell-title" :title="item?.title">
                  <text
                    class="hy-cell__body--container__content-title--text"
                    :class="[
                      (disabled || item?.disabled) && 'hy-cell--disabled',
                    ]"
                    >{{ item?.title }}</text
                  >
                </slot>
                <slot name="sub" v-if="item?.subhead" :sub="item.subhead">
                  <text
                    class="hy-cell__body--container__content-title--sub"
                    :class="[disabled && 'hy-cell--disabled']"
                    >{{ item.subhead }}</text
                  >
                </slot>
              </view>
            </view>
            <view
              class="hy-cell__body--container__center"
              :style="{
                justifyContent:
                  arrange === 'left'
                    ? 'flex-start'
                    : arrange === 'right'
                      ? 'flex-end'
                      : 'center',
              }"
            >
              <slot name="value" :record="item">
                <text
                  class="hy-cell__body--container__center__value"
                  :class="[disabled && 'hy-cell--disabled']"
                  v-if="value || item?.value"
                  >{{ item.value || value }}</text
                >
              </slot>
            </view>
            <view
              class="hy-cell__body--container__right-icon"
              :class="[
                `hy-cell__body--container__right-icon--${
                  item?.arrowDirection || arrowDirection
                }`,
              ]"
            >
              <slot name="right-icon" :icon="item?.rightIcon || rightIcon">
                <HyIcon
                  :name="item?.rightIcon || rightIcon"
                  :custom-style="rightIconStyle"
                  :color="disabled || item?.disabled ? '#c0c0c0' : 'info'"
                  :size="iconSize"
                ></HyIcon>
              </slot>
            </view>
          </view>

          <slot name="bottom" :record="item" />
        </template>
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import defaultProps from "./props";
import type IProps from "./typing";
import type { CellContentVo } from "./typing";

import HyIcon from "../hy-icon/hy-icon.vue";
import { computed, toRefs } from "vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { size, disabled, clickable } = toRefs(props);
const emit = defineEmits(["click"]);

/**
 * @description 计算什么时候出现点击状态
 * */
const containerClass = computed(() => {
  return (temp: CellContentVo): string => {
    return [
      !disabled.value &&
        !temp?.disabled &&
        clickable.value &&
        "hy-cell__body--container__clickable",
    ]
      .filter(Boolean)
      .join();
  };
});
const ItemClass = computed(() => {
  return [
    "hy-cell__body--container",
    `hy-cell__body--container__${size.value}`,
  ];
});

const iconSize = computed(() => {
  switch (size.value) {
    case "large":
      return 25;
    case "medium":
      return 20;
    case "small":
      return 15;
  }
});

/**
 * @description 点击cell
 * */
const clickHandler = (e: Event, temp: CellContentVo, index: number) => {
  if (disabled.value) return;
  emit("click", temp, index);
  if (temp?.url) {
    uni.navigateTo({
      url: temp.url,
    });
  }
  e.stopPropagation();
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";
@import "../../theme.scss";

.hy-cell {
  flex: 1;

  /*标题*/
  &__title {
    padding: $hy-border-margin-padding-lg $hy-border-margin-padding-sm;

    &-nav {
      display: flex;
      align-items: center;

      &--ver {
        border-radius: 4rpx;
        width: 4px;
        height: 20px;
        margin-right: 16rpx;
      }
      &--text {
        font-size: $hy-font-size-subtitle;
        line-height: 16px;
        color: $hy-color-title;
      }
    }
  }

  /*row内容*/
  &__body {
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    /* #endif */
    font-size: $hy-font-size-paragraph;
    color: $hy-color-paragraph;
    // line-height: $u-cell-line-height;
    align-items: center;
    //justify-content: space-between;

    &--container {
      @include flex(row);
      align-items: center;
      justify-content: space-between;
      flex: 1;

      /* 大 */
      &__large {
        font-size: $hy-font-size-lg;
        padding: 35rpx;
        line-height: 25px;
      }

      /* 默认 */
      &__medium {
        font-size: $hy-font-size-base;
        padding: 30rpx;
        line-height: 20px;
      }

      /* 小 */
      &__small {
        font-size: $hy-font-size-sm;
        padding: 25rpx;
        line-height: 15px;
      }

      /*点击状态*/
      &__clickable {
        background-color: $hy-bg-color-grey;
      }

      &__content {
        @include flex(row);
        /*左边icon*/
        &-icon {
          @include flex();
          align-items: center;
          margin-right: 10px;
        }
        /*行头部*/
        &-title {
          margin-right: $hy-border-margin-padding-sm;
          flex: $hy-font-size-subtitle;
          display: flex;
          flex-direction: column;

          /*标题*/
          &--text {
            color: $hy-color-title;
          }

          /*sub值*/
          &--sub {
            margin-top: $hy-border-margin-padding-sm;
            color: $hy-text-color-grey;
          }
        }
      }

      /*cell值*/
      &__center {
        @include flex();
        max-width: 90%;
        flex: 1;
        &__value {
          line-height: 24px;
          color: $hy-text-color-grey;
          margin-right: $hy-border-margin-padding-sm;
        }
      }

      /*右边icon*/
      &__right-icon {
        transition: transform 0.3s;

        &--up {
          transform: rotate(-90deg);
        }

        &--left {
          transform: rotate(180deg);
        }

        &--down {
          transform: rotate(90deg);
        }
      }
    }
  }

  &--disabled {
    color: $hy-text-color-disable;
    /* #ifndef APP-NVUE */
    cursor: not-allowed;
    /* #endif */
  }
}
</style>
