<template>
  <a-table
    :columns="columns"
    :data="data"
    :pagination="false"
    scrollbar
    :scroll="{ y: '100%' }"
    stripe
    :bordered="false"
  >
    <template #tb="{ record }">
      <icon-arrow-down style="color: red" />
      {{ record.tb }}
    </template>
    <template #hb="{ record }">
      <icon-arrow-up style="color: red" />
      {{ record.hb }}
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'

  const columns = [
    {
      title: '月份',
      dataIndex: 'name',
    },
    {
      title: '销售额',
      dataIndex: 'salary',
    },
    {
      title: '同比',
      dataIndex: 'tb',
      slotName: 'tb',
    },
    {
      title: '环比',
      dataIndex: 'hb',
      slotName: 'hb',
    },
  ]
  const data = reactive<{ key: string; name: string; salary: string; tb: string; hb: string }[]>([])
  for (let index = 1; index <= 12; index++) {
    data.push({
      key: index + '',
      name: index + '月',
      salary: index * 50 + '万',
      tb: '10%',
      hb: '20%',
    })
  }
</script>

<style lang="less" scoped>
  :deep(.arco-table-th) {
    color: rgb(var(--gray-7));
    font-size: 12px;
  }
  :deep(.arco-table-td) {
    color: rgb(var(--gray-7));
    font-size: 12px;
  }
</style>
