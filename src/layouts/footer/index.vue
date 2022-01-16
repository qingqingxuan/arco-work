<template>
  <a-card class="footer-container card-border-radius" :bordered="false">
    Copyright © {{ projectName }} 2021
  </a-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { projectName } from '../../setting'

  export default defineComponent({
    name: 'Footer',
    setup() {
      return {
        projectName,
      }
    },
  })
</script>

<style lang="less" scoped>
  .footer-container {
    height: @footerHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-top: 1px dashed var(--color-border);
  }
</style>
