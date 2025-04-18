<template>
  <view class="hy-swiper-indicator">
    <view
      v-if="indicatorMode === 'line'"
      :class="[
        'hy-swiper-indicator__wrapper',
        `hy-swiper-indicator__wrapper--${indicatorMode}`
      ]"
      :style="{
        width: addUnit(lineWidth * length),
        backgroundColor: indicatorInactiveColor
      }"
    >
      <view
        class="hy-swiper-indicator__wrapper--line__bar"
        :style="[lineStyle]"
      ></view>
    </view>
    <view class="hy-swiper-indicator__wrapper" v-if="indicatorMode === 'dot'">
      <view
        class="hy-swiper-indicator__wrapper__dot"
        v-for="(item, index) in length"
        :key="index"
        :class="[
          index === current && 'hy-swiper-indicator__wrapper__dot--active'
        ]"
        :style="[dotStyle(index)]"
      >
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 指示器为线型的样式
import { computed, type CSSProperties, toRefs, ref } from "vue";
import { addUnit } from "../../utils";

interface IProps {
  length: number;
  current: number | string;
  indicatorActiveColor: string;
  indicatorInactiveColor: string;
  indicatorMode: "line" | "dot";
}
const props = withDefaults(defineProps<IProps>(), {});
const { current, indicatorActiveColor, indicatorInactiveColor } = toRefs(props);

const lineWidth = ref<number>(22);

const lineStyle = computed<CSSProperties>(() => {
  let style: CSSProperties = {};
  style.width = addUnit(lineWidth.value);
  style.transform = `translateX(${addUnit(
    Number(current.value) * lineWidth.value
  )})`;
  style.backgroundColor = indicatorActiveColor.value;
  return style;
});
// 指示器为点型的样式
const dotStyle = computed(() => {
  return (index: number): CSSProperties => {
    let style: CSSProperties = {};
    style.backgroundColor =
      index === current.value
        ? indicatorActiveColor.value
        : indicatorInactiveColor.value;
    return style;
  };
});
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";

.hy-swiper-indicator {
  &__wrapper {
    @include flex;

    &--line {
      border-radius: 100px;
      height: 4px;

      &__bar {
        width: 22px;
        height: 4px;
        border-radius: 100px;
        background-color: #ffffff;
        transition: transform 0.3s;
      }
    }

    &__dot {
      width: 5px;
      height: 5px;
      border-radius: 100px;
      margin: 0 4px;

      &--active {
        width: 12px;
      }
    }
  }
}
</style>
