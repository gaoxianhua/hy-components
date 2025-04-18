<template>
  <view>
    <view class="hy-title">主题色</view>
    <view class="hy-flex">
      <hy-tag text="标签" type="primary"></hy-tag>
      <hy-tag text="标签" type="success"></hy-tag>
      <hy-tag text="标签" type="error"></hy-tag>
      <hy-tag text="标签" type="warning"></hy-tag>
      <hy-tag text="标签" type="info"></hy-tag>
      <hy-tag text="标签" bgColor="#800080" borderColor="#800080"></hy-tag>
    </view>

    <view class="hy-title">镂空</view>
    <view class="hy-flex">
      <hy-tag text="标签" type="primary" plain></hy-tag>
      <hy-tag text="标签" type="success" plain></hy-tag>
      <hy-tag text="标签" type="error" plain></hy-tag>
      <hy-tag text="标签" type="warning" plain></hy-tag>
      <hy-tag text="标签" type="info" plain></hy-tag>
      <hy-tag text="标签" color="#800080" borderColor="#800080" plain></hy-tag>
    </view>

    <view class="hy-title">镂空带背景色</view>
    <view class="hy-flex">
      <hy-tag text="标签" type="primary" plain plainFill></hy-tag>
      <hy-tag text="标签" type="success" plain plainFill></hy-tag>
      <hy-tag text="标签" type="error" plain plainFill></hy-tag>
      <hy-tag text="标签" type="warning" plain plainFill></hy-tag>
      <hy-tag text="标签" type="info" plain plainFill></hy-tag>
      <hy-tag
        text="标签"
        color="#800080"
        borderColor="#800080"
        bgColor="8000803F"
        plain
        plainFill
      ></hy-tag>
    </view>

    <view class="hy-title">尺寸</view>
    <view class="hy-flex">
      <hy-tag text="标签" size="large"></hy-tag>
      <hy-tag text="标签" size="medium"></hy-tag>
      <hy-tag text="标签" size="small"></hy-tag>
    </view>

    <view class="hy-title">形状</view>
    <view class="hy-flex">
      <hy-tag text="圆形" shape="circle"></hy-tag>
      <hy-tag text="方形" shape="square"></hy-tag>
    </view>

    <view class="hy-title">带图标</view>
    <view class="hy-flex">
      <hy-tag text="地址" :icon="IconConfig.MAP"></hy-tag>
    </view>

    <view class="hy-title">可关闭</view>
    <view class="hy-flex">
      <hy-tag
        text="关闭"
        closable
        :show="close"
        @close="close = false"
      ></hy-tag>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IconConfig } from "hy-app";
import HyTag from "@/package/components/hy-tag/hy-tag.vue";

const close = ref(true);
</script>

<style scoped lang="scss"></style>
