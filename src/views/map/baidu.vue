<template>
  <div ref="container" :style="{ height: height + 'px', width: '100%' }"></div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue'
  import { useScriptTag } from '@vueuse/core'

  const SCRIPT_URL =
    'http://api.map.baidu.com/getscript?v=3.0&ak=WxbQmaOc3bvSGSaKWcyeFSf8fnYCWpKd&services=&t=' +
    new Date().getTime()
  export default defineComponent({
    setup() {
      const container = ref<HTMLDivElement | null>(null)
      const height = ref(0)
      onMounted(async () => {
        const { load } = useScriptTag(SCRIPT_URL, () => {}, {
          manual: true,
        })
        await load()
        height.value = container.value?.parentElement?.getBoundingClientRect().height || 0
        const bMap = (window as any).BMap
        const map = new bMap.Map(container.value)
        const point = new bMap.Point(116.404, 39.915)
        map.centerAndZoom(point, 7)
        map.enableScrollWheelZoom()
        map.setMapStyleV2({ styleId: 'ea4652613f3629247d47666706ce7e89' })
      })
      return { container, height }
    },
  })
</script>
