<template>
  <!-- #ifndef APP-NVUE -->
  <button
    :hover-start-time="Number(hoverStartTime)"
    :hover-stay-time="Number(hoverStayTime)"
    :form-type="formType"
    :open-type="openType"
    :app-parameter="appParameter"
    :hover-stop-propagation="hoverStopPropagation"
    :send-message-title="sendMessageTitle"
    :send-message-path="sendMessagePath"
    :lang="lang"
    :data-name="dataName"
    :session-from="sessionFrom"
    :send-message-img="sendMessageImg"
    :show-message-card="showMessageCard"
    @getphonenumber="getphonenumber"
    @getuserinfo="getuserinfo"
    @error="error"
    @opensetting="opensetting"
    @launchapp="launchapp"
    @agreeprivacyauthorization="agreeprivacyauthorization"
    :hover-class="!disabled && !loading ? 'hy-button--active' : ''"
    class="hy-button hy-reset-button"
    :style="[baseColor, customStyle]"
    @tap="clickHandler"
    :class="bemClass"
  >
    <template v-if="loading">
      <hy-icon
        :mode="loadingMode"
        :is-rotate="true"
        :name="IconConfig.LOADING"
        :size="loadingSize * 1.15"
        :color="loadingColor"
      ></hy-icon>
      <text
        class="hy-button__loading-text"
        :style="[{ fontSize: textSize + 'px' }]"
        >{{ loadingText || text }}</text
      >
    </template>
    <template v-else>
      <hy-icon
        v-if="icon"
        :name="icon"
        :color="iconColorCom"
        :size="textSize * 1.35"
        :customStyle="{ marginRight: '2px' }"
      ></hy-icon>
      <slot>
        <text
          class="hy-button__text"
          :style="[{ fontSize: textSize + 'px' }]"
          >{{ text }}</text
        >
      </slot>
    </template>
  </button>
  <!-- #endif -->

  <!-- #ifdef APP-NVUE -->
  <view
    :hover-start-time="Number(hoverStartTime)"
    :hover-stay-time="Number(hoverStayTime)"
    class="hy-button"
    :hover-class="
      !disabled && !loading && !color && (plain || type === 'info')
        ? 'hy-button--active--plain'
        : !disabled && !loading && !plain
          ? 'hy-button--active'
          : ''
    "
    @tap="clickHandler"
    :class="bemClass"
    :style="[baseColor, customStyle]"
  >
    <template v-if="loading">
      <up-loading-icon
        :mode="loadingMode"
        :size="loadingSize * 1.15"
        :color="loadingColor"
      ></up-loading-icon>
      <text
        class="hy-button__loading-text"
        :style="[nvueTextStyle]"
        :class="[plain && `hy-button__text--plain--${type}`]"
        >{{ loadingText || text }}</text
      >
    </template>
    <template v-else>
      <HyIcon
        v-if="icon"
        :name="icon"
        :color="iconColorCom"
        :size="textSize * 1.35"
      ></HyIcon>
      <text
        class="hy-button__text"
        :style="[
          {
            marginLeft: icon ? '2px' : 0,
          },
          nvueTextStyle,
        ]"
        :class="[plain && `hy-button__text--plain--${type}`]"
        >{{ text }}</text
      >
    </template>
  </view>
  <!-- #endif -->
</template>

<script setup lang="ts">
import { computed, type CSSProperties, toRefs } from "vue";
import { bem, throttle } from "../../utils";
import defaultProps from "./props";
import { ColorConfig, IconConfig } from "../../config";
import HyIcon from "../hy-icon/hy-icon.vue";
import type IProps from "./typing";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  disabled,
  loading,
  throttleTime,
  stop,
  size,
  type,
  plain,
  color,
  iconColor,
} = toRefs(props);
const emit = defineEmits([
  "click",
  "getphonenumber",
  "getuserinfo",
  "error",
  "opensetting",
  "launchapp",
  "agreeprivacyauthorization",
]);

const textColor = (ColorConfig as any)[type.value];

/**
 * @description 生成bem风格的类名
 */
const bemClass = computed(() => {
  // this.bem为一个computed变量，在mixin中
  if (!color.value) {
    return bem(
      "button",
      props,
      ["type", "shape", "size"],
      ["disabled", "plain", "hairline"],
    );
  } else {
    // 由于nvue的原因，在有color参数时，不需要传入type，否则会生成type相关的类型，影响最终的样式
    return bem(
      "button",
      props,
      ["shape", "size"],
      ["disabled", "plain", "hairline"],
    );
  }
});

const loadingColor = computed(() => {
  if (plain.value) {
    // 如果有设置color值，则用color值，否则使用type主题颜色
    return color.value ? color.value : (ColorConfig as any)[type.value];
  }
  if (type.value === "info") {
    return "#c9c9c9";
  }
  return "#fff";
});

const iconColorCom = computed((): string => {
  // 如果是镂空状态，设置了color就用color值，否则使用主题颜色，
  // u-icon的color能接受一个主题颜色的值
  if (iconColor.value) return iconColor.value;
  if (plain.value) {
    return color.value ? color.value : type.value;
  } else {
    return type.value === "info" ? "#000000" : "#ffffff";
  }
});
const baseColor = computed((): CSSProperties => {
  let style: CSSProperties = {};
  if (color.value) {
    // 针对自定义了color颜色的情况，镂空状态下，就是用自定义的颜色
    style.color = plain.value ? color.value : "white";
    if (!plain.value) {
      // 非镂空，背景色使用自定义的颜色
      style["background-color"] = color.value;
    }
    if (color.value.indexOf("gradient") !== -1) {
      // 如果自定义的颜色为渐变色，不显示边框，以及通过backgroundImage设置渐变色
      // weex文档说明可以写borderWidth的形式，为什么这里需要分开写？
      // 因为weex是阿里巴巴为了部门业绩考核而做的你懂的东西，所以需要这么写才有效
      style.borderTopWidth = 0;
      style.borderRightWidth = 0;
      style.borderBottomWidth = 0;
      style.borderLeftWidth = 0;
      if (!plain.value) {
        style.backgroundImage = color.value;
      }
    } else {
      // 非渐变色，则设置边框相关的属性
      style.borderColor = color.value;
      style.borderWidth = "1px";
      style.borderStyle = "solid";
    }
  }
  return style;
});

// nvue版本按钮的字体不会继承父组件的颜色，需要对每一个text组件进行单独的设置
const nvueTextStyle = computed((): CSSProperties => {
  let style: CSSProperties = {};
  // 针对自定义了color颜色的情况，镂空状态下，就是用自定义的颜色
  if (type.value === "info") {
    style.color = "#323233";
  }
  if (color.value) {
    style.color = plain.value ? color.value : "white";
  }
  style.fontSize = textSize.value + "px";
  return style;
});
/**
 * @description 字体大小
 * */
const textSize = computed((): number => {
  let fontSize = 14;
  if (size.value === "large") fontSize = 16;
  if (size.value === "normal") fontSize = 14;
  if (size.value === "small") fontSize = 12;
  if (size.value === "mini") fontSize = 10;
  return fontSize;
});

const clickHandler = (e: any) => {
  // 非禁止并且非加载中，才能点击
  if (!disabled.value && !loading.value) {
    // 进行节流控制，每this.throttle毫秒内，只在开始处执行
    throttle(() => {
      emit("click", e);
    }, throttleTime.value);
  }
  // 是否阻止事件传播
  stop.value && e.stopPropagation();
};

const getphonenumber = (e: any) => {
  emit("getphonenumber", e);
};
const getuserinfo = (e: any) => {
  emit("getuserinfo", e);
};
const error = (e: any) => {
  emit("error", e);
};
const opensetting = (e: any) => {
  emit("opensetting", e);
};
const launchapp = (e: any) => {
  emit("launchapp", e);
};
const agreeprivacyauthorization = (e: any) => {
  emit("agreeprivacyauthorization", e);
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";
@import "../../theme.scss";

.hy-button {
  height: 40px;
  position: relative;
  align-items: center;
  justify-content: center;
  @include flex;
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  flex-direction: row;

  &__text {
    font-size: 15px;
  }

  &__loading-text {
    font-size: 15px;
    margin-left: 4px;
  }

  &--large {
    /* #ifndef APP-NVUE */
    width: 100%;
    /* #endif */
    height: 50px;
    padding: 0 15px;
  }

  &--medium {
    padding: 0 12px;
    font-size: 14px;
  }

  &--small {
    /* #ifndef APP-NVUE */
    min-width: 60px;
    /* #endif */
    height: 30px;
    padding: 0 8px;
    font-size: 12px;
  }

  &--mini {
    height: 22px;
    font-size: 10px;
    /* #ifndef APP-NVUE */
    min-width: 50px;
    /* #endif */
    padding: 0 8px;
  }

  &--disabled {
    opacity: 0.5;
  }

  &--info {
    color: #323233;
    background-color: #fff;
    border: 1px solid #ebedf0;
  }

  &--success {
    color: #fff;
    background-color: $hy-success;
    border: 1px solid $hy-success;
  }

  &--primary {
    color: #fff;
    background-color: $hy-primary;
    border: 1px solid $hy-primary;
  }

  &--error {
    color: #fff;
    background-color: $hy-error;
    border: 1px solid $hy-error;
  }

  &--warning {
    color: #fff;
    background-color: $hy-warning;
    border: 1px solid $hy-warning;
  }

  &--block {
    @include flex;
    width: 100%;
  }

  &--circle {
    border-radius: 100px;
  }

  &--square {
    border-radius: 3px;
  }

  &__icon {
    min-width: 1em;
    line-height: inherit !important;
    vertical-align: top;
  }

  &--plain {
    color: v-bind(textColor);
    background-color: #fff;
  }

  &--hairline {
    border-width: 0.5;
  }
}
</style>
