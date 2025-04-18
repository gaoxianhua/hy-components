<template>
  <view :class="[`hy-steps--${direction}`, 'hy-steps']">
    <template v-for="(item, i) in list" :key="i">
      <view
        ref="hy-steps-item"
        :class="[`hy-steps-item--${direction}`, 'hy-steps-item']"
      >
        <!--	线条	-->
        <view
          v-if="i + 1 < list.length"
          :class="[`hy-steps-item__line--${direction}`, 'hy-steps-item__line']"
          :style="lineStyle(item, i)"
        ></view>
        <view
          :class="[
            `hy-steps-item__wrapper--${direction}`,
            dot && `hy-steps-item__wrapper--${direction}--dot`,
            'hy-steps-item__wrapper'
          ]"
          :style="itemStyleInner"
        >
          <slot name="icon" :error="item.error" :index="i">
            <view
              class="hy-steps-item__wrapper__dot"
              v-if="dot"
              :style="{
                backgroundColor: statusColor(i, item.error)
              }"
            >
            </view>
            <view
              class="hy-steps-item__wrapper__icon"
              v-else-if="activeIcon || inactiveIcon"
            >
              <HyIcon
                :name="i <= current ? activeIcon : inactiveIcon"
                :size="iconSize"
                :color="i <= current ? activeColor : inactiveColor"
              >
              </HyIcon>
            </view>
            <view
              v-else
              :style="{
                backgroundColor:
                  statusClass(i, item.error) === 'process'
                    ? activeColor
                    : 'transparent',
                borderColor: statusColor(i, item?.error)
              }"
              class="hy-steps-item__wrapper__circle"
            >
              <text
                v-if="
                  statusClass(i, item.error) === 'process' ||
                  statusClass(i, item.error) === 'wait'
                "
                class="hy-steps-item__wrapper__circle__text"
                :style="{
                  color: i == current ? '#ffffff' : inactiveColor
                }"
                >{{ i + 1 }}</text
              >
              <HyIcon
                v-else
                :color="
                  statusClass(i, item.error) === 'error' ? 'error' : activeColor
                "
                :size="iconSize"
                :name="
                  statusClass(i, item.error) === 'error'
                    ? IconConfig.CLOSE
                    : IconConfig.CHECK_MASK
                "
              ></HyIcon>
            </view>
          </slot>
        </view>

        <!-- 内容 -->
        <view
          class="hy-steps-item__content"
          :class="[`hy-steps-item__content--${direction}`]"
          :style="[contentStyle]"
        >
          <slot name="content" :record="item" :index="i">
            <template>
              <slot name="title" :title="item.title" :index="i">
                <text
                  :style="{
                    lineHeight: '20px',
                    fontSize: current == i ? '14px' : '13px',
                    color: i == current ? '#2c405a' : '#555555'
                  }"
                  >{{ item.title }}</text
                >
              </slot>
              <slot name="desc" :desc="item.desc" :index="i">
                <text :style="{ fontSize: '12px', color: '#999' }">{{
                  item.desc
                }}</text>
              </slot>
            </template>
          </slot>
        </view>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed, CSSProperties, toRefs, ref, onMounted } from "vue";
import defaultProps from "./props";
import IProps, { StepListVo } from "./typing";
import { addUnit, getRect } from "../../utils";
import { ColorConfig, IconConfig } from "../../config";

// 组件
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const { current, direction, dot, inactiveColor, activeColor } = toRefs(props);
const emit = defineEmits(["click", "update:current"]);

const showLine = ref(false);
const size = ref<UniApp.NodeInfo>({
  height: 0,
  width: 0
});

const lineStyle = computed(() => {
  return (temp: StepListVo, index: number): CSSProperties => {
    const style: CSSProperties = {};
    if (direction.value === "row") {
      style.width = addUnit(size.value.width);
      style.left = addUnit(size.value.width! / 2);
    } else {
      style.height = addUnit(size.value.height);
      // style.top = addUnit(size.width / 2)
    }
    style.backgroundColor = temp.error
      ? ColorConfig.error
      : index < current.value
      ? activeColor.value
      : inactiveColor.value;
    return style;
  };
});
// const itemStyleInner = () => {
// 	return {
// 		...itemStyle.value
// 	}
// }
const itemStyleInner = computed(() => {
  return {};
});
/**
 * @description 状态类名
 * */
const statusClass = computed(() => {
  return (index: number, error: boolean = false) => {
    if (current.value == index) {
      return error ? "error" : "process";
    } else if (error) {
      return "error";
    } else if (current.value > index) {
      return "finish";
    } else {
      return "wait";
    }
  };
});
const statusColor = computed(() => {
  return (index: number, error: boolean) => {
    let colorTmp = "";
    switch (statusClass.value(index, error)) {
      case "finish":
        colorTmp = activeColor.value;
        break;
      case "error":
        colorTmp = ColorConfig.error;
        break;
      case "process":
        colorTmp = dot.value ? activeColor.value : "transparent";
        break;
      default:
        colorTmp = inactiveColor.value;
        break;
    }
    return colorTmp;
  };
});

const contentStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (direction.value === "column") {
    style.marginLeft = dot.value ? "2px" : "6px";
    style.marginTop = dot.value ? "0px" : "6px";
  } else {
    style.marginTop = dot.value ? "2px" : "6px";
    style.marginLeft = dot.value ? "2px" : "6px";
  }

  return style;
});

onMounted(() => {
  getStepsItemRect();
});

// 获取组件的尺寸，用于设置横线的位置
const getStepsItemRect = () => {
  getRect(".hy-steps-item").then((rect) => {
    size.value = rect as UniApp.NodeInfo;
  });
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";
@import "../../theme.scss";

.hy-steps {
  @include flex;

  &--column {
    flex-direction: column;
  }

  &--row {
    flex-direction: row;
    flex: 1;
    /* #ifdef MP */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    /* #endif */
  }

  &-item {
    flex: 1;
    @include flex;

    &--row {
      flex-direction: column;
      align-items: center;
      position: relative;
    }

    &--column {
      position: relative;
      flex-direction: row;
      justify-content: flex-start;
      padding-bottom: 5px;
    }

    &__wrapper {
      @include flex;
      justify-content: center;
      align-items: center;
      position: relative;
      background-color: #fff;
      border-radius: 50px;

      &--column {
        width: 20px;
        height: 20px;

        &--dot {
          height: 20px;
          width: 20px;
        }
      }

      &--row {
        width: 20px;
        height: 20px;

        &--dot {
          width: 20px;
          height: 20px;
        }
      }

      &__circle {
        width: 20px;
        height: 20px;
        /* #ifndef APP-NVUE */
        box-sizing: border-box;
        flex-shrink: 0;
        /* #endif */
        border-radius: 100px;
        border-width: 1px;
        border-color: $hy-tips-color;
        border-style: solid;
        @include flex(row);
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;

        &__text {
          color: $hy-tips-color;
          font-size: 11px;
          @include flex(row);
          align-items: center;
          justify-content: center;
          text-align: center;
          line-height: 11px;
        }
      }

      &__dot {
        width: 10px;
        height: 10px;
        border-radius: 100px;
        background-color: $hy-color-subtitle;
      }
    }

    &__content {
      @include flex;
      flex: 1;

      &--row {
        flex-direction: column;
        align-items: center;
      }

      &--column {
        flex-direction: column;
        justify-content: flex-start;
        margin-left: 6px;
        min-height: 60px;
      }
    }

    &__line {
      position: absolute;
      background: $hy-tips-color;

      &--row {
        top: 10px;
        height: 1px;
      }

      &--column {
        width: 1px;
        left: 10px;
      }
    }
  }
}
</style>
