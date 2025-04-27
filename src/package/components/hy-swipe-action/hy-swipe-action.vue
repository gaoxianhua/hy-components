<template>
  <div
    class="swipe-action"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <div
      class="swipe-content"
      :style="{ transform: `translateX(${translateX}px)` }"
    >
      <slot name="content"></slot>
    </div>
    <div class="swipe-actions" :style="{ width: `${buttonsWidth}px` }">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "SwipeAction",
  props: {
    threshold: {
      type: Number,
      default: 50,
    },
    duration: {
      type: [Number, String],
      default: "0.3s",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const translateX = ref(0);
    const buttonsWidth = ref(0);
    const startX = ref(0);

    const getButtonsWidth = () => {
      const actionsWidth =
        document.querySelector(".swipe-actions")?.offsetWidth || 0;
      buttonsWidth.value = actionsWidth;
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (props.disabled) return;
      startX.value = event.touches[0].pageX;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (props.disabled) return;
      const currentX = event.touches[0].pageX;
      const diff = currentX - startX.value;

      if (diff > 0) {
        translateX.value = 0;
      } else {
        translateX.value = Math.max(diff, -buttonsWidth.value);
      }
    };

    const handleTouchEnd = () => {
      if (Math.abs(translateX.value) > props.threshold) {
        translateX.value = -buttonsWidth.value;
      } else {
        translateX.value = 0;
      }
    };

    onMounted(() => {
      getButtonsWidth();
    });

    return {
      translateX,
      buttonsWidth,
      handleTouchStart,
      handleTouchMove,
      handleTouchEnd,
    };
  },
});
</script>

<style scoped>
.swipe-action {
  display: flex;
  overflow: hidden;
  position: relative;
}

.swipe-content {
  flex: 1;
  transition: transform v-bind(duration);
}

.swipe-actions {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  background-color: #f44336;
  color: white;
}
</style>
