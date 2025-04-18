<template>
  <view class="placeholder-view"></view>
  <view class="bg">
    <view class="custom-tabbar" :style="{'background': props.bgColor}">
      <view class="ul">
        <view :class="['li', 'list', current === item.key ? 'active' : '']" v-for="item in props.list" :key="item.key" @click="checkItem(item.key)">
          <view class="bar">
            <view class="icon">
<!--              <text-->
<!--                  :class="['t-icon', `custom-t-icon-${item.icon}`]"-->
<!--              ></text>-->
              <image
                v-if="item.iconUrl"
                :src="item.iconUrl"
                style="height: 25px; width: 25px"
              ></image>
              <u-icon v-else :name="item.icon" :color="props.textColor" size="25"></u-icon>
            </view>
            <text class="text" :style="['color:' + props.textColor]">{{ item.label }}</text>
            <text class="circle"></text>
          </view>
        </view>
        <view
            class="indicator"
            :style="{
              '--num': `translateX(calc(((100vw - 110rpx - ${props.list.length} * 70rpx) / ${props.list.length - 1} + 70rpx) * ${current}))`,
              'background': activeColor
            }"
        ></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import prop from "./props";

interface IProps {
  current: number;
  textColor?: string;
  bgColor?: string;
  activeColor?: string;
  list: () => ([]);
}
const props = withDefaults(defineProps<IProps>(),{...prop})
const emit = defineEmits(['clickTab'])

const current = ref(0);
watch(
    () => props.current,
    (newVal) => {
      current.value = newVal
    }
)

const checkItem = (index: number) => {
  current.value = index;
  emit("clickTab", index)
}
</script>

<style lang="scss" scoped>
.placeholder-view {
  height: 135rpx;
}
.bg {
  background: #F8F8F8;
  height: 135rpx;
  z-index: 999;
  position: fixed;
  bottom: 0;
}
.custom-tabbar {
  margin-top: 15rpx;
  position: relative;
  width: 100vw;
  height: 120rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15rpx 15rpx 0 0;
  padding: 0 20rpx;
	/* #ifndef APP-PLUS-NVUE */
  box-sizing: border-box;
	/* #endif */
  .ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;
    .li {
      position: relative;
      width: 100rpx;
      height: 70rpx;
      z-index: 1;
      .bar {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        text-align: center;
        font-weight: 500;
        .icon {
					/* #ifndef APP-PLUS-NVUE */
					transition: .5s;
					/* #endif */
        }
        .text {
          position: absolute;
          font-weight: 400;
          font-size: .75em;
					/* #ifndef APP-PLUS-NVUE */
					letter-spacing: .05em;
					transition: .5s;
					/* #endif */
          transform: translateY(20px) scale(0);
        }
        .circle {
          position: absolute;
					/* #ifndef APP-PLUS-NVUE */
					display: block;
					/* #endif */
          width: 75rpx;
          height: 75rpx;
          background: transparent;
          border-radius: 50%;
          border: 3rpx solid #fff;
          transform: translateY(-70rpx) scale(0);
        }
      }

      &.active {
        .bar {
          .icon {
            transform: translate(2rpx, -56rpx);
          }
          .text {
            opacity: 1;
            transform: translateY(20rpx);
          }
          .circle {
						/* #ifndef APP-PLUS-NVUE */
						margin: 0 auto;
						transition: .5s;
						/* #endif */
            transition-delay: .5s;
            transform: translate(2rpx, -56rpx) scale(1);
          }
        }
      }
    }
  }
}

.indicator {
  position: absolute;
  top: -59%;
  left: 30rpx;
  width: 100rpx;
  height: 100rpx;
  border: 12rpx solid #F8F8F8;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
	/* #ifndef APP-PLUS-NVUE */
	transition: .5s;
	/* #endif */
}

.indicator::before {
	/* #ifndef APP-PLUS-NVUE */
	content: '';
	/* #endif */
  position: absolute;
  top: 59%;
  left: -45rpx;
  width: 50rpx;
  height: 40rpx;
  background: transparent;
  border-top-right-radius: 20px;
  box-shadow: 1px -15rpx 0 #F8F8F8;
}

.indicator::after {
	/* #ifndef APP-PLUS-NVUE */
	content: '';
	/* #endif */
  position: absolute;
  top: 58%;
  right: -49rpx;
  width: 50rpx;
  height: 40rpx;
  background: transparent;
  border-top-left-radius: 40rpx;
  box-shadow: -1px -15rpx 0 #F8F8F8;
}

/* #ifndef APP-PLUS-NVUE */
.custom-tabbar .ul .li:nth-child(1).active~.indicator {
	transform: var(--num);
}

.custom-tabbar .ul .li:nth-child(2).active~.indicator {
	transform: var(--num);
}

.custom-tabbar .ul .li:nth-child(3).active~.indicator {
	transform: var(--num);
}

.custom-tabbar .ul .li:nth-child(4).active~.indicator {
	transform: var(--num);
}

.custom-tabbar .ul .li:nth-child(5).active~.indicator {
	transform: var(--num);
}
/* #endif */
</style>