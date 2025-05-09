<template>
  <view class="u-form">
    <slot />
  </view>
</template>

<script setup>
// import { props } from "./props.js";
import Schema from "./schema";
import { getProperty, setProperty } from "./utils";
import { deepClone, error } from "../../utils";
import {
  ref,
  defineProps,
  computed,
  onMounted,
  watch,
  nextTick,
  inject
} from "vue";

// 去除警告信息
Schema.warning = function () {};

/**
 * Form 表单
 * @description 此组件一般用于表单场景，可以配置Input输入框，Select弹出框，进行表单验证等。
 * @tutorial https://ijry.github.io/uview-plus/components/form.html
 * @property {Object}						model			当前form的需要验证字段的集合
 * @property {Object | Function | Array}	rules			验证规则
 * @property {String}						errorType		错误的提示方式，见上方说明 ( 默认 message )
 * @property {Boolean}						borderBottom	是否显示表单域的下划线边框   ( 默认 true ）
 * @property {String}						labelPosition	表单域提示文字的位置，left-左侧，top-上方 ( 默认 'left' ）
 * @property {String | Number}				labelWidth		提示文字的宽度，单位px  ( 默认 45 ）
 * @property {String}						labelAlign		lable字体的对齐方式   ( 默认 ‘left' ）
 * @property {Object}						labelStyle		lable的样式，对象形式
 * @example <up-formlabelPosition="left" :model="model1" :rules="rules" ref="form1"></up-form>
 */

import defProps from "./form";
const props = defineProps({
  // 当前form的需要验证字段的集合
  model: {
    type: Object,
    default: () => defProps.form.model
  },
  // 验证规则
  rules: {
    type: [Object, Function, Array],
    default: () => defProps.form.rules
  },
  // 有错误时的提示方式，message-提示信息，toast-进行toast提示
  // border-bottom-下边框呈现红色，none-无提示
  errorType: {
    type: String,
    default: () => defProps.form.errorType
  },
  // 是否显示表单域的下划线边框
  borderBottom: {
    type: Boolean,
    default: () => defProps.form.borderBottom
  },
  // label的位置，left-左边，top-上边
  labelPosition: {
    type: String,
    default: () => defProps.form.labelPosition
  },
  // label的宽度，单位px
  labelWidth: {
    type: [String, Number],
    default: () => defProps.form.labelWidth
  },
  // lable字体的对齐方式
  labelAlign: {
    type: String,
    default: () => defProps.form.labelAlign
  },
  // lable的样式，对象形式
  labelStyle: {
    type: Object,
    default: () => defProps.form.labelStyle
  }
});

// 响应式数据
const formRules = ref({});
const validator = ref(null);
const originalModel = ref(null);
const children = ref([]);

const formItemRef = inject("formItemRef");

// 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
const setRules = (rules) => {
  // 判断是否有规则
  if (Object.keys(rules).length === 0) return;
  if (
    process.env.NODE_ENV === "development" &&
    Object.keys(props.model).length === 0
  ) {
    error("设置rules，model必须设置！如果已经设置，请刷新页面。");
    return;
  }
  formRules.value = rules;
  // 重新将规则赋予Validator
  validator.value = new Schema(rules);
};

// 监听规则的变化
watch(
  () => props.rules,
  (n) => {
    setRules(n);
  },
  { immediate: true }
);

// 监听属性的变化，通知子组件u-form-item重新获取信息
const propsChange = computed(() => {
  return [
    props.errorType,
    props.borderBottom,
    props.labelPosition,
    props.labelWidth,
    props.labelAlign,
    props.labelStyle
  ];
});

watch(propsChange.value, (n) => {
  if (children.value?.length) {
    children.value.forEach((child) => {
      // 判断子组件(u-form-item)如果有updateParentData方法的话，就就执行(执行的结果是子组件重新从父组件拉取了最新的值)
      typeof child.updateParentData === "function" && child.updateParentData();
    });
  }
});

// 监听model的初始值作为重置表单的快照
watch(
  () => props.model,
  (n) => {
    if (!originalModel.value) {
      originalModel.value = deepClone(n);
    }
  },
  { immediate: true }
);

// 清空所有u-form-item组件的内容，本质上是调用了u-form-item组件中的resetField()方法
const resetFields = () => {
  resetModel();
};

// 重置model为初始值的快照
const resetModel = (obj) => {
  // 历遍所有u-form-item，根据其prop属性，还原model的原始快照
  children.value.forEach((child) => {
    const prop = child?.prop;
    const value = getProperty(originalModel.value, prop);
    setProperty(props.model, prop, value);
  });
};

// 清空校验结果
const clearValidate = (props) => {
  props = [].concat(props);
  formItemRef.children.forEach((child) => {
    // 如果u-form-item的prop在props数组中，则清除对应的校验结果信息
    if (props[0] === undefined || props.includes(child.prop)) {
      child.message = null;
    }
  });
};

// 对部分表单字段进行校验
const validateField = async (value, callback, event = null, options) => {
  // $nextTick是必须的，否则model的变更，可能会延后于此方法的执行
  await nextTick();
  // 校验错误信息，返回给回调方法，用于存放所有form-item的错误信息
  const errorsRes = [];
  // 如果为字符串，转为数组
  value = [].concat(value);
  // 历遍children所有子form-item
  const promises = formItemRef.children.map((child) => {
    return new Promise((resolve, reject) => {
      // 用于存放form-item的错误信息
      const childErrors = [];
      if (value.includes(child.prop)) {
        // 获取对应的属性，通过类似'a.b.c'的形式
        const propertyVal = getProperty(props.model, child.prop);
        // 属性链数组
        const propertyChain = child.prop.split(".");
        const propertyName = propertyChain[propertyChain.length - 1];

        let rule = [];
        if (child.itemRules && child.itemRules.length > 0) {
          rule = child.itemRules;
        } else {
          rule = formRules.value[child.prop];
        }
        // 如果不存在对应的规则，直接返回，否则校验器会报错
        if (!rule) {
          resolve();
          return;
        }
        // rule规则可为数组形式，也可为对象形式，此处拼接成为数组
        const rules = [].concat(rule);

        // 对rules数组进行校验
        if (!rules.length) {
          resolve();
        }
        for (let i = 0; i < rules.length; i++) {
          const ruleItem = rules[i];
          // 将u-form-item的触发器转为数组形式
          const trigger = [].concat(ruleItem?.trigger);
          // 如果是有传入触发事件，但是此form-item却没有配置此触发器的话，不执行校验操作
          if (event && !trigger.includes(event)) {
            resolve();
            continue;
          }
          // 实例化校验对象，传入构造规则
          const validator = new Schema({
            [propertyName]: ruleItem
          });
          validator.validate(
            {
              [propertyName]: propertyVal
            },
            (errors, fields) => {
              if (Array.isArray(errors)) {
                errors.forEach((element) => {
                  element.prop = child.prop;
                });
                errorsRes.push(...errors);
                childErrors.push(...errors);
              }
              //没有配置，或者配置了showErrorMsg为true时候，才修改子组件message，默认没有配置
              if (!options || options?.showErrorMsg === true) {
                child.message = childErrors[0]?.message
                  ? childErrors[0].message
                  : null;
              }
              if (i === rules.length - 1) {
                resolve(errorsRes);
              }
            }
          );
        }
      } else {
        resolve({});
      }
    });
  });

  // 使用Promise.all来等待所有Promise完成
  Promise.all(promises)
    .then((results) => {
      // 执行回调函数
      typeof callback === "function" && callback(errorsRes);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
};

// 校验全部数据
const validate = (options) => {
  // 开发环境才提示，生产环境不会提示
  if (
    process.env.NODE_ENV === "development" &&
    Object.keys(formRules.value).length === 0
  ) {
    error("未设置rules，请看文档说明！如果已经设置，请刷新页面。");
    return;
  }
  return new Promise((resolve, reject) => {
    console.log(formItemRef);
    // $nextTick是必须的，否则model的变更，可能会延后于validate方法
    nextTick(() => {
      // 获取所有form-item的prop，交给validateField方法进行校验
      const formItemProps = formItemRef.children.map((item) => item.prop);
      // console.log(formItemProps)
      validateField(
        formItemProps,
        (errors) => {
          if (errors.length) {
            // 如果错误提示方式为toast，则进行提示
            props.errorType === "toast" &&
              uni.showToast({
                title: String(errors[0].message),
                icon: "none"
              });
            reject(errors);
          } else {
            resolve(true);
          }
        },
        null,
        options
      );
    });
  });
};

// 存储当前form下的所有u-form-item的实例
// 不能定义在data中，否则微信小程序会造成循环引用而报错
onMounted(() => {
  children.value = [];
});

// 提供给子组件使用
defineExpose({
  setRules,
  resetFields,
  resetModel,
  clearValidate,
  validateField,
  validate
});
</script>

<style lang="scss" scoped></style>
