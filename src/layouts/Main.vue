<template>
  <router-view v-slot="{ Component }">
    <transition :name="state.pageAnim + '-transform'" mode="out-in" appear>
      <keep-alive :include="cachedViews">
        <component :is="Component" :key="routeKey" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
  import { computed, defineComponent, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import store from '../store'
  export default defineComponent({
    name: 'Main',
    setup() {
      const state = store.state
      const route = useRoute()
      const routeKey = ref(route.fullPath)
      const cachedViews = computed(() => {
        return state.cachedView.map((it) => it)
      })
      watch(
        () => route.fullPath,
        () => {
          routeKey.value = route.fullPath
        }
      )
      return {
        routeKey,
        state,
        cachedViews,
      }
    },
  })
</script>
