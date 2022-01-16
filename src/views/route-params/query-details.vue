<template>
  <div class="flex justify-center items-center h-full mt-16">
    <a-card :style="{ width: '360px' }" title="通过 query 方式传递参数如下：">
      {{ query }}
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const query = route.query
</script>
