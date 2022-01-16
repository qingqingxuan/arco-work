<template>
  <a-popover v-model:visible="visible" trigger="click">
    <template #content>
      <div class="icon-container">
        <a-input-search
          placeholder="搜索图标名称"
          press-enter
          style="width: 100%"
          @search="onSearch"
          allowClear
          search-button
        />
        <div class="mt-4"></div>
        <div class="icon-wrapper">
          <a-row :wrap="true">
            <a-col :span="4" v-for="item of iconNames" :key="item">
              <div
                class="flex justify-center items-center flex-col icon-item"
                @click="onSelectItem(item)"
              >
                <component :is="item" style="font-size: 26px" />
                <div class="label-name">{{ item }}</div>
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="mt-1"></div>
        <a-pagination
          size="mini"
          :pageSize="pageSize"
          :total="total"
          :show-size-changer="false"
          @change="onPageChange"
        />
      </div>
    </template>
    <a-button v-if="!seletedItem" type="primary">请选择图标</a-button>
    <a-button status="success" v-else>
      已选择
      <component :is="seletedItem" />
    </a-button>
  </a-popover>
</template>

<script lang="ts" setup>
  import * as Icons from '@arco-design/web-vue/es/icon'
  import { useClipboard } from '@vueuse/core'
  import { Message } from '@arco-design/web-vue'
  import { ref, watch } from 'vue'
  const emit = defineEmits(['onSelect', 'update:value'])
  const props = defineProps({
    value: {
      type: String,
      default: '',
    },
    enableCopy: {
      type: Boolean,
      default: false,
    },
  })
  const iconList = Object.keys(Icons).filter((it) => it !== 'default')
  const pageSize = 36
  const currentPage = ref(1)
  const iconNames = ref(iconList.slice(0, pageSize))
  const searchList = ref<Array<string>>([])
  const total = ref(iconList.length)
  const visible = ref(false)
  const seletedItem = ref(props.value)
  watch(
    () => props.value,
    (newVal) => {
      seletedItem.value = newVal
    }
  )
  function onPageChange(page: number) {
    currentPage.value = page
    iconNames.value =
      searchList.value.length === 0
        ? iconList.slice((page - 1) * pageSize, page * pageSize)
        : searchList.value.slice((page - 1) * pageSize, page * pageSize)
  }
  function onSearch(searchValue: string) {
    if (searchValue) {
      const temp = searchValue.toLowerCase()
      searchList.value = iconList.filter((it) => {
        return it.toLowerCase().startsWith((temp.startsWith('icon') ? '' : 'icon') + temp)
      })
      total.value = searchList.value.length
      iconNames.value = searchList.value.slice(0, pageSize)
      console.log(iconNames.value)
    } else {
      searchList.value = []
      total.value = iconList.length
      iconNames.value = iconList.slice(
        (currentPage.value - 1) * pageSize,
        currentPage.value * pageSize
      )
    }
  }
  async function onSelectItem(item: string) {
    emit('onSelect', item)
    emit('update:value', item)
    seletedItem.value = item
    visible.value = false
    if (props.enableCopy) {
      const { isSupported, copied, copy } = useClipboard()
      if (isSupported) {
        await copy(`<${item} />`)
        if (copied) {
          Message.success(`已选择并且复制成功 ${item} 图标`)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  :deep(.arco-pagination) {
    justify-content: center;
  }
  .icon-container {
    width: 360px;
    overflow: hidden;
    text-align: center;
    .icon-wrapper {
      min-height: 300px;
      .icon-item {
        height: 60px;
        overflow: hidden;
        text-align: center;
        .label-name {
          width: 70%;
          margin: 0 auto;
          font-size: 12px;
          color: #888;
          margin-top: 5px;
          text-overflow: ellipsis;
          overflow: hidden;
          word-wrap: normal;
        }
        .arco-icon {
          transform: scale(1);
          transition: transform 0.2s linear;
        }
        &:hover {
          cursor: pointer;
          .arco-icon {
            transform: scale(1.5);
            transition: transform 0.2s linear;
          }
        }
      }
    }
  }
</style>
