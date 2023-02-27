<template>
  <div class="main-container">
    <TableHeader :show-filter="false">
      <template #table-config>
        <a-button type="primary" size="small" @click="exportExcel">导出Excel </a-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template #default>
        <a-table ref="tableRef" :data="dataList" :pagination="false">
          <template #columns>
            <a-table-column
              v-for="item of tableColumns"
              :key="item.key"
              align="center"
              :title="(item.title as string)"
              :data-index="(item.key as string)"
            >
              <template v-if="item.key === 'index'" #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
              <template v-else-if="item.key === 'gender'" #cell="{ record }">
                {{ record.gender === 1 ? '男' : '女' }}
              </template>
              <template v-else-if="item.key === 'status'" #cell="{ record }">
                <a-tag color="blue" size="small" v-if="record.status === 1">正常</a-tag>
                <a-tag color="red" size="small" v-else>禁用</a-tag>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>
    </TableBody>
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getTableList } from '@/api/url'
  import { useTable, useTableColumn } from '@/hooks/table'
  import { defineComponent, onMounted, ref } from 'vue'
  import XLSX from 'xlsx'
  export default defineComponent({
    name: 'ExportExcel',
    setup() {
      const tableRef = ref(null)
      const table = useTable()
      const tableColumns = useTableColumn([
        table.indexColumn,
        {
          title: '名称',
          key: 'nickName',
          dataIndex: 'nickName',
        },
        {
          title: '性别',
          key: 'gender',
          dataIndex: 'gender',
        },
        {
          title: '地址',
          key: 'address',
          dataIndex: 'address',
        },
        {
          title: '登录时间',
          key: 'lastLoginTime',
          dataIndex: 'lastLoginTime',
        },
        {
          title: '登录IP',
          key: 'lastLoginIp',
          dataIndex: 'lastLoginIp',
        },
        {
          title: '状态',
          key: 'status',
          dataIndex: 'status',
        },
      ])
      function doRefresh() {
        post({
          url: getTableList,
          data: {
            page: 1,
            pageSize: 20,
          },
        })
          .then(table.handleSuccess)
          .catch(console.log)
      }
      function exportExcel() {
        const workSheet = XLSX.utils.table_to_sheet((tableRef.value as any).$el)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, '数据报表')
        XLSX.writeFile(workBook, 'tale-list.xlsx')
      }
      onMounted(doRefresh)
      return {
        tableRef,
        tableColumns,
        ...table,
        exportExcel,
      }
    },
  })
</script>
