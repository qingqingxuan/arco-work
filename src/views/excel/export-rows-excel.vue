<template>
  <div class="main-container">
    <TableHeader :show-filter="false">
      <template #table-config>
        <a-button type="primary" size="small" @click="exportExcel">导出选中的Excel </a-button>
      </template>
    </TableHeader>
    <TableBody>
      <template #default>
        <a-table
          ref="tableRef"
          :data="dataList"
          :pagination="false"
          :row-key="rowKey"
          :row-selection="{ selectedRowKeys }"
          @selection-change="onSelectionChange"
        >
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
              <template v-else-if="item.key === 'avatar'" #cell="{ record }">
                <a-avatar :src="record.avatar"> </a-avatar>
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
  import { useRowKey, useRowSelection, useTable, useTableColumn } from '@/hooks/table'
  import { Message } from '@arco-design/web-vue'
  import { defineComponent, onMounted, ref } from 'vue'
  import XLSX from 'xlsx'
  export default defineComponent({
    name: 'ExportRowsExcel',
    setup() {
      const tableRef = ref(null)
      const table = useTable()
      const { selectedRowKeys, onSelectionChange } = useRowSelection()
      const rowKey = useRowKey('id')
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
        if (selectedRowKeys.value.length === 0) {
          Message.error('请选择要导出的行')
          return
        }
        const data = selectedRowKeys.value
          .map((it: any) => {
            return table.dataList.find((item: any) => item.id === it)
          })
          .map((it: any) => {
            return [
              it.nickName,
              it.gender === 0 ? '男' : '女',
              it.address,
              it.lastLoginTime,
              it.lastLoginIp,
            ]
          })
        data.unshift(['昵称', '性别', '地址', '上次登录时间', '上次登录IP'])
        const workSheet = XLSX.utils.aoa_to_sheet(data)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet, '数据报表')
        XLSX.writeFile(workBook, 'table-list.xlsx')
      }
      onMounted(doRefresh)
      return {
        tableRef,
        ...table,
        selectedRowKeys,
        onSelectionChange,
        tableColumns,
        rowKey,
        exportExcel,
      }
    },
  })
</script>
