<template>
  <div class="main-container">
    <a-card
      title="文章标题"
      :content-style="{ padding: '10px' }"
      :header-style="{ padding: '5px' }"
    >
      <a-input v-model="title" class="title-input" placeholder="请输入文章标题" />
    </a-card>
    <a-card title="文章内容" :body-style="{ padding: '10px' }" class="mt-4">
      <template #extra>
        <div class="flex">
          <a-space justify="end">
            <a-button type="primary" size="small" @click="getHtmlContent">获取HTML</a-button>
            <a-button status="warning" size="small" @click="getJsonContent">获取JSON</a-button>
          </a-space>
        </div>
      </template>
      <RichTextEditor ref="richTextEditor" :height="400" />
    </a-card>
    <div v-if="htmlContent" class="p-4 mt-4 priview-content" v-html="htmlContent"> </div>
    <div v-if="jsonContent" class="p-4 mt-4 priview-content">
      {{ jsonContent }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const richTextEditor = ref()
  const title = ref('')
  const htmlContent = ref('')
  const jsonContent = ref('')
  function getHtmlContent() {
    htmlContent.value = richTextEditor.value.getHtmlContent()
  }
  function getJsonContent() {
    jsonContent.value = richTextEditor.value.getJsonContent()
  }
</script>

<style lang="less" scoped>
  :deep(.ql-container.ql-snow) {
    border: none;
  }
  :deep(.ql-toolbar.ql-snow) {
    border: none;
    border-bottom: 1px solid #ccc;
  }
  :deep(.ql-editor.ql-blank::before) {
    color: #afb4bd;
    font-size: 14px;
    font-style: normal;
  }
  .dark .priview-content {
    background: #5a5a5a;
    color: #fff;
  }
  .light .priview-content {
    background: #fff;
    color: #333;
  }
</style>
