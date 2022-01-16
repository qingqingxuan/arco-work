<template>
  <div id="tableHeaderContainer" class="relative" :style="{ zIndex: 9 }">
    <a-card
      :title="title"
      size="small"
      :header-style="{ borderBottom: '0px' }"
      :bodyStyle="{ padding: '0px' }"
      :bordered="isBordered"
    >
      <template #extra>
        <a-space>
          <slot name="table-config"></slot>
          <a-tooltip content="展开筛选条件" class="ml-2 mr-2" trigger="hover" v-if="showFilter">
            <a-button type="primary" size="small" @click="showSearchContent = !showSearchContent">
              <template #icon>
                <icon-filter />
              </template>
              筛选条件
            </a-button>
          </a-tooltip>
          <slot name="top-right"></slot>
        </a-space>
      </template>
      <a-drawer
        v-model:visible="showSearchContent"
        placement="top"
        popup-container="#tableHeaderContainer"
        title="搜索条件"
        :height="searchContentHeight"
      >
        <slot name="search-content"></slot>
        <template #footer>
          <a-space>
            <a-button status="danger" size="small" @click="doResetSearch">重置</a-button>
            <a-button type="primary" size="small" @click="doSearch">搜索</a-button>
          </a-space>
        </template>
      </a-drawer>
    </a-card>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'

  export default defineComponent({
    name: 'TableHeader',
    props: {
      title: {
        type: String,
        default: '基本操作',
      },
      showFilter: {
        type: Boolean,
        default: true,
      },
      searchContentHeight: {
        type: String,
        default: '300px',
      },
      bordered: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['search', 'reset-search'],
    setup(props, { emit }) {
      const showSearchContent = ref(false)
      const target = ref<HTMLElement | null>(null)
      const isBordered = computed(() => props.bordered)
      onMounted(() => {
        nextTick(() => {
          target.value = document.getElementById('tableHeaderContainer')
        })
      })
      function doSearch() {
        showSearchContent.value = false
        emit('search')
      }
      function doResetSearch() {
        emit('reset-search')
      }
      return {
        isBordered,
        showSearchContent,
        target,
        doSearch,
        doResetSearch,
      }
    },
  })
</script>
<style lang="less" scoped>
  :deep(.arco-drawer-footer) {
    border-bottom: 2px solid #f5f5f5;
  }
</style>
