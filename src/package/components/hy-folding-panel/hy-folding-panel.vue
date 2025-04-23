<template>
  <view class="hy-folding-panel">
    <HyCell
      :title="title"
      :titleBorder="titleBorder"
      :border="border"
      :showVertical="showVertical"
      :verticalColor="verticalColor"
      :size="size"
      :disabled="disabled"
      :list="lists"
      @click="clickHandler"
    >
      <template #icon="{ icon }">
        <slot name="icon" :icon="icon"></slot>
      </template>
      <template #title="{ title }">
        <slot name="title" :title="title"></slot>
      </template>
      <template #value="{ record }">
        <slot name="value" :record="record"></slot>
      </template>
      <template #bottom="{ record }">
        <view
          class="hy-folding-panel__main"
          :style="[
            customStyle,
            {
              height: record?.spread ? addUnit(contentHeight) : '0px',
            },
          ]"
        >
          <slot :record="record?.content" />
        </view>
        <HyLine v-if="record?.spread"></HyLine>
      </template>
    </HyCell>
  </view>
</template>

<script setup lang="ts">
import { toRefs, ref, watch } from "vue";
import defaultProps from "./props";
import IProps, { PanelVo } from "./typing";

import HyCell from "../hy-cell/hy-cell.vue";
import HyLine from "../hy-line/hy-line.vue";
import { addUnit } from "../../utils";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { list, contentHeight, accordion } = toRefs(props);
const emit = defineEmits(["open", "close", "change"]);

const lists = ref<PanelVo[]>([]);

watch(
  () => list.value,
  (newValue: PanelVo[]) => {
    lists.value = newValue.map((item) => ({
      ...item,
      arrowDirection: "down",
      spread: false,
    }));
  },
  { immediate: true },
);

const clickHandler = (temp: PanelVo, index: number) => {
  // if (temp?.disabled && temp?.animating) return;
  lists.value = list.value.map((item, i) => {
    if (accordion.value) {
      item.spread = i === index;
    } else {
      if (i === index) {
        item.spread = !item.spread;
      }
    }

    item.arrowDirection = item.spread ? "up" : "down";
    return item;
  });
  emit("change", temp, index);
  emit(temp.spread ? "open" : "close", temp, index);
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
