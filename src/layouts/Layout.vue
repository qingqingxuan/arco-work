<template>
  <div
    class="vaw-layout-container"
    :class="[state.device === 'mobile' && 'is-mobile', state.theme]"
  >
    <template v-if="state.layoutMode === 'ttb'">
      <VAWHeader />
      <MainLayout :show-nav-bar="false" />
    </template>
    <template v-else-if="state.layoutMode === 'lcr'">
      <TabSplitSideBar />
      <MainLayout />
    </template>
    <template v-else>
      <SideBar />
      <MainLayout />
    </template>
    <div
      v-if="state.device === 'mobile'"
      class="mobile-shadow"
      :class="[state.isCollapse ? 'close-shadow' : 'show-shadow']"
      @click="closeMenu"
    ></div>
  </div>
  <Setting ref="settingRef" />
  <SearchContent ref="searchContentRef" />
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
  import { DeviceType } from '../types/store'
  import { useLayoutStore } from './index'
  import useEmit from '@/hooks/useEmit'
  import { AxiosResponse } from 'axios'
  import UserTokenExpiredInterceptor from '@/api/interceptors/UserTokenExpiredInterceptor'
  import useAxios from '@/hooks/useAxios'
  export default defineComponent({
    name: 'Layout',
    setup() {
      const settingRef = ref()
      const searchContentRef = ref()
      const store = useLayoutStore()
      const isShowHeader = computed(() => store?.isShowHeader())
      const emitter = useEmit()
      const axios = useAxios()
      axios.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
        return UserTokenExpiredInterceptor(response, store)
      })
      emitter?.on('show-setting', () => {
        settingRef.value?.openDrawer()
      })
      emitter?.on('show-search', () => {
        searchContentRef.value?.show()
      })
      onMounted(() => {
        handleScreenResize()
        window.addEventListener('resize', handleScreenResize)
      })
      onBeforeUnmount(() => {
        window.removeEventListener('resize', handleScreenResize)
      })
      function handleScreenResize() {
        const width = document.body.clientWidth
        if (width <= 768) {
          store?.changeDevice(DeviceType.MOBILE)
          store?.toggleCollapse(true)
        } else if (width < 992 && width > 768) {
          store?.changeDevice(DeviceType.PAD)
          store?.toggleCollapse(true)
        } else if (width < 1200 && width >= 992) {
          store?.changeDevice(DeviceType.PC)
          store?.toggleCollapse(false)
        } else {
          store?.changeDevice(DeviceType.PC)
          store?.toggleCollapse(false)
        }
      }
      function closeMenu() {
        store?.toggleCollapse(true)
      }
      return {
        settingRef,
        searchContentRef,
        state: store?.state,
        isShowHeader,
        closeMenu,
      }
    },
  })
</script>

<style lang="less">
  .vaw-layout-container {
    height: 100%;
    max-width: 100%;
    overflow-x: hidden;
    .mobile-shadow {
      display: none;
    }
    .layout-mode-ttb {
      margin-top: @logoHeight;
      transition: all @transitionTime;
    }
  }
  .is-mobile {
    .mobile-shadow {
      background-color: #000000;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 997;
    }
    .close-shadow {
      display: none;
    }
    .show-shadow {
      display: block;
      opacity: 0.5;
      transition: all @transitionTime;
    }
  }
</style>
