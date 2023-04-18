<template>
  <div class="default-route-contianer">
    <a-spin dot />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { omit } from 'lodash-es'

  export default defineComponent({
    setup() {
      const router = useRouter()
      const route = useRoute()
      onMounted(() => {
        router.removeRoute('defaultRouteName')
        router.replace({ ...omit(route, 'name') })
      })
      return {}
    },
  })
</script>

<style>
  .default-route-contianer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
