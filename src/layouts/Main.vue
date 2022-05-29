<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="appStore.pageAnim + '-transform'" mode="out-in" appear>
      <keep-alive :include="cachedViews">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
  import useAppConfigStore from '@/store/modules/app-config'
  import { computed, defineComponent } from 'vue'
  import { useRoute } from 'vue-router'
  import store from '../store'
  export default defineComponent({
    name: 'Main',
    setup() {
      const state = store.state
      const appStore = useAppConfigStore()
      const route = useRoute()
      const cachedViews = computed(() => {
        return state.cachedView.map((it) => it)
      })
      return {
        appStore,
        cachedViews,
      }
    },
  })
</script>
