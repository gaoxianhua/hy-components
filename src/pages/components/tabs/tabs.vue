<template>
  <view>
    <hy-tabs :list="list">
      <template #default="{ record }">
        {{ record }}
      </template>
    </hy-tabs>
  </view>
</template>

<script setup lang="ts">
import HyTabs from "@/package/components/hy-tabs/hy-tabs.vue";
import { reactive } from "vue";

const list = reactive([
  { name: "关注", content: "我是内容" },
  { name: "推荐", badge: { isDot: true } },
  { name: "电影", badge: { value: 5 } },
  { name: "科技" },
  { name: "音乐" },
  { name: "美食" },
  { name: "文化" },
  { name: "财经" },
  { name: "手工" },
]);
</script>

<style scoped lang="scss"></style>
