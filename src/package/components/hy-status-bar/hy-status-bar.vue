<template>
  <view
    :style="[style]"
    class="hy-status-bar"
    :class="[isH5 && 'hy-safe-area-inset-top']"
  >
    <slot />
  </view>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
