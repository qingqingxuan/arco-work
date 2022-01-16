<template>
  <a-card title="鼠标放上，可以复制">
    <a-row cols="" class="icon-parent" responsive="screen">
      <a-col :xs="6" :sm="6" :md="4" :lg="4" :xl="3" v-for="item of tempIcon" :key="item">
        <div class="flex flex-col items-center justify-center icon-wrapper">
          <component :is="item" style="font-size: 22px" />
          <div class="mt-2 text-xs text-center">{{ item }}</div>
          <div class="text-center copy" @click="onCopy(item)"> 复制 </div>
        </div>
      </a-col>
    </a-row>
    <div class="text-center">
      <a-button type="text" @click="onLoadMore">加载更多</a-button>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue'
  import * as AllIcons from '@arco-design/web-vue/es/icon'
  import { useClipboard } from '@vueuse/core'
  import { Message } from '@arco-design/web-vue'

  export default defineComponent({
    name: 'Icons',
    setup() {
      const loading = ref(false)
      const iconArray = Object.keys(AllIcons)
      const { copy, isSupported } = useClipboard()
      const onCopy = (item: string) => {
        if (!isSupported) {
          Message.error('当前浏览器不支持此功能')
          return
        }
        copy(getCopyContent(item)).then(() => {
          Message.success(`<${item}/> 复制成功`)
        })
      }
      let index = 0
      const size = 50
      const tempIcon = reactive([] as string[])
      tempIcon.push(...iconArray.slice(index, size))
      function onLoadMore() {
        if (tempIcon.length >= iconArray.length) {
          Message.success('没有更多了')
          return
        }
        index++
        tempIcon.push(...iconArray.slice(index * size, index * size + size))
      }
      function getCopyContent(item: string) {
        return `<${item}/>`
      }
      return {
        loading,
        iconArray,
        tempIcon,
        onCopy,
        onLoadMore,
        getCopyContent,
      }
    },
  })
</script>

<style lang="less" scoped>
  @--primary-color: #1890ff;
  .icon-parent {
    border-top: 1px solid #f7f7f7;
    border-left: 1px solid #f7f7f7;
    .icon-wrapper {
      position: relative;
      height: 100px;
      border-right: 1px solid #f7f7f7;
      border-bottom: 1px solid #f7f7f7;
      overflow: hidden;
      padding-bottom: 0;
      transition: padding-bottom 0.2s ease-in-out;
      &:hover {
        color: @--primary-color;
        box-shadow: 0 0 10px #f0f0f0;
        padding-bottom: 22px;
        transition: padding-bottom 0.2s ease-in-out;
        .copy {
          cursor: pointer;
          background-color: @--primary-color;
          transform: translateY(0);
          transition: transform 0.2s ease-in-out;
        }
      }
      .copy {
        position: absolute;
        background-color: @--primary-color;
        padding: 5px 0;
        color: #fff;
        font-size: 12px;
        bottom: 0;
        left: 0;
        right: 0;
        transform: translateY(100%);
        transition: transform 0.2s ease-in-out;
      }
    }
  }
</style>
