<template>
  <div class="logo-wrapper">
    <img v-if="showLogo" class="logo-img" src="../../assets/logo.png" />
    <div v-if="showTitle" :class="[!state.isCollapse || alwaysShow ? 'show-title' : 'close-title']">
      <span class="logo-title">{{ projectName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useLayoutStore } from '../index'
  import { projectName } from '../../setting'
  export default defineComponent({
    name: 'Logo',
    props: {
      showTitle: {
        type: Boolean,
        default: true,
      },
      showLogo: {
        type: Boolean,
        default: true,
      },
      alwaysShow: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const store = useLayoutStore()
      const bgColor = computed(() => {
        if (store.state.theme === 'dark') {
          return 'var(--color-menu-dark-bg)'
        }
        if (store.state.theme === 'light') {
          if (store.state.layoutMode !== 'ttb') {
            switch (store.state.sideBarBgColor) {
              case 'light':
                return 'var(--color-white)'
              case 'dark':
                return 'var(--color-menu-dark-bg)'
              case 'image':
                return 'transparent'
            }
          }
          return 'var(--color-white)'
        }
      })
      return {
        state: store?.state,
        projectName,
        bgColor,
      }
    },
  })
</script>
<style lang="less" scoped>
  .logo-wrapper {
    height: @logoHeight;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px dashed var(--color-border);
    background-color: v-bind(bgColor);
    .logo-img {
      width: 30px;
    }
    .logo-title {
      font-weight: bold;
    }
    .show-title {
      transform: scale(1);
      width: auto;
      transition: transform 0.2s ease-in;
    }
    .close-title {
      transform: scale(0);
      width: 0;
    }
  }
</style>
