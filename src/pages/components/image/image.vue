<template>
  <view class="hy-page">
    <view class="hy-title">基础使用</view>
    <hy-image :src="config.avatar"></hy-image>

    <view class="hy-title">大小</view>
    <hy-image :src="config.avatar" width="50px" height="50px"></hy-image>

    <view class="hy-title">预览大图</view>
    <hy-image :src="config.avatar" preview-image></hy-image>

    <view class="hy-title">圆形</view>
    <hy-image
      :src="config.avatar"
      width="100px"
      height="100px"
      shape="circle"
    ></hy-image>
  </view>
</template>

<script setup lang="ts">
import HyImage from "@/package/components/hy-image/hy-image.vue";
import { config } from "@/config/config";
</script>

<style scoped lang="scss"></style>
