<template>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="item of breadcrumbs" :key="item.key">
      {{ item.label }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script lang="ts">
  import { RouteRecordRawWithHidden } from '@/types/store'
  import { isExternal } from '@/utils'
  import { defineComponent, onMounted, reactive, watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useLayoutStore } from '..'
  interface DropItem {
    label: string
    key: string
    children?: DropItem[]
  }
  export default defineComponent({
    name: 'Breadcrumb',
    setup() {
      const breadcrumbs = reactive<Array<DropItem>>([])
      const route = useRoute()
      const router = useRouter()
      const store = useLayoutStore()
      function handlePath(path: string) {
        return path.split('/').reduce((pre: string[], cur: string) => {
          if (cur) {
            const lastItem = pre[pre.length - 1]
            if (lastItem) {
              pre.push(lastItem + '/' + cur)
            } else {
              pre.push('/' + cur)
            }
          }
          return pre
        }, [])
      }
      function generatorDropdown(
        routes: Array<RouteRecordRawWithHidden> | undefined,
        parentPath = '/'
      ) {
        if (!routes) return
        const tempArray: DropItem[] = []
        routes.forEach((it) => {
          if (it && it.meta) {
            const tempItem: DropItem = {
              label: it.meta?.title as string,
              key: isExternal(it.path)
                ? it.path
                : it.path.startsWith('/')
                ? it.path
                : parentPath + '/' + it.path,
              children: [],
            }
            if (it.children && it.children.length > 0) {
              tempItem.children = generatorDropdown(it.children, tempItem.key)
            } else {
              delete tempItem.children
            }
            tempArray.push(tempItem)
          }
        })
        return tempArray
      }
      function findRoute(paths: string[]) {
        const selectRoutes: Array<RouteRecordRawWithHidden> = []
        let tempOrigin = store.state.permissionRoutes
        paths.forEach((it) => {
          const selectRoute = tempOrigin.find((pIt) => pIt.path === it)
          if (selectRoute) {
            tempOrigin = selectRoute.children as []
            selectRoutes.push(selectRoute as RouteRecordRawWithHidden)
          }
        })
        return selectRoutes
      }
      function generatorBreadcrumb() {
        breadcrumbs.length = 0
        const matchedPath = route.matched.map((it) => {
          return {
            label: (it.meta ? it.meta.title || '' : '') as string,
            key: it.path,
          }
        })
        breadcrumbs.push(...matchedPath)
        // const findedRoutes = findRoute(handlePath(route.path))
        // const aa = generatorDropdown(findedRoutes)
        // if (aa) {
        //   breadcrumbs.push(...aa)
        // }
      }
      function handleSelect(key: string) {
        router.push(key)
      }
      onMounted(() => {
        generatorBreadcrumb()
      })
      watch(
        () => route.path,
        () => {
          if (
            route.path.startsWith('/redirect') ||
            ['/login', '/404', '/405', '/403'].includes(route.path)
          )
            return
          generatorBreadcrumb()
        }
      )
      return {
        breadcrumbs,
        handleSelect,
      }
    },
  })
</script>
