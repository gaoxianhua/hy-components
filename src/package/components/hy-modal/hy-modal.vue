<template>
  <HyPopup
    mode="center"
    :zoom="zoom"
    :show="show"
    :customStyle="{
      borderRadius: '6px',
      overflow: 'hidden',
      marginTop: `-${addUnit(negativeTop)}`
    }"
    :closeOnClickOverlay="closeOnClickOverlay"
    :safeAreaInsetBottom="false"
    :duration="400"
    @click="clickHandler"
  >
    <view
      class="hy-modal"
      :style="{
        width: addUnit(width)
      }"
    >
      <view class="hy-modal__title" v-if="title">{{ title }}</view>
      <view
        class="hy-modal__content"
        :style="{
          paddingTop: `${title ? 12 : 25}px`
        }"
      >
        <slot>
          <text class="hy-modal__content__text">
            {{ content }}
          </text>
        </slot>
      </view>
      <view
        class="hy-modal__button-group--confirm-button"
        v-if="$slots.confirmButton"
      >
        <slot name="confirmButton"></slot>
      </view>
      <template v-else>
        <view
          class="hy-modal__button-group"
          :style="{
            flexDirection: buttonReverse ? 'row-reverse' : 'row'
          }"
        >
          <view
            class="hy-modal__button-group__wrapper u-modal__button-group__wrapper--cancel"
            :hover-stay-time="150"
            hover-class="hy-modal__button-group__wrapper--hover"
            :class="[
              showCancelButton &&
                !showConfirmButton &&
                'hy-modal__button-group__wrapper--only-cancel'
            ]"
            v-if="showCancelButton"
            @tap.stop="cancelHandler"
          >
            <text
              class="hy-modal__button-group__wrapper__text"
              :style="{
                color: cancelColor
              }"
              >{{ cancelText }}</text
            >
          </view>
          <view
            class="hy-modal__button-group__wrapper--line"
            v-if="showConfirmButton && showCancelButton"
          ></view>
          <view
            class="hy-modal__button-group__wrapper u-modal__button-group__wrapper--confirm"
            :hover-stay-time="150"
            hover-class="hy-modal__button-group__wrapper--hover"
            :class="[
              !showCancelButton &&
                showConfirmButton &&
                'hy-modal__button-group__wrapper--only-confirm'
            ]"
            v-if="showConfirmButton"
            @tap="confirmHandler"
          >
            <HyIcon
              v-if="loading"
              :name="IconConfig.LOADING"
              :isRotate="loading"
            ></HyIcon>
            <text
              v-else
              class="hy-modal__button-group__wrapper__text"
              :style="{
                color: confirmColor
              }"
              >{{ confirmText }}</text
            >
          </view>
        </view>
      </template>
    </view>
  </HyPopup>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import defaultProps from "./props";
import IProps from "./typing";
import { addUnit } from "../../utils";
import { IconConfig } from "../../config";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyPopup from "../hy-popup/hy-popup.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { show, asyncClose, closeOnClickOverlay } = toRefs(props);
const emit = defineEmits(["confirm", "cancel", "close", "update:show"]);

const loading = ref<boolean>(false);

watch(
  () => show.value,
  (newValue) => {
    if (newValue && loading.value) loading.value = false;
  }
);

/**
 * @description 点击确定按钮
 * */
const confirmHandler = () => {
  // 如果配置了异步关闭，将按钮值为loading状态
  if (asyncClose.value) {
    loading.value = true;
  } else {
    emit("update:show", false);
  }
  emit("confirm");
};

/**
 * @description 点击取消按钮
 * */
const cancelHandler = () => {
  emit("update:show", false);
  emit("cancel");
};

/**
 * @description 点击遮罩
 * */
const clickHandler = () => {
  if (closeOnClickOverlay.value) {
    emit("update:show", false);
    emit("close");
  }
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";
@import "../../theme.scss";

$u-modal-border-radius: 6px;

.hy-modal {
  width: 650rpx;
  border-radius: $hy-border-radius-base;
  overflow: hidden;

  &__title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    color: $hy-color-title;
    text-align: center;
    padding-top: 25px;
  }

  &__content {
    padding: 12px 25px 25px 25px;
    @include flex;
    justify-content: center;

    &__text {
      text-align: v-bind(contentTextAlign);
      font-size: 15px;
      color: $hy-text-color-grey;
      flex: 1;
    }
  }

  &__button-group {
    border-top: $hy-border-line;
    @include flex;

    &--confirm-button {
      flex-direction: column;
      padding: 0 25px 15px 25px;
    }

    &__wrapper {
      flex: 1;
      @include flex;
      justify-content: center;
      align-items: center;
      height: 48px;

      &--line {
        background: $hy-text-color-light;
        width: 1px;
        height: 48px;
      }

      &--confirm,
      &--only-cancel {
        border-bottom-right-radius: $hy-border-radius-base;
      }

      &--cancel,
      &--only-confirm {
        border-bottom-left-radius: $hy-border-radius-base;
      }

      &--hover {
        background-color: $hy-bg-color-grey;
      }

      &__text {
        color: $hy-color-subtitle;
        font-size: 16px;
        text-align: center;
      }
    }
  }
}
</style>
