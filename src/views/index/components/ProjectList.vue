<template>
  <a-table :columns="columns" :data="data" :pagination="false" />
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
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
    {
      key: '2',
      name: 'Alisa Ross',
      salary: 2500,
      address: '35 Park Road,',
      email: 'alisa.ross@example.com',
    },
    {
      key: '3',
      name: 'Kevin Sandra',
      salary: 2200,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '4',
      name: 'Ed Hellen',
      salary: 1700,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '5',
      name: 'William Smith',
      salary: 2700,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
    {
      key: '6',
      name: 'William Smith',
      salary: 2700,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
    {
      key: '7',
      name: 'William Smith',
      salary: 2700,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
    },
  ])
</script>

<style lang="less" scoped>
  .item-container {
  }
</style>
