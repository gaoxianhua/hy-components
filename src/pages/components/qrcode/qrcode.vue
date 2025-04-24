<template>
  <view>
    <view class="hy-title">基础使用</view>
    <hy-qrcode text="https://gxh151.top/h5"></hy-qrcode>

    <view class="hy-title">带logo</view>
    <hy-qrcode text="https://gxh151.top/h5" :icon="config.image"></hy-qrcode>
  </view>
</template>

<script setup lang="ts">
import HyQrcode from "@/package/components/hy-qrcode/hy-qrcode.vue";
import { config } from "@/config/config";
</script>

<style scoped lang="scss"></style>
