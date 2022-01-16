<template>
  <div class="main-container">
    <a-card title="打印图片" :header-style="{ padding: '5px' }" :content-style="{ padding: '0px' }">
      <template #extra>
        <a-button type="primary" size="small" @click="printImage">打印</a-button>
      </template>
      <div class="image-wrapper">
        <img :src="imagePath" />
      </div>
    </a-card>
    <a-card
      title="打印HTML"
      :header-style="{ padding: '5px' }"
      :content-style="{ padding: '0px' }"
      class="mt-4"
    >
      <template #extra>
        <a-button type="primary" size="small" @click="printHtml">打印</a-button>
      </template>
      <div id="htmlWrapper">
        <a-table :data="dataList" :columns="columns" :pagination="false"> </a-table>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
  import printJS from 'print-js'
  import imagePath from '@/assets/logo.png'
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Print',
    setup() {
      function printImage() {
        printJS({
          printable: imagePath,
          type: 'image',
          showModal: false,
        })
      }
      function printHtml() {
        printJS({
          printable: 'htmlWrapper',
          type: 'html',
          targetStyles: ['*'],
        })
      }
      return {
        printImage,
        printHtml,
        imagePath,
        dataList: [
          {
            name: '张三',
            age: 10,
            gender: '男',
          },
          {
            name: '李四',
            age: 40,
            gender: '男',
          },
          {
            name: '王五',
            age: 30,
            gender: '女',
          },
        ],
        columns: [
          {
            title: '姓名',
            dataIndex: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
          },
          {
            title: '姓别',
            dataIndex: 'gender',
          },
        ],
      }
    },
  })
</script>

<style lang="less" scoped>
  .image-wrapper {
    width: 30%;
    margin: 0 auto;
    & > img {
      width: 100%;
    }
  }
  .html-wrapper {
    width: 80%;
    margin: 0 auto;
    & > h1 {
      color: red;
    }
  }
</style>
