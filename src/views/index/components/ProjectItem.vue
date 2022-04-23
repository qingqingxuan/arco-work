<template>
  <div class="item-container">
    <div class="info-wrapper">
      <span class="title">
        {{ item.title }}
      </span>
      <!-- <a-space>
        <a-tag
          size="small"
          v-for="(tag, index) of item.tags"
          :key="tag"
          :color="index % 2 === 0 ? 'blue' : 'gold'"
        >
          {{ tag }}
        </a-tag>
      </a-space> -->
      <a-space class="mt-8">
        <a-button class="mr-1" status="success" shape="round" size="small" @click="preView">
          预览地址
        </a-button>
        <a-popover>
          <template #content>
            <img style="width: 150px" :src="WeiXin" />
          </template>
          <a-button shape="round" status="danger" size="small"> 获取源码（关注公众号） </a-button>
        </a-popover>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, ref, toRef } from 'vue'
  import WeiXin from '@/assets/qrcode.jpg'
  const colors = [
    'red',
    'orangered',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'arcoblue',
    'purple',
    'pinkpurple',
    'magenta',
    'gray',
  ]
  interface ItemData {
    title: string
    target?: string
    tags: string[]
  }

  export default defineComponent({
    name: 'ProjectItem',
    props: {
      item: {
        type: Object as PropType<ItemData>,
        default: () => {
          return {}
        },
      },
    },
    setup(props) {
      const item = toRef(props, 'item')
      return {
        WeiXin,
        colors,
        preView: function () {
          window.open(item.value.target)
        },
      }
    },
  })
</script>

<style lang="less" scoped>
  .item-container {
    position: relative;
    height: 7rem;
    z-index: 0;
    cursor: pointer;
    .info-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 2;
      font-size: 22px;
      font-weight: bold;
      color: rgb(var(--primary-5));
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &::after {
        content: '';
        display: block;
        position: absolute;
        border-radius: 10px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background-color: var(--border-color);
      }
    }
  }
</style>
