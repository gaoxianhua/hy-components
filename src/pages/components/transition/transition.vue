<template>
  <view>
    <hy-cell :list="list" @click="onClick"></hy-cell>

    <hy-transition :mode="mode" :show="show" :custom-style="style">
      <view class="transition"></view>
    </hy-transition>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import type { CellContentVo } from "hy-app/components/hy-cell/typing";
import { getWindowInfo } from "@/package";

const show = ref(false);
const mode = ref("");
const style = computed(() => {
  return {
    position: "fixed",
    top: `${getWindowInfo().windowHeight / 2 - 50}px`,
    left: `${getWindowInfo().windowWidth / 2 - 50}px`,
    width: "120px",
    height: "120px",
    backgroundColor: "#1989fa",
  };
});

const list = reactive([
  { title: "淡入", value: "fade" },
  { title: "上滑淡入", value: "fade-up" },
  { title: "下滑淡入", value: "fade-down" },
  { title: "左滑淡入", value: "fade-left" },
  { title: "右滑淡入", value: "fade-right" },
  { title: "上滑进入", value: "slide-up" },
  { title: "下滑进入", value: "slide-down" },
  { title: "左滑进入", value: "slide-left" },
  { title: "右滑进入", value: "slide-right" },
  { title: "缩放进入", value: "zoom-in" },
  { title: "缩放退出", value: "zoom-out" },
]);

const onClick = (temp: CellContentVo) => {
  mode.value = temp.value!;
  show.value = true;
  setTimeout(() => {
    show.value = false;
  }, 1500);
};
</script>

<style scoped lang="scss">
.transition {
  background-color: $u-primary;
}
</style>
