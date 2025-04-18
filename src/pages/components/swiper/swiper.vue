<template>
  <hy-swiper :list="list" indicator :indicatorMode="mode"></hy-swiper>

  <hy-swiper
    :list="list"
    indicator
    :indicatorMode="mode"
    previousMargin="20"
    nextMargin="20"
    circular
    radius="5"
    bgColor="#ffffff"
  ></hy-swiper>

  <u-swiper
    :list="list"
    indicator
    :indicatorMode="mode"
    previousMargin="20"
    nextMargin="20"
    circular
    radius="5"
    bgColor="#ffffff"
  ></u-swiper>

  <view class="hy-title">指示点</view>
  <hy-subsection :list="list_1" v-model="mode"></hy-subsection>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import HySwiper from "@/package/components/hy-swiper/hy-swiper.vue";
import HySubsection from "../../../package/components/hy-subsection/hy-subsection.vue";

const list = ref([
  "https://img0.baidu.com/it/u=1913990970,584854398&fm=253&id=1",
  "http://mms2.baidu.com/it/u=204741874,3444396868&fm=253&id=2",
  "https://img2.baidu.com/it/u=3042825715,659259329&fm=253&id=3",
  "https://img2.baidu.com/it/u=109690972,2214958998&fm=253&id=4",
  "http://mms0.baidu.com/it/u=2161107790,808970254&fm=253&id=5",
  "https://img2.baidu.com/it/u=4211554685,400408647&fm=253&id=6",
  "https://img2.baidu.com/it/u=2237681987,1998118702&fm=253&id=7",
  "https://img1.baidu.com/it/u=2494879897,1602792615&fm=253&id=8",
]);
const mode = ref<HyApp.SwiperIndicatorModeType>("line");

const list_1 = reactive([
  { name: "线", value: "line" },
  { name: "点", value: "dot" },
]);
</script>

<style scoped lang="scss"></style>
