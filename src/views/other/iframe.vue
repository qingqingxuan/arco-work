<template>
  <iframe
    ref="myFrame"
    src="http://qingqingxuan.gitee.io/work-p-site"
    width="100%"
    :height="height + 'px'"
    frameborder="0"
  ></iframe>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'

  const myFrame = ref<HTMLIFrameElement>()
  const height = ref(0)
  onMounted(() => {
    height.value = myFrame.value!.parentElement!.clientHeight
  })
</script>
