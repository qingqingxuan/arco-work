<template>
  <span
    class="fold-wrapper"
    :class="[state.isCollapse ? 'fold-close-status' : 'fold-open-status']"
    @click="toggleFold"
  >
    <MenuFoldOutlined />
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useLayoutStore } from '../index'
  import { IconMenuFold as MenuFoldOutlined } from '@arco-design/web-vue/es/icon'
  export default defineComponent({
    name: 'Humburger',
    components: { MenuFoldOutlined },
    setup() {
      const store = useLayoutStore()
      function toggleFold() {
        store?.toggleCollapse(!store.state.isCollapse)
      }
      return {
        state: store?.state,
        toggleFold,
      }
    },
  })
</script>

<style lang="less" scoped>
  .fold-open-status {
    transform: rotate(180deg);
  }
  .fold-close-status {
    transform: rotate(0);
  }
  .fold-wrapper {
    box-sizing: border-box;
    display: inline-flex;
    line-height: @logoHeight;
    text-align: center;
    padding: 0 10px;
    font-size: 18px;
    transition: transform @transitionTime;
  }
  .fold-wrapper:hover {
    color: #999999;
    cursor: pointer;
  }
</style>
