<template>
  <div
    class="vaw-tab-split-side-bar-wrapper"
    :class="[!state.isCollapse ? 'open-status' : 'close-status', bgColor]"
  >
    <div class="tab-split-tab-wrapper">
      <Logo class="tab-split-logo-wrapper" :show-title="false" />
      <Scrollbar class="tab-split-slidebar__wrapper">
        <div class="tab-split-content-wrapper">
          <div
            v-for="item of tabs"
            :key="item.fullPath"
            class="label-item-wrapper"
            :class="{ 'vaw-tab-split-item-is-active': item.checked.value }"
            @click="changeTab(item)"
          >
            <component :is="item.icon || 'icon-menu'" style="font-size: 18px" />
            <span class="title">{{ item.label }}</span>
          </div>
        </div>
      </Scrollbar>
    </div>
    <div class="tab-split-menu-wrapper">
      <Logo class="tab-split-logo-wrapper" :show-logo="false" />
      <ScrollerMenu :routes="routes" />
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref, shallowReactive, watch } from 'vue'
  import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
  import { RouteRecordRawWithHidden, SplitTab } from '../../types/store'
  import { isExternal, transformSplitTabMenu } from '../../utils'
  import { useLayoutStore } from '..'
  import { IconMenu } from '@arco-design/web-vue/es/icon'
  export default defineComponent({
    name: 'TabSplitSideBar',
    components: { IconMenu },
    props: {
      showLogo: {
        type: Boolean,
        default: true,
      },
    },
    setup() {
      const store = useLayoutStore()
      const tabs = shallowReactive([] as Array<SplitTab>)
      const routes = shallowReactive([] as Array<RouteRecordRawWithHidden>)
      const route = useRoute()
      const router = useRouter()
      watch(
        () => route.fullPath,
        () => {
          doChangeTab(route)
        }
      )
      onMounted(() => {
        tabs.length = 0
        tabs.push(...transformSplitTabMenu(store?.getSplitTabs()))
        doChangeTab(route)
      })
      function doChangeTab(route: RouteLocationNormalizedLoaded) {
        const matchedRoutes = route.matched
        if (matchedRoutes && matchedRoutes.length > 0) {
          tabs.forEach((it) => {
            if (it.fullPath === matchedRoutes[0].path) {
              it.checked.value = true
              if (it.children) {
                routes.length = 0
                routes.push(...(it.children as Array<RouteRecordRawWithHidden>))
              }
            } else {
              it.checked.value = false
            }
          })
        }
      }
      function changeTab(item: SplitTab) {
        tabs.forEach((it) => {
          it.checked.value = it.fullPath === item.fullPath
        })
        findPath(item)
      }
      function findPath(item: SplitTab) {
        if (item.children && item.children.length > 0) {
          const firstItem = item.children[0]
          if (firstItem.children && firstItem.children.length > 0) {
            findPath({
              label: firstItem.meta?.title,
              iconPrefix: firstItem.meta?.iconPrefix,
              icon: firstItem.meta?.icon,
              fullPath: firstItem.fullPath,
              children: firstItem.children,
              checked: ref(false),
            } as SplitTab)
          } else {
            if (isExternal(firstItem.fullPath as string)) {
              routes.length = 0
              routes.push(...(item.children as Array<RouteRecordRawWithHidden>))
              window.open(firstItem.fullPath)
            } else {
              router.push(firstItem.fullPath || '/').then((error) => {
                if (error) {
                  if (firstItem.fullPath === route.path || firstItem.fullPath === route.fullPath) {
                    routes.length = 0
                    routes.push(...(item.children as Array<RouteRecordRawWithHidden>))
                  }
                }
              })
            }
          }
        }
      }
      const bgColor = computed(() => {
        if (store.state.sideBarBgColor === 'image') {
          return 'sidebar-bg-img'
        } else if (store.state.sideBarBgColor === 'dark') {
          return 'sidebar-bg-dark'
        } else {
          return 'sidebar-bg-light'
        }
      })
      return {
        state: store?.state,
        tabs,
        routes,
        changeTab,
        findPath,
        bgColor,
      }
    },
  })
</script>

<style>
  .tab-split-slidebar__wrapper {
    height: calc(100% - 48px) !important;
  }
</style>

<style scoped lang="less">
  @--primary-color: #1890ff;
  @--dark-color: #000c16;
  .sidebar-bg-img {
    background-image: url('../../assets/bg_img.webp') !important;
    background-size: cover;
    :deep(.ant-menu) {
      background: transparent !important;
    }
    :deep(.logo-wrapper .logo-title) {
      color: #fff !important;
    }
    .tab-split-tab-wrapper {
      .label-item-wrapper {
        color: #fff;
      }
    }
  }
  .sidebar-bg-dark {
    :deep(.logo-wrapper .logo-title) {
      color: #fff !important;
    }
    .tab-split-tab-wrapper {
      background-color: @--dark-color;
      .label-item-wrapper {
        color: #fff;
      }
    }
  }
  .sidebar-bg-light {
    background-color: #fff;
    .tab-split-tab-wrapper {
      background-color: #f5f5f5;
      .label-item-wrapper {
        color: #333;
      }
      .vaw-tab-split-item-is-active {
        color: #fff;
      }
    }
  }
  .light .sidebar-bg-dark {
    background-color: @--dark-color;
  }
  .dark .sidebar-bg-dark {
    :deep(.ant-menu) {
      background: transparent !important;
    }
  }
  .open-status {
    width: @menuWidth;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.12);
    transition: all @transitionTime;
  }
  .close-status {
    width: @minMenuWidth;
    box-shadow: none;
    transition: all @transitionTime;
  }
  .vaw-tab-split-side-bar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    height: 100vh;
    box-sizing: border-box;
    z-index: 999;
    .tab-split-tab-wrapper {
      position: relative;
      top: 0;
      left: 0;
      width: @tabSplitMenuWidth;
      min-width: @tabSplitMenuWidth;
      max-width: @tabSplitMenuWidth;
      overflow: hidden;
      height: 100vh;
      box-sizing: border-box;
      .tab-split-logo-wrapper {
        max-width: @tabSplitMenuWidth;
        min-width: @tabSplitMenuWidth;
      }
      .tab-split-content-wrapper {
        position: relative;
        .after {
          content: '';
          position: absolute;
          left: 5px;
          top: 5px;
          right: 5px;
          bottom: 5px;
          border-radius: 3px;
          z-index: -1;
        }
        .label-item-wrapper {
          position: relative;
          min-height: @logoHeight * 1.2;
          padding: 10px 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          z-index: 1;
          .title {
            display: inline-block;
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            font-size: 12px;
            line-height: 14px;
            margin-top: 5px;
          }
          &:hover {
            cursor: pointer;
          }
          &::after {
            .after;
          }
        }
        .label-item-wrapper:hover::after {
          background-color: @--primary-color;
        }
        .vaw-tab-split-item-is-active::after {
          background-color: @--primary-color;
          .after;
        }
      }
    }
    .tab-split-menu-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: @tabSplitMenuWidth;
      overflow-x: hidden;
    }
    .vaw-menu-wrapper {
      overflow-x: hidden;
      color: white;
    }
  }
  .is-mobile {
    .open-status {
      width: @menuWidth;
      transform: translateX(0);
      transition: transform @transitionTime;
    }
    .close-status {
      width: @menuWidth;
      transform: translateX(calc(@menuWidth * -1));
      transition: transform @transitionTime;
      box-shadow: none;
    }
  }
</style>
