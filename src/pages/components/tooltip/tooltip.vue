<template>
  <view>
    <view class="hy-title">基础使用</view>
    <view class="hy-container">
      <hy-tooltip text="复制内容"></hy-tooltip>
    </view>

    <view class="hy-title">下方显示</view>
    <view class="hy-container">
      <hy-tooltip text="复制内容" direction="bottom"></hy-tooltip>
    </view>

    <view class="hy-title">扩展按钮</view>
    <view class="hy-container">
      <hy-tooltip text="复制内容" :buttons="['扩展', '分享']"></hy-tooltip>
    </view>

    <view class="hy-title">高亮选中文本背景色</view>
    <view class="hy-container">
      <hy-tooltip text="复制内容" bgColor="#e3e4e6"></hy-tooltip>
    </view>
  </view>
</template>

<script setup lang="ts">
import HyTooltip from "@/package/components/hy-tooltip/hy-tooltip.vue";
</script>

<style scoped lang="scss"></style>
