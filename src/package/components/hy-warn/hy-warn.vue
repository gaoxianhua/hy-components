<template>
  <HyTransition mode="fade" :show="show">
    <view
      class="hy-alert"
      :class="[`hy-alert--${type}--${effect}`]"
      @tap.stop="clickHandler"
      :style="[customStyle]"
    >
      <view class="hy-alert__icon" v-if="showIcon">
        <HyIcon :name="iconName" size="21" :color="iconColor"></HyIcon>
      </view>
      <view
        class="hy-alert__content"
        :style="[
          {
            paddingRight: closable ? '20px' : 0,
          },
        ]"
      >
        <text
          class="hy-alert__content__title"
          v-if="title"
          :style="[
            {
              fontSize: addUnit(fontSize),
              textAlign: center ? 'center' : 'left',
            },
          ]"
          :class="[
            effect === 'dark'
              ? 'hy-alert__text--dark'
              : `hy-alert__text--${type}--light`,
          ]"
          >{{ title }}</text
        >
        <text
          class="hy-alert__content__desc"
          v-if="description"
          :style="[
            {
              fontSize: addUnit(fontSize),
              textAlign: center ? 'center' : 'left',
            },
          ]"
          :class="[
            effect === 'dark'
              ? 'hy-alert__text--dark'
              : `hy-alert__text--${type}--light`,
          ]"
          >{{ description }}</text
        >
      </view>
      <view class="hy-alert__close" v-if="closable" @tap.stop="closeHandler">
        <HyIcon :name="IconConfig.CLOSE" :color="iconColor" size="15"></HyIcon>
      </view>
    </view>
  </HyTransition>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from "vue";
import defaultProps from "./props";
import IProps from "./typing";
import { addUnit } from "../../utils";
import { IconConfig } from "../../config";

// 组件
import HyTransition from "../hy-transition/hy-transition.vue";
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { type, effect } = toRefs(props);
const emit = defineEmits(["click", "close"]);

const show = ref<boolean>(true);

/**
 * @description icon颜色
 * */
const iconColor = computed(() => {
  return effect.value === "light" ? type.value : "#fff";
});
/**
 * @description 不同主题对应不同的图标
 * */
const iconName = computed(() => {
  switch (type.value) {
    case "success":
      return IconConfig.SUCCESS_FILL;
    case "error":
      return IconConfig.CLOSE_CIRCLE_FILL;
    case "warning":
      return IconConfig.NOTICE_FILL;
    case "info":
      return IconConfig.HELP_FILL;
    case "primary":
      return IconConfig.MESSAGE_FILL;
    default:
      return IconConfig.CLOSE_CIRCLE_FILL;
  }
});

/**
 * @description 点击内容
 * */
const clickHandler = () => {
  emit("click");
};
/**
 * @description 点击关闭按钮
 * */
const closeHandler = () => {
  show.value = false;
  emit("close");
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
