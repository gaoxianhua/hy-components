<template>
  <HyList
    :container-height="containerHeight"
    :list="list"
    :itemHeight="itemHeight"
  >
  </HyList>
</template>

<script setup lang="ts">
import { computed, CSSProperties, toRefs } from "vue";
import defaultProps from "./props";
import IProps from "./typing";
import HyTransition from "../hy-transition/hy-transition.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { customStyle, opacity, zIndex } = toRefs(props);
const emit = defineEmits(["click"]);

const overlayStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: zIndex?.value,
    bottom: 0,
    "background-color": `rgba(0, 0, 0, ${opacity.value})`
  };
  return Object.assign(style, customStyle.value || {});
});
const clickHandler = () => {
  emit("click");
};
</script>

<style lang="scss" scoped>
$u-overlay-top: 0 !default;
$u-overlay-left: 0 !default;
$u-overlay-width: 100% !default;
$u-overlay-height: 100% !default;
$u-overlay-background-color: rgba(0, 0, 0, 0.7) !default;
.u-overlay {
  position: fixed;
  top: $u-overlay-top;
  left: $u-overlay-left;
  width: $u-overlay-width;
  height: $u-overlay-height;
  background-color: $u-overlay-background-color;
}
</style>
