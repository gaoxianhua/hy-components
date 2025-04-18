<!--
  Description: 价格的样式
-->

<template>
  <text class="hy-price" :style="priceStyle" @tap="handleClick">
    <text class="hy-price__prefix">{{ symbol }}</text>
    <text
      class="hy-price__text"
      :style="[
        { 'font-size': `${Number(fontSize) + Number(fontSize) * 0.8}rpx` }
      ]"
      >{{ priceOne[0] }}
    </text>
    <text class="hy-price__decimal">
      {{ "." + priceOne[1].slice(0, num) }}
    </text>
  </text>
</template>

<script setup lang="ts">
import { computed, CSSProperties, toRefs } from "vue";
import defaultProps from "./props";
import IProps from "./typing";
import { addUnit } from "../../utils";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { text, textColor, weight, fontSize, slant, customStyle } = toRefs(props);
const emit = defineEmits(["click"]);

/**
 * @description 价格整体样式
 * */
const priceStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    color: textColor.value,
    fontWeight: weight.value,
    fontStyle: slant.value ? "oblique" : "",
    fontSize: addUnit(fontSize.value)
  };

  return Object.assign(style, customStyle);
});

/**
 * @description 价格处理
 * */
const priceOne = computed(() => {
  let value = "";
  if (typeof text.value !== "string") {
    value = text.value.toString();
  } else {
    value = text.value;
  }
  if (/\./g.test(value)) {
    if (Number(value)) {
      return value.split(".");
    } else {
      return ["0", "00"];
    }
  } else {
    return [value, "000000"];
  }
});

/**
 * @description 点击事件
 * */
const handleClick = () => {
  emit("click", text.value);
};
</script>

<style lang="scss" scoped>
.hy-price {
  font-size: 32rpx;
  font-weight: 500;
  margin-top: 5px;
  &__prefix {
    font-size: 24rpx;
  }
  &__decimal {
    font-size: 24rpx;
  }
}
</style>
