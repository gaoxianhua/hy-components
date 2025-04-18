<template>
  <HyTransition mode="fade" :show="show" style="display: inline-flex">
    <view class="hy-tag__wrapper cursor-pointer">
      <view :class="tagClass" @tap.stop="clickHandler" :style="tagStyle">
        <slot name="icon">
          <HyIcon
            v-if="icon"
            :color="hyIconColor"
            :name="icon"
            :size="hyIconSize"
            :customStyle="{ marginRight: '3px' }"
          ></HyIcon>
        </slot>
        <text :class="textClass" :style="{ color: color }">
          <slot>
            {{ text }}
          </slot>
        </text>
      </view>
      <view
        :class="['hy-tag__close', `hy-tag__close--${size}`]"
        v-if="closable"
        @tap.stop="closeHandler"
        :style="{ backgroundColor: closeColor }"
      >
        <HyIcon
          :name="IconConfig.CLOSE"
          :size="closeSize"
          color="#ffffff"
        ></HyIcon>
      </view>
    </view>
  </HyTransition>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, toRefs } from "vue";
import defaultProps from "./props";
import type IProps from "./typing";
import HyTransition from "../hy-transition/hy-transition.vue";
import HyIcon from "../hy-icon/hy-icon.vue";
import { IconConfig } from "../../config";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  text,
  name,
  shape,
  plain,
  type,
  size,
  plainFill,
  closable,
  bgColor,
  color,
  borderColor,
  iconColor,
  disabled,
  customStyle,
} = toRefs(props);
const emit = defineEmits(["click", "close"]);

/**
 * @description tag类名
 * */
const tagClass = computed((): string[] => {
  let classes = ["hy-tag", `hy-tag--${shape.value}`, `hy-tag--${size.value}`];
  if (disabled.value) {
    classes.push("hy-tag--disabled");
  } else {
    const arr = [
      !plain.value && `hy-tag--${type.value}`,
      plain.value && `hy-tag--${type.value}--plain`,
      plain.value && plainFill.value && `hy-tag--${type.value}--plain--fill`,
    ].filter(Boolean);
    classes = classes.concat(arr as string[]);
  }
  return classes;
});
/**
 * @description tag样式
 * */
const tagStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    marginRight: closable.value ? "10px" : 0,
    marginTop: closable.value ? "10px" : 0,
  };
  if (bgColor.value) {
    style.background = bgColor.value;
  }
  if (borderColor.value) {
    style.borderColor = borderColor.value;
  }
  return Object.assign(style, customStyle.value);
});

/**
 * @description 文本类名
 * */
const textClass = computed((): string[] => {
  return [
    `hy-tag__text`,
    `hy-tag__text--${type.value}`,
    plain.value && `hy-tag__text--${type.value}--plain`,
    `hy-tag__text--${size.value}`,
  ].filter(Boolean) as string[];
});

/**
 * @description 关闭图标icon大小
 */
const closeSize = computed(() => {
  return size.value === "large" ? 15 : size.value === "medium" ? 13 : 11;
});
/**
 * @description 图标大小
 * */
const hyIconSize = computed(() => {
  if (props.iconSize) {
    return props.iconSize;
  } else {
    return size.value === "large" ? 18 : size.value === "medium" ? 14 : 10;
  }
});
/**
 * @description 图标颜色
 * */
const hyIconColor = computed(() => {
  return iconColor.value
    ? iconColor.value
    : plain.value
      ? type.value
      : "#ffffff";
});

/**
 * @description 点击关闭按钮
 * */
const closeHandler = () => {
  if (!disabled.value) {
    emit("close", text.value);
  }
};
/**
 * @description 点击标签
 * */
const clickHandler = () => {
  if (!disabled.value) {
    emit("click", {
      value: text.value,
      name: name.value,
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";
@import "../../theme.scss";

.hy-tag {
  @include flex;
  align-items: center;
  border-style: solid;

  &__wrapper {
    position: relative;
  }

  /*禁用*/
  &--disabled {
    background-color: $hy-color-disable-bg;
    color: $hy-text-color-disable;
    border: 1px solid $hy-color-disable-icon;
  }

  &--circle {
    border-radius: 100px;
  }

  &--square {
    border-radius: 3px;
  }

  &__icon {
    margin-right: 4px;
  }

  &__text {
    &--small {
      font-size: $hy-font-size-sm;
      line-height: $hy-font-size-sm;
    }

    &--medium {
      font-size: $hy-font-size-base;
      line-height: $hy-font-size-base;
    }

    &--large {
      font-size: $hy-font-size-lg;
      line-height: $hy-font-size-lg;
    }
  }

  &--small {
    height: 22px;
    line-height: 22px;
    padding: 0 5px;
  }

  &--medium {
    height: 26px;
    line-height: 22px;
    padding: 0 10px;
  }

  &--large {
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
  }

  &--primary {
    background-color: $hy-primary;
    border-width: 1px;
    border-color: $hy-primary;
  }

  &--primary--plain {
    border-width: 1px;
    border-color: $hy-primary;
  }

  &--primary--plain--fill {
    background-color: #ecf5ff;
  }

  &__text--primary {
    color: #ffffff;
  }

  &__text--primary--plain {
    color: $hy-primary;
  }

  &--error {
    background-color: $hy-error;
    border-width: 1px;
    border-color: $hy-error;
  }

  &--error--plain {
    border-width: 1px;
    border-color: $hy-error;
  }

  &--error--plain--fill {
    background-color: #fef0f0;
  }

  &__text--error {
    color: #ffffff;
  }

  &__text--error--plain {
    color: $hy-error;
  }

  &--warning {
    background-color: $hy-warning;
    border-width: 1px;
    border-color: $hy-warning;
  }

  &--warning--plain {
    border-width: 1px;
    border-color: $hy-warning;
  }

  &--warning--plain--fill {
    background-color: #fdf6ec;
  }

  &__text--warning {
    color: #ffffff;
  }

  &__text--warning--plain {
    color: $hy-warning;
  }

  &--success {
    background-color: $hy-success;
    border-width: 1px;
    border-color: $hy-success;
  }

  &--success--plain {
    border-width: 1px;
    border-color: $hy-success;
  }

  &--success--plain--fill {
    background-color: #f5fff0;
  }

  &__text--success {
    color: #ffffff;
  }

  &__text--success--plain {
    color: $hy-success;
  }

  &--info {
    background-color: $hy-info;
    border-width: 1px;
    border-color: $hy-info;
  }

  &--info--plain {
    border-width: 1px;
    border-color: $hy-info;
  }

  &--info--plain--fill {
    background-color: #f4f4f5;
  }

  &__text--info {
    color: #ffffff;
  }

  &__text--info--plain {
    color: $hy-info;
  }

  &__close {
    position: absolute;
    z-index: 999;
    top: 10px;
    right: 10px;
    border-radius: 100px;
    background-color: #c6c7cb;
    @include flex(row);
    align-items: center;
    justify-content: center;
    /* #ifndef APP-NVUE */
    transform: scale(0.6) translate(80%, -80%);
    /* #endif */
    /* #ifdef APP-NVUE */
    transform: scale(0.6) translate(50%, -50%);
    /* #endif */

    &--small {
      width: 18px;
      height: 18px;
    }

    &--medium {
      width: 22px;
      height: 22px;
    }

    &--large {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
