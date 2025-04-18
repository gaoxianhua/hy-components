<template>
  <hy-upload
      :fileList="list"
      @afterRead="afterRead"
      name="1"
      multiple
      :maxCount="1"
  ></hy-upload>
</template>

<script setup lang="ts">
import {HyUpload} from "hfyk-app";
import type {FileVo} from "hfyk-app/components/hy-upload/typing"
import { ref } from "vue";

const list = ref<FileVo>([
  {
    status: "success",
    message: "上传中",
    url: "https://img0.baidu.com/it/u=3196617431,1263013381&fm=253"
  }
]);

const afterRead = (event: any) => {
  let lists = event.file;
  let a = 0;
  list.value.push({
    status: "loading",
    message: "上传中",
    url: lists[0].url,
    schedule: a
  });
  const timer = setInterval(() => {
    a += 10;
    list.value[0].schedule = a;
  }, 200);
  setTimeout(() => {
    clearInterval(timer);
    list.value = [
      {
        status: "success",
        message: "上传成功",
        url: lists[0].url,
        schedule: 50
      }
    ];
  }, 3000);
}
</script>


<style scoped lang="scss">

</style>
