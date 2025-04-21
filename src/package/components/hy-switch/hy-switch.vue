<template>
  <view
    class="hy-switch cursor-pointer"
    :class="[disabled && 'hy-switch--disabled']"
    :style="[switchStyle, customStyle]"
    @tap="clickHandler"
  >
    <view class="hy-switch__bg" :style="[bgStyle]"> </view>
    <view
      :class="['hy-switch__node', modelValue && 'hy-switch__node--on']"
      :style="[nodeStyle]"
      ref="hy-switch__node"
    >
      <HyIcon
        v-if="loading"
        :name="IconConfig.LOADING"
        is-rotate
        :color="modelValue ? activeColor : '#AAABAD'"
        :size="size * 0.6"
      ></HyIcon>
    </view>
  </view>
</template>

<script setup lang="ts">
import {
  toRefs,
  watch,
  ref,
  nextTick,
  computed,
  type CSSProperties,
} from "vue";
import { IconConfig } from "../../config";
import { addUnit, error } from "../../utils";
import defaultProps from "./props";
import type IProps from "./typing";

import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  modelValue,
  size,
  space,
  inactiveValue,
  activeValue,
  activeColor,
  disabled,
  loading,
  asyncChange,
  inactiveColor,
} = toRefs(props);
const emit = defineEmits(["update:modelValue", "change"]);
const bgColor = ref("#ffffff");

watch(
  () => modelValue.value,
  (newValue) => {
    if (newValue !== inactiveValue.value && newValue !== activeValue.value) {
      error("v-model绑定的值必须为inactiveValue、activeValue二者之一");
    }
  },
  { immediate: true },
);

const isActive = computed(() => {
  return modelValue.value === activeValue.value;
});
const switchStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  // 这里需要加2，是为了腾出边框的距离，否则圆点node会和外边框紧贴在一起
  style.width = addUnit(size.value * 2 + 2);
  style.height = addUnit(Number(size.value) + 2);
  // style.borderColor = this.value ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.12)'
  // 如果自定义了“非激活”演示，name边框颜色设置为透明(跟非激活颜色一致)
  // 这里不能简单的设置为非激活的颜色，否则打开状态时，会有边框，所以需要透明
  if (customInactiveColor.value) {
    style.borderColor = "rgba(0, 0, 0, 0)";
  }
  style.backgroundColor = isActive.value
    ? activeColor.value
    : inactiveColor.value;
  return style;
});
const nodeStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  // 如果自定义非激活颜色，将node圆点的尺寸减少两个像素，让其与外边框距离更大一点
  style.width = addUnit(size.value - space.value);
  style.height = addUnit(size.value - space.value);
  const translateX = isActive.value
    ? addUnit(space.value)
    : addUnit(size.value);
  style.transform = `translateX(-${translateX})`;
  return style;
});
const bgStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  // 这里配置一个多余的元素在HTML中，是为了让switch切换时，有更良好的背景色扩充体验(见实际效果)
  style.width = addUnit(Number(size.value) * 2 - size.value / 2);
  style.height = addUnit(size.value);
  style.backgroundColor = inactiveColor.value;
  // 打开时，让此元素收缩，否则反之
  style.transform = `scale(${isActive.value ? 0 : 1})`;
  return style;
});
const customInactiveColor = computed(() => {
  // 之所以需要判断是否自定义了“非激活”颜色，是为了让node圆点离外边框更宽一点的距离
  return inactiveColor.value !== "#fff" && inactiveColor.value !== "#ffffff";
});

const clickHandler = () => {
  if (!disabled.value && !loading.value) {
    const oldValue = isActive.value ? inactiveValue.value : activeValue.value;
    if (!asyncChange.value) {
      emit("update:modelValue", oldValue);
    }
    // 放到下一个生命周期，因为双向绑定的value修改父组件状态需要时间，且是异步的
    nextTick(() => {
      emit("change", oldValue);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";

.hy-switch {
  @include flex(row);
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  position: relative;
  background-color: #fff;
  border-width: 1px;
  border-radius: 100px;
  transition: background-color 0.4s;
  border-color: rgba(0, 0, 0, 0.12);
  border-style: solid;
  justify-content: flex-end;
  align-items: center;
  // 由于weex为阿里逗着玩的KPI项目，导致bug奇多，这必须要写这一行，
  // 否则在iOS上，点击页面任意地方，都会触发switch的点击事件
  overflow: hidden;

  &__node {
    @include flex(row);
    align-items: center;
    justify-content: center;
    border-radius: 100px;
    background-color: #fff;
    border-radius: 100px;
    box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.25);
    transition-property: transform;
    transition-duration: 0.4s;
    transition-timing-function: cubic-bezier(0.3, 1.05, 0.4, 1.05);
  }

  &__bg {
    position: absolute;
    border-radius: 100px;
    background-color: #ffffff;
    transition-property: transform;
    transition-duration: 0.4s;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transition-timing-function: ease;
  }

  &--disabled {
    opacity: 0.6;
  }
}
</style>
