<template>
  <view class="hy-page">
    <view class="hy-title">基本使用</view>
    <view class="hy-container">
      <hy-button type="primary" @click="show = !show">打开遮罩框</hy-button>
      <hy-overlay :show="show" @click="show = false" :opacity="opacity">
        <view @click.stop="onClick" class="hy-setting__box">
          <view class="hy-title">透明度</view>
          <hy-slider v-model="opacity" :min="0" :max="1" step="0.1" />
        </view>
      </hy-overlay>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import HyOverlay from "@/package/components/hy-overlay/hy-overlay.vue";
import HySubsection from "@/package/components/hy-subsection/hy-subsection.vue";
import HySwitch from "@/package/components/hy-switch/hy-switch.vue";
const show = ref(false);
const opacity = ref(0.5);

const onClick = () => {};
</script>

<style scoped lang="scss">
.hy-setting__box {
  z-index: 999999;
}
</style>
