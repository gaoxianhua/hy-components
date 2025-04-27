<template>
  <Hy-cell title="基础组件" :list="list_1"></Hy-cell>
  <hy-cell title="表单组件" :list="list_2"></hy-cell>
  <hy-cell title="布局组件" :list="list_3"></hy-cell>
  <hy-cell title="反馈组件" :list="list_4"></hy-cell>
  <hy-cell title="导航组件" :list="list_5"></hy-cell>
  <hy-cell title="其他组件" :list="list_6"></hy-cell>
  <!--  <hy-cell title="业务组件" :list="list"></hy-cell>-->
</template>

<script setup lang="ts">
import HyCell from "hy-app/components/hy-cell/hy-cell.vue";

import { list_1, list_2, list_3, list_4, list_5, list_6 } from "./index";
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
