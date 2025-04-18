<template>
  <view
    class="u-notice-bar"
    v-if="show"
    :style="[
      {
        backgroundColor: bgColor
      },
      customStyle
    ]"
  >
    <template v-if="direction === 'column' || (direction === 'row' && step)">
      <HyColumnNotice
        :color="color"
        :bgColor="bgColor"
        :text="text"
        :mode="mode"
        :step="step"
        :icon="icon"
        :disable-touch="disableTouch"
        :fontSize="fontSize"
        :duration="duration"
        :justifyContent="justifyContent"
        @close="close"
        @click="click"
      ></HyColumnNotice>
    </template>
    <template v-else>
      <HyRowNotice
        :color="color"
        :bgColor="bgColor"
        :text="text"
        :mode="mode"
        :fontSize="fontSize"
        :speed="speed"
        :url="url"
        :linkType="linkType"
        :icon="icon"
        @close="close"
        @click="click"
      ></HyRowNotice>
    </template>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import defaultProps from "./props";
import IProps from "./typing";
// 组件
import HyRowNotice from "./hy-row-notice.vue";
import HyColumnNotice from "./hy-column-notice.vue";

const show = ref(true);

const props = withDefaults(defineProps<IProps>(), defaultProps);
const emit = defineEmits(["click", "close"]);

/**
 * @description 点击通告栏
 * */
const click = (index: number) => {
  emit("click", index);
};
/**
 * @description 点击关闭按钮
 * */
const close = () => {
  show.value = false;
  emit("close");
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";

.u-notice-bar {
  overflow: hidden;
  padding: 9px 12px;
  flex: 1;
}
</style>
