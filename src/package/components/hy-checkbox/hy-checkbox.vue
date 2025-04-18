<template>
  <view class="hy-checkbox-group" :class="bemClass">
    <template v-for="(item, i) in columns_1" :key="i">
      <view
        class="hy-checkbox cursor-pointer"
        @tap.stop="wrapperClickHandler"
        :style="checkboxStyle"
        :class="[
          `hy-checkbox-label--${iconPlacement}`,
          borderBottom && placement === 'column' && 'hy-border-bottom',
        ]"
      >
        <view
          class="hy-checkbox__icon-wrap cursor-pointer"
          @tap.stop="iconClickHandler($event, item)"
          :class="iconClasses(item)"
          :style="iconWrapStyle(item)"
        >
          <slot
            name="icon"
            :iconColor="iconColor"
            :iconSize="addUnit(iconSize)"
          >
            <HyIcon
              class="hy-checkbox__icon-wrap__icon"
              :name="IconConfig.CHECK_MASK"
              :size="addUnit(iconSize)"
              :color="iconColor || '#ffffff'"
            />
          </slot>
        </view>
        <view
          class="hy-checkbox__label-wrap cursor-pointer"
          @tap.stop="labelClickHandler($event, item)"
        >
          <slot name="label" :record="item">
            <text
              :style="{
                color: labelColor,
                fontSize: labelSize,
              }"
              >{{ item[fieldNames.label] }}</text
            >
          </slot>
        </view>
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
import defaultProps from "./props";
import type { CheckboxColumnsVo } from "./typing";
import type IProps from "./typing";
import { computed, toRefs, watch, ref } from "vue";
import type { CSSProperties } from "vue";
import { addUnit, bem, error } from "../../utils";
import { IconConfig } from "../../config";
import HyIcon from "../hy-icon/hy-icon.vue";

const props = withDefaults(defineProps<IProps>(), defaultProps);
const {
  modelValue,
  columns,
  fieldNames,
  disabled,
  shape,
  size,
  iconSize,
  activeColor,
  inactiveColor,
  customStyle,
  borderBottom,
  placement,
} = toRefs(props);
const emit = defineEmits(["change", "update:modelValue"]);

const columns_1 = ref();

watch(
  () => modelValue.value,
  (newValue) => {
    if (Array.isArray(newValue)) {
      columns_1.value = columns.value.map((item) => {
        item[fieldNames.value.checked] = newValue.includes(
          item[fieldNames.value.value] as string,
        );
        return item;
      });
    } else {
      error("传入值不是数组，请传数组值");
    }
  },
  { immediate: true },
);

const isDisabled = (disabledVal?: boolean): boolean =>
  disabled.value || !!disabledVal;

const checkboxStyle = computed(() => {
  const style: CSSProperties = {};
  if (borderBottom.value && placement.value === "row") {
    error(
      "检测到您将borderBottom设置为true，需要同时将u-checkbox-group的placement设置为column才有效",
    );
  }
  // 当父组件设置了显示下边框并且排列形式为纵向时，给内容和边框之间加上一定间隔
  if (borderBottom.value && placement.value === "column") {
    style.paddingBottom = "8px";
  }
  return Object.assign(style, customStyle.value);
});
const bemClass = computed(() => {
  return bem("checkbox-group", props, ["placement"]);
});

/**
 * @description 定义icon的Class类名
 * */
const iconClasses = computed(() => {
  return (temp: CheckboxColumnsVo): string[] => {
    let classes: string[] = [];
    // 组件的形状
    classes.push("hy-checkbox__icon-wrap--" + shape.value);
    if (isDisabled(temp?.disabled)) {
      classes.push("hy-checkbox__icon-wrap--disabled");
    }
    if (temp[fieldNames.value.checked] && isDisabled(temp?.disabled)) {
      classes.push("hy-checkbox__icon-wrap--disabled--checked");
    }
    return classes;
  };
});

/**
 * @description 定义icon的样式
 * */
const iconWrapStyle = computed(() => {
  return (temp: CheckboxColumnsVo): CSSProperties => {
    // checkbox的整体样式
    const style: CSSProperties = {};
    style.backgroundColor =
      temp[fieldNames.value.checked] && !isDisabled(temp?.disabled)
        ? activeColor.value
        : "#ffffff";
    style.borderColor =
      temp[fieldNames.value.checked] && !isDisabled(temp?.disabled)
        ? activeColor.value
        : inactiveColor.value;
    style.width = addUnit(size.value);
    style.height = addUnit(size.value);
    return style;
  };
});

/**
 * @description 点击图标
 * */
const iconClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
  e.stopPropagation();
  if (!isDisabled(temp?.disabled)) {
    setRadioCheckedStatus(temp);
  }
};
const wrapperClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
  e.stopPropagation();
  if (!isDisabled(temp?.disabled)) {
    setRadioCheckedStatus(temp);
  }
};
/**
 * @description 点击label
 * */
const labelClickHandler = (e: Event, temp: CheckboxColumnsVo) => {
  e.stopPropagation();
  if (!isDisabled(temp?.disabled)) {
    setRadioCheckedStatus(temp);
  }
};

/**
 * @description 执行函数改变状态传给父值
 * */
const setRadioCheckedStatus = (temp: CheckboxColumnsVo) => {
  // 将本组件标记为与原来相反的状态
  columns_1.value = columns_1.value.map((item: CheckboxColumnsVo) => {
    if (temp[fieldNames.value.value] === item[fieldNames.value.value]) {
      item[fieldNames.value.checked] = !item[fieldNames.value.checked];
    }
    return item;
  });
  emit("change", temp);
  emit(
    "update:modelValue",
    columns_1.value
      .filter((item: CheckboxColumnsVo) => item[fieldNames.value.checked])
      .map((item: CheckboxColumnsVo) => item[fieldNames.value.value]),
  );
  // 双向绑定
  // if (this.usedAlone) {
  // 	this.$emit('update:checked', this.isChecked)
  // }
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/mixin.scss";
@import "../../theme.scss";

.hy-checkbox {
  &-group {
    &--row {
      /* #ifndef APP-NVUE */
      display: flex;
      /* #endif */
      flex-flow: row wrap;
    }

    &--column {
      @include flex(column);
    }
  }

  /* #ifndef APP-NVUE */
  @include flex(row);
  /* #endif */
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;

  &-label--left {
    flex-direction: row;
  }

  &-label--right {
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  &__icon-wrap {
    /* #ifndef APP-NVUE */
    box-sizing: border-box;
    // nvue下，border-color过渡有问题
    transition-property: border-color, background-color, color;
    transition-duration: 0.2s;
    /* #endif */
    @include flex;
    align-items: center;
    justify-content: center;
    color: transparent;
    text-align: center;
    margin-right: $hy-border-margin-padding-sm;
    border: $hy-border-line;

    /* #ifdef MP-TOUTIAO */
    // 头条小程序兼容性问题，需要设置行高为0，否则图标偏下
    &__icon {
      line-height: 0;
    }

    /* #endif */

    &--circle {
      border-radius: 50%;
    }

    &--square {
      border-radius: 3px;
    }

    &--checked {
      color: $hy-text-color-inverse;
      background-color: $hy-primary;
      border-color: $hy-primary;
    }

    &--disabled {
      background-color: $hy-color-disable-bg !important;
    }

    &--disabled--checked {
      color: $hy-color-disable-icon !important;
    }
  }

  &__label-wrap {
    /* #ifndef APP-NVUE */
    word-wrap: break-word;
    /* #endif */
    color: $hy-text-color;
    font-size: $hy-font-size-base;
    margin-right: $hy-border-margin-padding-sm;

    &--disabled {
      color: $hy-text-color-disable;
    }
  }
}
</style>
