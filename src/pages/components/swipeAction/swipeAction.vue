<template>
  <view>
    <hy-swipe-action :options="options1" :list="list">
      <template #default="{ record }">
        <view class="u-demo-block__title"> {{ record.title }}</view>
      </template>
    </hy-swipe-action>
  </view>
</template>

<script setup lang="ts">
import HySwipeAction from "@/package/components/hy-swipe-action/hy-swipe-action.vue";
import { reactive, ref } from "vue";

const show = ref(false);
// 使用 reactive 创建响应式对象
const options1 = reactive([
  {
    text: "收藏",
    style: {
      backgroundColor: "#3c9cff",
    },
  },
  {
    text: "删除",
    style: {
      backgroundColor: "#f56c6c",
    },
  },
]);

const list = [
  {
    title: "你会",
  },
  {
    title: "第二天数据",
  },
];
</script>

<style scoped lang="scss">
.u-page {
  padding: 0;
}

.u-demo-block__title {
  padding: 20px;
}

.swipe-action {
  &__content {
    padding: 25rpx 0;

    &__text {
      font-size: 15px;
      padding-left: 30rpx;
    }
  }
}
</style>
