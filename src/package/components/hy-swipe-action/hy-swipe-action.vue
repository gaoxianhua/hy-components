<template>
  <view class="hy-swipe-action" :style="customStyle">
    <template
      v-for="(fatherItem, fatherI) in swipeActionList"
      :key="fatherItem?.[key] || fatherI"
    >
      <view class="u-swipe-action-item" ref="u-swipe-action-item">
        <!--	右侧操作按钮	-->
        <view class="u-swipe-action-item__right">
          <slot name="button">
            <view
              v-for="(item, index) in options"
              :key="index"
              class="u-swipe-action-item__right__button"
              :ref="`u-swipe-action-item__right__button-${index}`"
              :style="{
                alignItems: item?.style?.borderRadius ? 'center' : 'stretch',
              }"
              @tap="buttonClickHandler(item, index, fatherI)"
            >
              <view
                class="u-swipe-action-item__right__button__wrapper"
                :style="operateItemStyle(item?.style)"
              >
                <u-icon
                  v-if="item.icon"
                  :name="item.icon"
                  :color="item?.style?.color || '#ffffff'"
                  :size="
                    item.iconSize
                      ? addUnit(item.iconSize)
                      : item.style && item.style.fontSize
                        ? getPx(item.style.fontSize) * 1.2
                        : 17
                  "
                  :customStyle="{
                    marginRight: item.text ? '2px' : 0,
                  }"
                ></u-icon>
                <text
                  v-if="item.text"
                  class="u-swipe-action-item__right__button__wrapper__text u-line-1"
                  :style="operateTextStyle(item?.style)"
                  >{{ item.text }}</text
                >
              </view>
            </view>
          </slot>
        </view>
        <!--	右侧操作按钮	-->

        <!--  左侧内容  -->
        <!-- #ifdef APP-VUE || MP-WEIXIN || MP-QQ || H5  -->
        <view
          class="u-swipe-action-item__content"
          @touchstart="wxs.touchstart"
          @touchmove="wxs.touchmove"
          @touchend="wxs.touchend"
          :status="fatherItem.status"
          :change:status="wxs.statusChange"
          :size="size"
          :change:size="wxs.sizeChange"
        >
          <slot :record="fatherItem"> </slot>
        </view>
        <!-- #endif -->
        <!--  左侧内容  -->
      </view>
    </template>
  </view>
</template>
<!-- #ifdef APP-VUE || MP-WEIXIN || MP-QQ || H5 -->
<script src="./index.wxs" module="wxs" lang="wxs"></script>
<!-- #endif -->

<script setup lang="ts">
import type IProps from "./typing";
import defaultProps from "./props";
import {
  computed,
  type CSSProperties,
  onMounted,
  ref,
  toRefs,
  watch,
} from "vue";
// #ifdef APP-VUE || MP-WEIXIN || MP-QQ || H5
import { getRect, sleep, addUnit, getPx } from "@/package";
// #endif

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  list,
  show,
  disabled,
  autoClose,
  threshold,
  options,
  duration,
  closeOnClick,
} = toRefs(props);
const emit = defineEmits(["update:show", "click"]);

type OpenStatus = "open" | "close" | "";

// 按钮的尺寸信息
const size = ref({});
const sliderStyle = ref({});
const swipeActionList = ref<AnyObject[]>([]);

watch(
  () => list.value,
  (newValue) => {
    swipeActionList.value = newValue.map((item) => ({
      ...item,
      status: "close",
    }));
  },
  { immediate: true },
);

const operateTextStyle = computed(() => {
  return (temp?: CSSProperties): CSSProperties => {
    return {
      color: temp?.color || "#ffffff",
      fontSize: temp?.fontSize || "16px",
      lineHeight: temp?.fontSize || "16px",
    };
  };
});

const operateItemStyle = computed(() => {
  return (temp?: CSSProperties): CSSProperties => {
    return {
      backgroundColor: temp?.backgroundColor || "#C7C6CD",
      borderRadius: temp?.borderRadius || "0",
      padding: temp?.borderRadius ? 0 : "0 15px",
      ...temp,
    };
  };
});

const wxsInit = computed(() => {
  return [
    disabled.value,
    autoClose.value,
    threshold.value,
    options.value,
    duration.value,
  ];
});

/**
 * @description 查询节点
 * */
const queryRect = () => {
  getRect(".u-swipe-action-item__right__button", true).then((buttons) => {
    size.value = {
      buttons,
      show: show.value,
      disabled: disabled.value,
      threshold: threshold.value,
      duration: duration.value,
    };
  });
};

watch(
  () => wxsInit.value,
  () => queryRect(),
);

// watch(
//   () => status.value,
//   (newValue: OpenStatus) => {
//     if (newValue === "open") {
//       emit("update:show", true);
//     } else {
//       emit("update:show", false);
//     }
//   },
// );
//
// watch(
//   () => show.value,
//   (newValue: boolean) => {
//     if (newValue) {
//       status.value = "open";
//     } else {
//       status.value = "close";
//     }
//   },
// );

onMounted(() => {
  init();
});

const init = () => {
  // 初始化父组件数据
  updateParentData();
  // #ifndef APP-NVUE
  sleep().then(() => {
    queryRect();
  });
  // #endif
};

const updateParentData = () => {
  // 此方法在mixin中
  // getParentData("u-swipe-action");
};

/**
 * @description 按钮被点击
 */
const buttonClickHandler = (
  item: AnyObject,
  index: number,
  fatherI: number,
) => {
  emit(
    "click",
    {
      item,
      index,
    },
    () => {},
  );
  if (closeOnClick.value) {
    closeHandler(fatherI);
  }
};

/**
 * @description 关闭时执行
 * */
const closeHandler = (index: number) => {
  swipeActionList.value = swipeActionList.value.map((item, i) => ({
    ...item,
    status: i === index ? "close" : "open",
  }));
  console.log(swipeActionList.value);
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";

.u-swipe-action-item {
  position: relative;
  overflow: hidden;
  /* #ifndef APP-NVUE || MP-WEIXIN */
  touch-action: pan-y;
  /* #endif */

  &__content {
    transform: translateX(0px); // 修复某些情况下默认右侧按钮是展开的问题
    background-color: #ffffff;
    z-index: 10;
  }

  &__right {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    @include flex;

    &__button {
      @include flex;
      justify-content: center;
      overflow: hidden;
      align-items: center;

      &__wrapper {
        @include flex;
        align-items: center;
        justify-content: center;
        padding: 0 15px;

        &__text {
          @include flex;
          align-items: center;
          color: #ffffff;
          font-size: 15px;
          text-align: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
