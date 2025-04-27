<template>
  <view>
    <view class="hy-title">基础使用</view>
    <hy-qrcode cid="qrcode_1" text="https://gxh151.top/h5"></hy-qrcode>

    <view class="hy-title">带logo</view>
    <hy-qrcode
      cid="qrcode_2"
      text="https://gxh151.top/h"
      :icon="config.avatar"
    ></hy-qrcode>
  </view>
</template>

<script setup lang="ts">
import HyQrcode from "@/package/components/hy-qrcode/hy-qrcode.vue";
import { config } from "@/config/config";
</script>

<style scoped lang="scss"></style>
