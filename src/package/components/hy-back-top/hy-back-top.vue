<template>
  <HyTransition mode="fade" :customStyle="backTopStyle" :show="show">
    <slot>
      <view class="hy-back-top" :style="contentStyle" @click="backToTop">
        <HyIcon :name="icon" :custom-style="iconStyle"></HyIcon>
        <text v-if="text" class="hy-back-top__text">{{ text }}</text>
      </view>
    </slot>
  </HyTransition>
</template>

<script setup lang="ts">
import { computed, CSSProperties, toRefs } from "vue";
import defaultProps from "../hy-list/props";
import IProps from "../hy-list/typing";
// 组件
import HyTransition from "../hy-transition/hy-transition.vue";
import HyIcon from "../hy-icon/hy-icon.vue";
import { addUnit, getPx } from "../../utils";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { customStyle, duration, mode, bottom, right, top, scrollTop } =
  toRefs(props);
const emit = defineEmits(["click"]);

const backTopStyle = computed<CSSProperties>(() => {
  return {
    bottom: addUnit(bottom.value),
    right: addUnit(right.value),
    width: "40px",
    height: "40px",
    position: "fixed",
    zIndex: 10
  };
});
const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    borderRadius: mode.value === "circle" ? "50%" : "4px"
  };
  return Object.assign(style, customStyle.value);
});
const show = computed<boolean>(() => {
  return getPx(scrollTop.value) > getPx(top.value);
});
const backToTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: duration.value
  });
  emit("click");
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";

.hy-back-top {
  @include flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  height: 100%;
  justify-content: center;
  background-color: #e1e1e1;

  &__tips {
    font-size: 12px;
    transform: scale(0.8);
  }
}
</style>
