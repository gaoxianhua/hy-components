<template>
  <view>
    <hy-swipe-action :options="options1">
      <template #content>
        <div
          style="padding: 15px; background: #fff; border-bottom: 1px solid #eee"
        >
          这是列表项内容
        </div>
      </template>
      <template #actions>
        <div style="padding: 15px">
          <button
            @click="handleDelete"
            style="
              background: #f44336;
              border: none;
              color: white;
              padding: 5px 10px;
              border-radius: 3px;
              margin-left: 10px;
            "
          >
            删除
          </button>
          <button
            @click="handleEdit"
            style="
              background: #f44336;
              border: none;
              color: white;
              padding: 5px 10px;
              border-radius: 3px;
              margin-left: 10px;
            "
          >
            编辑
          </button>
        </div>
      </template>
    </hy-swipe-action>

    <up-swipe-action>
      <up-swipe-action-item v-model:show="show" :options="options1">
        <view class="swipe-action up-border-top up-border-bottom">
          <view class="swipe-action__content">
            <text class="swipe-action__content__text">基础使用</text>
          </view>
        </view>
      </up-swipe-action-item>
    </up-swipe-action>
  </view>
</template>

<script setup lang="ts">
import HySwipeAction from "@/package/components/hy-swipe-action/hy-swipe-action.vue";
import { reactive, ref } from "vue";

const show = ref(false);
// 使用 reactive 创建响应式对象
const options1 = reactive([
  {
    text: "删除",
  },
]);
</script>

<style scoped lang="scss">
.u-page {
  padding: 0;
}

.u-demo-block__title {
  padding: 10px 0 2px 15px;
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
