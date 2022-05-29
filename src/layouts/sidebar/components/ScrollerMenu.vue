<template>
  <component :is="tag">
    <a-menu
      :mode="menuMode"
      :theme="theme"
      :collapsed="appStore.isCollapse"
      v-model:selectedKeys="defaultPath"
      v-model:openKeys="defaultExpandKeys"
      @menu-item-click="onMenuClick"
    >
      <template v-for="item of menuOptions" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <component :is="item.icon || 'icon-menu'" />
            </template>
            {{ item.label }}
          </a-menu-item>
        </template>
        <template v-else>
          <SubMenu :key="item.key" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </component>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    PropType,
    ref,
    shallowReactive,
    watch,
    watchEffect,
  } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { RouteRecordRawWithHidden } from '../../../types/store'
  import { isExternal, transfromMenu } from '../../../utils'
  import useAppConfigStore from '@/store/modules/app-config'
  import { LayoutMode, SideTheme, ThemeMode } from '@/store/types'

  export default defineComponent({
    name: 'ScrollerMenu',
    props: {
      routes: {
        type: Object as PropType<Array<RouteRecordRawWithHidden>>,
        require: true,
        default: () => [],
      },
      mode: {
        type: String as PropType<'vertical' | 'pop' | 'horizontal' | 'popButton' | undefined>,
        default: 'vertical',
      },
    },
    setup(props) {
      const appStore = useAppConfigStore()
      const menuOptions = shallowReactive([] as Array<any>)
      const defaultPath = ref([] as Array<string>)
      const defaultExpandKeys = ref([] as Array<string>)
      const menuMode = computed(() => props.mode)
      const currentRoute = useRoute()
      const router = useRouter()
      defaultPath.value.push(currentRoute.fullPath)
      const tag = ref(menuMode.value === 'vertical' ? 'Scrollbar' : 'div')
      const theme = computed(() => {
        if (appStore.theme === ThemeMode.DARK) {
          return 'dark'
        }
        if (appStore.layoutMode === LayoutMode.TTB) {
          return 'light'
        }
        return appStore.sideTheme === SideTheme.IMAGE
          ? 'dark'
          : appStore.sideTheme === SideTheme.WHITE
          ? 'light'
          : 'dark'
      })
      handleExpandPath()
      function handleMenu(routes?: Array<RouteRecordRawWithHidden>) {
        menuOptions.length = 0
        const tempMenus = transfromMenu(routes || [])
        menuOptions.push(...tempMenus)
      }
      function handleExpandPath() {
        const paths = currentRoute.fullPath.split('/')
        paths.forEach((it) => {
          if (it && !defaultExpandKeys.value.includes('/' + it)) {
            defaultExpandKeys.value.push('/' + it)
          }
        })
      }
      function onMenuClick(key: string) {
        if (isExternal(key)) {
          window.open(key)
        } else {
          router.push(key)
          if (appStore.deviceType === 'mobile') {
            appStore.toggleCollapse(true)
          }
        }
      }
      watch(
        () => currentRoute.fullPath,
        (newVal) => {
          defaultPath.value.length = 0
          defaultPath.value.push(newVal)
          handleExpandPath()
        }
      )
      watch(
        () => props.mode,
        (newVal) => {
          newVal === 'vertical' ? 'Scrollbar' : 'div'
        }
      )
      watchEffect(() => {
        handleMenu(props.routes)
      })
      return {
        appStore,
        tag,
        theme,
        menuMode,
        defaultPath,
        defaultExpandKeys,
        menuOptions,
        onMenuClick,
      }
    },
  })
</script>

<style lang="less" scoped>
  :deep(.arco-menu-collapsed) {
    margin: 0 auto;
  }
  :deep(.arco-menu-vertical .arco-menu-item) {
    max-height: 40px;
  }
  .scrollbar {
    height: calc(100vh - @logoHeight) !important;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
</style>
