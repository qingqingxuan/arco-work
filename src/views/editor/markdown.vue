<template>
  <div class="main-container">
    <div class="editor-container">
      <MarkdownEditor
        ref="markdownEditor"
        v-model:value="editorText"
        :height="400"
        placeholder="Insert here…"
      />
    </div>
    <div class="mt-5">
      <a-space>
        <a-button status="success" @click="addText">增加文本</a-button>
        <a-button status="warning" @click="addImage">增加图片</a-button>
        <a-button type="primary" @click="getHTML">预览HTML</a-button>
      </a-space>
    </div>
    <div v-if="priviewContent" class="p-4 mt-4 priview-content" v-html="priviewContent"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  const markdownEditor = ref()
  const editorText = ref('')
  const priviewContent = ref('')

  function addText() {
    markdownEditor.value.addText('\n### 新增内容')
  }
  function addImage() {
    markdownEditor.value.addImage('\n![](http://qingqingxuan.gitee.io/img/logo.png)')
  }
  function getHTML() {
    priviewContent.value = markdownEditor.value.getHtmlValue()
  }
</script>

<style lang="less" scoped>
  .editor-container {
    position: relative;
  }
  .theme-dark .priview-content {
    background: #5a5a5a;
    color: #fff;
  }
  .priview-content {
    background: #fff;
    color: #333;
  }
</style>
