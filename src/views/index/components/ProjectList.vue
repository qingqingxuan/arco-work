<template>
  <a-table
    :columns="columns"
    :data="data"
    :pagination="false"
    scrollbar
    :scroll="{ y: '100%' }"
    :bordered="false"
  />
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
      dataIndex: 'address',
    },
    {
      title: '环比',
      dataIndex: 'email',
    },
  ]
  const data = reactive([
    {
      key: '1',
      name: 'Jane Doe',
      salary: 2300,
      address: '32 Park Road,',
      email: 'jane.doe@example.com',
    },
  ])
</script>
