<template>
  <div class="water-mark"></div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useLayoutStore } from '..'
  const store = useLayoutStore()
  const waterMark = computed(
    () =>
      `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' font-size='12' fill='%23${
        store.state.theme === 'dark' ? '6d6f72' : 'a2a9b6'
      }' font-family='system-ui, sans-serif' text-anchor='middle' dominant-baseline='middle' transform='rotate(-45, 100 100)' %3E${
        store.state.waterMark
      }%3C/text%3E%3C/svg%3E")`
  )
  const display = computed(() => {
    return store.state.isOpenWaterMark ? 'block' : 'none'
  })
</script>
<style scoped>
  .water-mark {
    display: v-bind(display);
    width: 100vw;
    height: 100vw;
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: v-bind(waterMark);
  }
</style>
