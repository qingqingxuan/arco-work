<template>
  <div
    class="vaw-main-layout-container scrollbar"
    :class="[
      appStore.isCollapse ? 'main-layout-close-status' : 'main-layout-open-status',
      appStore.isFixedNavBar ? 'main-layout_fixed-nav-bar' : 'main-layout',
      !appStore.isFixedNavBar
        ? 'main-layout_padding-top__0'
        : isShowTabbar
        ? 'main-layout_padding-top__all'
        : 'main-layout_padding-top__logo',
    ]"
  >
    <section
      :class="[
        appStore.layoutMode == 'ttb'
          ? 'nav-bar-open-status__ttb'
          : !appStore.isCollapse
          ? 'nav-bar-open-status'
          : 'nav-bar-close-status',
        appStore.isFixedNavBar ? 'fixed-nav-bar' : '',
        !showNavBar ? 'tab-bar-top' : '',
      ]"
    >
      <NavBar v-if="showNavBar" />
      <TabBar v-show="isShowTabbar" />
    </section>
    <component
      :is="appStore.isFixedNavBar ? 'Scrollbar' : 'div'"
      class="main-base-style"
      :class="[appStore.theme === 'light' ? 'main-base-light-theme' : 'main-base-dark-theme']"
    >
      <section
        class="main-section"
        :class="[appStore.flexMainHeight ? 'flex-height' : 'min-height']"
      >
        <Main />
      </section>
      <section class="footer-wrapper">
        <Footer />
      </section>
      <a-back-top target-container=".main-base-style" />
    </component>
    <a-back-top target-container=".vaw-main-layout-container" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useTitle } from '@vueuse/core'
  import { projectName } from '@/setting'
  import useAppConfigStore from '@/store/modules/app-config'
  export default defineComponent({
    name: 'MainLayout',
    props: {
      showNavBar: {
        type: Boolean,
        default: true,
      },
    },
    setup() {
      const appStore = useAppConfigStore()
      const isShowTabbar = computed(() => true)
      const router = useRouter()
      const route = useRoute()
      router.afterEach(() => {
        useTitle(projectName + ' | ' + (route.meta.title as string))
      })
      onMounted(() => {
        const mainEl = document.querySelector('.main-section') as HTMLDivElement
        appStore.setMainHeight(mainEl.clientHeight || mainEl.offsetHeight)
      })
      return {
        appStore,
        isShowTabbar,
      }
    },
  })
</script>

<style lang="less" scoped>
  .scrollbar::-webkit-scrollbar {
    width: 0;
  }
  .main-layout-open-status {
    margin-left: @menuWidth;
  }
  .main-layout-close-status {
    margin-left: @minMenuWidth;
  }
  .nav-bar-open-status.fixed-nav-bar {
    width: calc(100% - @menuWidth);
  }
  .nav-bar-close-status.fixed-nav-bar {
    width: calc(100% - @minMenuWidth);
  }
  .nav-bar-open-status__ttb {
    width: 100%;
  }
  :deep(.main-base-style .scrollbar__view) {
    height: 100%;
  }

  .main-layout {
    overflow-y: auto;
  }
  .main-layout_fixed-nav-bar {
    overflow-y: hidden;
    .main-base-style {
      overflow-y: auto;
    }
  }

  .main-layout_padding-top__0 {
    padding-top: 0;
  }

  .main-layout_padding-top__all {
    padding-top: calc(@logoHeight + @tabHeight);
  }

  .main-layout_padding-top__logo {
    padding-top: @logoHeight;
  }

  .vaw-main-layout-container {
    height: 100%;
    box-sizing: border-box;
    transition: margin-left @transitionTime;
    .main-base-style {
      height: 100%;
      box-sizing: border-box;
      padding: 5px;
    }
    .main-base-light-theme {
      // background-color: #f0f2f5;
      background-image: linear-gradient(#f0f2f5, rgba(var(--primary-1), 0.1), #f0f2f5);
    }
    .main-base-dark-theme {
      background-color: #333333;
    }
    .main-section {
      overflow-x: hidden;
    }
    .flex-height {
      height: calc(100% - @footerHeight - 10px);
    }
    .min-height {
      min-height: calc(100% - @footerHeight - 10px);
    }
    .fixed-nav-bar {
      position: fixed;
      top: 0;
      transition: width @transitionTime;
      z-index: 99;
    }
    .tab-bar-top {
      padding-top: @logoHeight;
    }
  }
  .footer-wrapper {
    margin-top: 6px;
  }
  .is-mobile {
    .main-layout-open-status,
    .main-layout-close-status {
      margin-left: 0;
      transition: none;
    }
    .nav-bar-open-status,
    .nav-bar-close-status {
      width: 100%;
    }
  }
</style>
