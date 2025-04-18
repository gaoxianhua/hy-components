<template>
  <view class="hy-line-progress" :style="customStyle">
    <view
      class="hy-line-progress__background"
      ref="hy-line-progress__background"
      :style="{
        backgroundColor: inactiveColor,
        height: addUnit(height)
      }"
    >
    </view>
    <view class="hy-line-progress__line" :style="[progressStyle]">
      <slot>
        <text
          v-if="showText && percentage >= 10"
          class="hy-line-progress__text"
          >{{ innserPercentage + "%" }}</text
        >
      </slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed, CSSProperties, onMounted, ref, toRefs, watch } from "vue";
import defaultProps from "./props";
import IProps from "./typing";
import { addUnit, getRect, range, sleep } from "../../utils";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { percentage, activeColor, height } = toRefs(props);

const lineWidth = ref<string | number>(0);

watch(
  () => percentage.value,
  () => resizeProgressWidth()
);

const progressStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  style.width = lineWidth.value;
  style.backgroundColor = activeColor.value;
  style.height = addUnit(height.value);
  return style;
});

const innserPercentage = computed(() => {
  // 控制范围在0-100之间
  return range(0, 100, percentage.value);
});

onMounted(() => {
  init();
});

const init = async () => {
  await sleep(20);
  resizeProgressWidth();
};
const getProgressWidth = () => {
  return new Promise((resolve) => {
    // #ifndef APP-NVUE
    resolve(getRect(".u-line-progress__background"));
    // #endif
  });
};

/**
 * @description 计算轨道长度
 * */
const resizeProgressWidth = async () => {
  const { width } = await getProgressWidth();
  // 通过设置的percentage值，计算其所占总长度的百分比
  lineWidth.value = (width * innserPercentage.value) / 100 + "px";
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";

.hy-line-progress {
  align-items: stretch;
  position: relative;
  @include flex(row);
  flex: 1;
  overflow: hidden;
  border-radius: 100px;

  &__background {
    background-color: #ececec;
    border-radius: 100px;
    flex: 1;
  }

  &__line {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    align-items: center;
    @include flex(row);
    color: #ffffff;
    border-radius: 100px;
    transition: width 0.5s ease;
    justify-content: flex-end;
  }

  &__text {
    font-size: 10px;
    align-items: center;
    text-align: right;
    color: #ffffff;
    margin-right: 5px;
    transform: scale(0.9);
  }
}
</style>
