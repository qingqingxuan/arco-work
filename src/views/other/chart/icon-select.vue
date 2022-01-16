<template>
  <a-card title="图标选择器">
    <div class="flex justify-center items-center flex-col">
      <IconSelector v-model:value="icon" />
      <div class="mt-4">
        <span>通过 v-model 双向绑定值</span>
        <component v-if="icon" :is="icon" />
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const icon = ref('')
</script>
