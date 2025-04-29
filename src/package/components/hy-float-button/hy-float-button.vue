<template>
  <view
    :style="FloatButtonStyle"
    :id="soleId"
    :class="[
      'hy-float-button',
      {
        'hy-float-button__animation': float,
        'hy-float-button__shadow': shadow,
      },
      `hy-float-button__${shape}`,
    ]"
  >
    <view
      :class="['hy-float-button__container']"
      @tap.stop="handleClick"
      :style="{ backgroundColor: bgColor }"
    >
      <slot>
        <HyIcon
          :name="icon"
          :color="iconColor"
          :size="iconSize ? iconSize : addUnit(getPx(getFloatBtnSize) * 0.7)"
        />
        <text v-if="text" :style="{ color: textColor, fontSize: fontSize }">{{
          text
        }}</text>
      </slot>
    </view>

    <!-- 菜单栏 -->
    <view
      :class="['hy-float-button__menus', `hy-float-button__menus--${shape}`]"
      :style="menusStyle"
    >
      <template v-for="(item, i) in menus" :key="i">
        <view
          class="hy-float-button__menus--item"
          :style="{
            width: getFloatBtnSize,
            height: getFloatBtnSize,
            color: textColor,
          }"
          @click="handleMenuItemClick(item, i)"
        >
          {{ typeof item === "string" ? item : item.label }}
        </view>
        <HyLine
          v-if="i !== menus.length - 1"
          :length="addUnit(getPx(getFloatBtnSize) * 0.7)"
          :direction="direction === 'row' ? 'column' : 'row'"
          :custom-style="{ margin: 'auto' }"
        ></HyLine>
      </template>
    </view>
    <!-- 菜单栏 -->
  </view>
</template>

<script lang="ts" setup>
import { computed, type CSSProperties, onMounted, ref, toRefs } from "vue";
import type IProps from "./typing";
import type { MenusType } from "./typing";
import defaultProps from "./props";
import { addUnit, getPx, getRect, getWindowInfo, guid } from "../../utils";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";
import HyLine from "../hy-line/hy-line.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  menus,
  customStyle,
  left,
  bottom,
  zIndex,
  bgColor,
  text,
  textColor,
  size,
  fixed,
  direction,
  opacity,
} = toRefs(props);
const emit = defineEmits(["click", "clickItem"]);

const btnSize: AnyObject = {
  small: "50px",
  medium: "60px",
  large: "70px",
};
const open = ref(false);
const rotate = computed(() => (open.value && !text.value ? "45deg" : "0deg"));
const soleId = `hy-float-button__${guid()}`;
const showLeft = ref(false);

/**
 * @description 获取组件大小
 * */
const getFloatBtnSize = computed(() => {
  if (
    typeof size.value === "string" &&
    Object.keys(btnSize).includes(size.value)
  ) {
    return btnSize[size.value];
  } else {
    return addUnit(size.value);
  }
});

const FloatButtonStyle = computed(() => {
  const style: CSSProperties = {
    bottom: addUnit(bottom.value),
    left: addUnit(left.value),
    backgroundColor: bgColor.value,
    zIndex: zIndex.value,
    color: textColor.value,
  };
  if (fixed.value) style.position = "fixed";

  style.height = getFloatBtnSize.value;
  style.width = getFloatBtnSize.value;
  return Object.assign(style, customStyle.value);
});
const menusStyle = computed(() => {
  const style: CSSProperties = {
    backgroundColor: bgColor.value,
  };

  // 判断横向展示还是纵向展示
  if (direction.value === "row") {
    if (showLeft.value) {
      style.transform = "translateX(-100%)";
      style.left = "100%";
      style.paddingRight = getFloatBtnSize.value;
      style.flexDirection = "row-reverse";
    } else {
      style.paddingLeft = getFloatBtnSize.value;
    }
    style.bottom = 0;
    style.transition = "width 0.5s ease";
    style.height = getFloatBtnSize.value;
    style.width = open.value
      ? addUnit(
          getPx(getFloatBtnSize.value) * menus.value.length +
            getPx(getFloatBtnSize.value),
        )
      : 0;
  } else {
    style.bottom = 0;
    style.left = 0;
    style.transition = "height 0.5s ease";
    style.width = getFloatBtnSize.value;
    style.height = open.value
      ? addUnit(
          getPx(getFloatBtnSize.value) * menus.value.length +
            getPx(getFloatBtnSize.value),
        )
      : 0;
    style.paddingBottom = getFloatBtnSize.value;
  }
  return style;
});

onMounted(() => {
  const { windowWidth } = getWindowInfo();
  getRect(`#${soleId}`).then((rect: UniApp.NodeInfo) => {
    if (rect?.left && rect.left > windowWidth / 2) showLeft.value = true;
  });
});

/**
 * @description 点击悬浮按钮
 * */
const handleClick = () => {
  emit("click");
  open.value = !open.value;
};

/**
 * @description 点击单条菜单栏
 * */
const handleMenuItemClick = (temp: MenusType, index: number) => {
  emit("clickItem", temp, index);
  if (typeof temp !== "string" && temp?.url) {
    uni.navigateTo({
      url: temp.url,
    });
  }
};
</script>

<style scoped lang="scss">
@import "../../theme.scss";
@import "../../libs/css/mixin.scss";
.hy-float-button {
  position: relative;
  opacity: v-bind(opacity);
  &__circle {
    border-radius: $hy-border-radius-semicircle;
  }

  &__square {
    border-radius: $hy-border-radius-sm;
  }

  &__shadow {
    box-shadow: $hy-box-shadow;
  }

  &__animation {
    animation: floatAnimation 2s ease-in-out infinite;
    @keyframes floatAnimation {
      0%,
      100% {
        transform: translateY(0); /* 初始位置 */
      }
      50% {
        transform: translateY(-20px); /* 上浮20像素 */
      }
    }
  }

  &__container {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    @include flex(column);
    justify-content: center;
    align-items: center;
    rotate: v-bind(rotate);
    transition: 0.4s ease;
  }

  &__menus {
    position: absolute;
    z-index: -1;
    overflow: hidden;
    @include flex(v-bind(direction));
    max-height: 250px;
    box-sizing: border-box;
    &--item {
      font-size: 28rpx;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &--circle {
      border-radius: $hy-border-radius-semicircle;
    }

    &--square {
      border-radius: $hy-border-radius-sm;
    }
  }
}
</style>
