<template>
  <div class="main-container">
    <TableBody>
      <template #header>
        <TableHeader ref="tableHeaderRef" :show-filter="false">
          <template #table-config>
            <AddButton @add="onAddItems" />
          </template>
        </TableHeader>
      </template>
      <template #default>
        <a-table
          :bordered="false"
          :loading="tableLoading"
          :data="dataList"
          :pagination="false"
          :rowKey="rowKey"
          table-layout-fixed
          :scroll="{ y: tableHeight }"
        >
          <template #columns>
            <a-table-column
              v-for="item of tableColumns"
              :key="item.key"
              :align="item.align"
              :title="(item.title as string)"
              :data-index="(item.key as string)"
              :fixed="item.fixed"
              :width="item.width"
            >
              <template v-if="item.key === 'index'" #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
              <template v-else-if="item.key === 'gender'" #cell="{ record }">
                <a-tag :color="record.gender === 1 ? 'green' : 'red'">
                  {{ record.gender === 1 ? '男' : '女' }}
                </a-tag>
              </template>
              <template v-else-if="item.key === 'avatar'" #cell="{}">
                <a-avatar :size="30" :style="{ backgroundColor: 'var(--color-primary-light-1)' }">
                  <IconUser />
                </a-avatar>
              </template>
              <template v-else-if="item.key === 'status'" #cell="{ record }">
                <a-tag color="blue" size="small" v-if="record.status === 1">正常</a-tag>
                <a-tag color="red" size="small" v-else>禁用</a-tag>
              </template>
              <template v-else-if="item.key === 'actions'" #cell="{ record }">
                <a-space>
                  <a-button
                    v-if="record.status === 0"
                    status="primary"
                    @click="onChangeStatusItem(record)"
                    size="mini"
                  >
                    启用
                  </a-button>
                  <a-button v-else status="danger" @click="onChangeStatusItem(record)" size="mini">
                    禁用
                  </a-button>
                  <a-button status="success" @click="onChangeItem(record)" size="mini"
                    >编辑</a-button
                  >
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>
      <template #footer>
        <TableFooter ref="tableFooterRef" :pagination="pagination" />
      </template>
    </TableBody>
    <ModalDialog ref="modalDialogRef" :title="actionTitle" @confirm="onDataFormConfirm">
      <template #content>
        <a-form :model="formModel">
          <a-form-item v-for="item of formItems" :key="item.formItem.field" v-bind="item.formItem">
            <FormRender :render="item.render" :options="item.options" />
          </a-form-item>
        </a-form>
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { get, post } from '@/api/http'
  import { getUserList, updateUser } from '@/api/url'
  import { usePagination, useRowKey, useTable, useTableColumn, useTableHeight } from '@/hooks/table'
  import { Message, Modal } from '@arco-design/web-vue'
  import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
  import { useUser, useUserFormItem } from './hooks/userHooks'
  import { ModalDialogType } from '@/types/components'
  export default defineComponent({
    name: 'UserList',
    setup() {
      const table = useTable()
      const rowKey = useRowKey('id')
      const actionTitle = ref('添加用户')
      const modalDialogRef = ref<ModalDialogType | null>()
      const pagination = usePagination(doRefresh)
      const tableColumns = useTableColumn([
        table.indexColumn,
        {
          title: '名称',
          key: 'username',
          dataIndex: 'username',
        },
        {
          title: '手机号',
          key: 'phone',
          dataIndex: 'phone',
        },
        {
          title: '邮箱',
          key: 'email',
          dataIndex: 'email',
          width: 200,
        },
        {
          title: '角色',
          key: 'roleName',
          dataIndex: 'roleName',
        },
        {
          title: '状态',
          key: 'status',
          dataIndex: 'status',
        },
        {
          title: '操作',
          key: 'actions',
          dataIndex: 'actions',
        },
      ])
      const expandAllFlag = ref(true)
      async function doRefresh() {
        const res = await get({
          url: getUserList,
          data: () => {
            return {
              page: pagination.page,
              pageSize: pagination.pageSize,
            }
          },
        })
        table.handleSuccess(res.data)
        pagination.setTotalSize((res.data as any).totalSize)
      }
      function onAddItems() {
        modalDialogRef.value?.toggle()
      }
      function onChangeStatusItem(data: any) {
        Modal.confirm({
          title: '提示',
          content: data.status === 1 ? '是否要禁用此用户？' : '是否要启用此用户？',
          cancelText: '取消',
          okText: '确定',
          onOk: () => {
            post({
              url: updateUser,
              data: {
                id: data.id,
                status: data.status === 1 ? 0 : 1,
              },
            })
              .then(() => {
                Message.success('状态设置成功')
                doRefresh()
              })
              .catch((error: Error) => {
                Message.error(error.message)
              })
          },
        })
      }
      function onChangeItem() {}
      function onDataFormConfirm() {}
      const { formModel } = useUser()
      const { formItems } = useUserFormItem(formModel)
      onMounted(async () => {
        table.tableHeight.value = await useTableHeight(getCurrentInstance())
        doRefresh()
        const item = formItems.value.find((it) => it.formItem.field === 'roles')
        item!.options = [
          {
            value: 1,
            label: '12',
          },
          {
            value: 2,
            label: '22',
          },
        ]
      })
      return {
        modalDialogRef,
        actionTitle,
        formModel,
        formItems,
        ...table,
        rowKey,
        expandAllFlag,
        tableColumns,
        pagination,
        onAddItems,
        onChangeItem,
        onChangeStatusItem,
        onDataFormConfirm,
      }
    },
  })
</script>
