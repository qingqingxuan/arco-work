<template>
  <div class="relative">
    <a-card :content-style="{ padding: 0 }">
      <div class="text-center p-4">
        <icon-check-circle :style="{ color: '#0e7a0d', fontSize: '60px' }" />
      </div>
      <div class="result mt-1"> 提交成功 </div>
      <div class="tip mt-1">
        提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message
        全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示
        “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。
      </div>
      <div class="text-center action">
        <a-space>
          <a-button type="primary" size="small">返回列表</a-button>
          <a-button size="small" class="ml-4 mr-4">查看项目</a-button>
          <a-button size="small">打印</a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Success',
  })
</script>

<style lang="less" scoped>
  .icon {
    color: #67c23a;
    font-size: 100px;
    margin: 30px 0;
  }
  .result {
    font-size: 24px;
    line-height: 1.8;
    text-align: center;
  }
  .tip {
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
  }
  .action {
    margin-top: 30px;
  }
</style>
