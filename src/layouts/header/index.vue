<template>
  <div class="vaw-header-layout">
    <div class="logo-wrapper">
      <Logo :always-show="true" :showTitle="false" />
    </div>
    <div class="menu-wrapper">
      <ScrollerMenu :routes="routes" mode="horizontal" />
    </div>
    <a-card
      class="right-wrapper"
      :body-style="{ padding: 0, height: '100%' }"
      :header-style="{ padding: 0 }"
      :bordered="false"
    >
      <div class="flex justify-end items-center h-full">
        <template v-if="state.device !== 'mobile'">
          <ActionItems />
        </template>
        <div class="avatar-wrapper">
          <VAWavatar />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useLayoutStore } from '../index'
  export default defineComponent({
    name: 'VAWHeader',
    setup() {
      const store = useLayoutStore()
      const routes = computed(() => {
        return store?.state.permissionRoutes.filter((it) => !!it.name)
      })
      return {
        state: store?.state,
        routes,
      }
    },
  })
</script>

<style scoped lang="less">
  .vaw-header-layout {
    height: @logoHeight;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-bottom: 1px solid var(--color-border);
    .logo-wrapper {
      width: calc(@menuWidth / 3);
    }
    .menu-wrapper {
      flex: 1;
      overflow: hidden;
      :deep(.arco-menu-horizontal .arco-menu-inner) {
        overflow: hidden;
        padding: 9px 10px 8px 10px;
      }
      :deep(.arco-menu-selected-label) {
        bottom: -8px;
        height: 2px;
      }
    }
    .right-wrapper {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .avatar-wrapper {
        padding-right: 15px;
        margin-left: 10px;
      }
    }
  }
</style>
