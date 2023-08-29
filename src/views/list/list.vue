<template>
  <a-space direction="vertical" size="large" fill>
    <a-table
      :columns="columns"
      :bordered="{ wrapper: true, cell: true }"
      :stripe="true"
      :data="data"
      :pagination="false"
    />
  </a-space>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { reactive, ref } from 'vue'

  export default defineComponent({
    setup() {
      const alignLeft = ref(false)

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          sortable: {
            sortDirections: ['ascend', 'descend'],
          },
        },
        {
          title: 'Salary',
          dataIndex: 'salary',
          sortable: {
            sortDirections: ['ascend'],
          },
          filterable: {
            filters: [
              {
                text: '> 20000',
                value: '20000',
              },
              {
                text: '> 30000',
                value: '30000',
              },
            ],
            filter: (value, record) => record.salary > value,
            multiple: true,
          },
        },
        {
          title: 'Address',
          dataIndex: 'address',
          filterable: {
            filters: [
              {
                text: 'London',
                value: 'London',
              },
              {
                text: 'Paris',
                value: 'Paris',
              },
            ],
            filter: (value, row) => row.address.includes(value),
          },
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
          salary: 23000,
          address: '32 Park Road, London',
          email: 'jane.doe@example.com',
        },
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
        },
        {
          key: '3',
          name: 'Kevin Sandra',
          salary: 22000,
          address: '31 Park Road, London',
          email: 'kevin.sandra@example.com',
        },
        {
          key: '4',
          name: 'Ed Hellen',
          salary: 17000,
          address: '42 Park Road, London',
          email: 'ed.hellen@example.com',
        },
        {
          key: '5',
          name: 'William Smith',
          salary: 27000,
          address: '62 Park Road, London',
          email: 'william.smith@example.com',
        },
      ])

      const handleChange = (data, extra, currentDataSource) => {
        console.log('change', data, extra, currentDataSource)
      }

      return {
        alignLeft,
        columns,
        data,
        handleChange,
      }
    },
  })
</script>

<style lang="less" scoped>
  .item-wrapper {
    padding: 10px;
    .header-wrapper {
      display: flex;
      justify-content: flex-start;
      .avatar-wrapper {
        position: relative;
        .avatar {
          border-radius: 5px;
          width: 70px;
          height: 70px;
          border: 1px solid #f5f5f5;
        }
        .vip {
          position: absolute;
          top: -13px;
          right: -13px;
          width: 30px;
          height: 30px;
          transform: rotate(45deg);
        }
      }
      .nick-wrapper {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
      }
    }
    .content-wrapper {
      text-align: center;
      height: 100%;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
</style>
