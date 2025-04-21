<template>
  <Hy-cell title="基础组件" :list="list_1"></Hy-cell>
  <hy-cell title="表单组件" :list="list_2"></hy-cell>
  <!--  <hy-cell title="反馈组件" :list="list"></hy-cell>-->
  <!--  <hy-cell title="布局组件" :list="list"></hy-cell>-->
  <!--  <hy-cell title="导航组件" :list="list"></hy-cell>-->
  <!--  <hy-cell title="其他组件" :list="list"></hy-cell>-->
  <!--  <hy-cell title="业务组件" :list="list"></hy-cell>-->
</template>

<script setup lang="ts">
import { ref } from "vue";
import HyCell from "hy-app/components/hy-cell/hy-cell.vue";

const click = () => {
  uni.navigateTo({
    url: "/pages/components/Icon/Icon",
  });
};
const list_1 = ref([
  {
    title: "Icon 图标",
    url: "/pages/components/Icon/Icon",
  },
  {
    title: "Image 图片",
    url: "pages/components/image/Index",
  },
  {
    title: "Button 按钮",
    url: "/pages/components/button/button",
  },
  {
    title: "Cell 单元格",
    url: "/pages/components/cell/cell",
  },
  {
    title: "Badge 徽标数",
    url: "/pages/components/badge/badge",
  },
  {
    title: "Tag 标签",
    url: "/pages/components/tag/tag",
  },
  {
    title: "Swiper 轮播图",
    url: "/pages/components/swiper/swiper",
  },
]);

const list_2 = ref([
  {
    title: "Form 表单",
    url: "/pages/components/form/form",
  },
  {
    title: "Calendar 日历",
    url: "/pages/components/calendar/calendar",
  },
  {
    title: "Select 下拉框",
    url: "/pages/components/select/select",
  },
  {
    title: "Picker 选择器",
    url: "/pages/components/picker/picker",
  },
  {
    title: "DatetimePicker 时间选择器",
    url: "/pages/components/datetimePicker/datetimePicker",
  },
  {
    title: "AddressPicker 地址选择器",
    url: "/pages/components/addressPicker/addressPicker",
  },
  {
    title: "Search 搜索",
    url: "/pages/components/search/search",
  },
  {
    title: "Rate 评分",
    url: "/pages/components/rate/rate",
  },
  {
    title: "NumberBox 步进器",
    url: "/pages/components/numberBox/numberBox",
  },
  {
    title: "Input 输入框",
    url: "/pages/components/input/input",
  },
  {
    title: "Textarea 文本域",
    url: "/pages/components/textarea/textarea",
  },
  {
    title: "CheckButton 复选框按钮",
    url: "/pages/components/checkButton/checkButton",
  },
  {
    title: "Checkbox 复选框",
    url: "/pages/components/checkbox/checkbox",
  },
  {
    title: "Radio 单选框",
    url: "/pages/components/radio/radio",
  },
  {
    title: "Slider 滑动选择器",
    url: "/pages/components/slider/slider",
  },
  {
    title: "Switch 开关选择器",
    url: "/pages/components/switch/switch",
  },
  {
    title: "Upload 上传",
    url: "/pages/components/upload/upload",
  },
]);
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
