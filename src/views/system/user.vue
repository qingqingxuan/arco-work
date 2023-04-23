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
              <template v-if="item.key === 'index'" #cell="dataItem">
                {{ (dataItem as any).rowIndex + 1 }}
              </template>
              <template v-else-if="item.key === 'gender'" #cell="{ record }">
                <a-tag :color="record.gender === 1 ? 'green' : 'red'">
                  {{ record.gender === 1 ? '男' : '女' }}
                </a-tag>
              </template>
              <template v-else-if="item.key === 'roleName'" #cell="{ record }">
                <a-space>
                  <a-tag v-for="it of record.roles" :key="it.id">
                    {{ it.description }}
                  </a-tag>
                </a-space>
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
    <ModalDialog
      ref="modalDialogRef"
      :title="dialogTitle"
      :loading="submitLoading"
      @confirm="onDataFormConfirm"
    >
      <a-form ref="userFormRef" :model="formModel">
        <a-form-item v-for="item of formItems" :key="item.formItem.field" v-bind="item.formItem">
          <FormRender :render="item.render" :options="item.options" />
        </a-form-item>
      </a-form>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { get, post } from '@/api/http'
  import { getUserList, updateUser, addUser, changeUserStatus } from '@/api/url'
  import { usePagination, useRowKey, useTable, useTableColumn, useTableHeight } from '@/hooks/table'
  import { FormInstance, Message, Modal } from '@arco-design/web-vue'
  import { defineComponent, getCurrentInstance, onMounted, ref } from 'vue'
  import { useUserModel, useUserFormItem, UserItem } from './hooks/userHooks'
  import { useModelDialog } from '@/components/ModalDialog/useModalDialog'
  import { useRoleList } from './hooks/roleHooks'
  import { omit } from 'lodash-es'
  export default defineComponent({
    name: 'UserList',
    setup() {
      const table = useTable()
      const rowKey = useRowKey('id')
      const {
        modalDialogRef,
        dialogTitle,
        setDialogTitle,
        submitLoading,
        startDialogLoading,
        showModalDialog,
        closeModalDialog,
      } = useModelDialog()
      const userFormRef = ref<FormInstance | null>()
      const pagination = usePagination(doRefresh)
      const { formModel, clearFormModel, setFormModel } = useUserModel()
      const { formItems, setFormItemVisible } = useUserFormItem(formModel)
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
      async function doRefresh() {
        try {
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
        } catch (error: any) {
          table.tableLoading.value = false
          Message.error(error.message)
        }
      }
      function onAddItems() {
        userFormRef.value?.clearValidate()
        setDialogTitle('添加用户')
        clearFormModel()
        setFormItemVisible('password', true)
        setFormItemVisible('status', true)
        showModalDialog()
      }
      function onChangeItem(item: UserItem) {
        userFormRef.value?.clearValidate()
        setDialogTitle('编辑用户')
        setFormItemVisible('password', false)
        setFormItemVisible('status', false)
        setFormModel({
          ...item,
          roles: (item.roles as Array<any>).map((it: any) => {
            return it.id
          }),
        })
        showModalDialog()
      }
      function onChangeStatusItem(data: any) {
        Modal.confirm({
          title: '提示',
          content: data.status === 1 ? '是否要禁用此用户？' : '是否要启用此用户？',
          cancelText: '取消',
          okText: '确定',
          onOk: () => {
            post({
              url: changeUserStatus,
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
      async function onDataFormConfirm() {
        try {
          const validate = await userFormRef.value?.validate()
          if (validate) {
            return
          }
          startDialogLoading()
          const res = await post({
            url: formModel.id ? updateUser : addUser,
            data: formModel.id
              ? {
                  ...omit(formModel, ['phone']),
                  roles: (formModel.roles as Array<number>).join(','),
                }
              : {
                  ...omit(formModel, 'id'),
                  roles: (formModel.roles as Array<number>).join(','),
                },
          })
          if (res.code === 200) {
            setTimeout(() => {
              Message.success(dialogTitle.value + '成功')
              closeModalDialog()
              doRefresh()
            }, 2000)
          }
        } catch (error: any) {
          Message.error(error.message)
        }
      }
      onMounted(async () => {
        table.tableHeight.value = await useTableHeight(getCurrentInstance())
        doRefresh()
        const item = formItems.value.find((it) => it.formItem.field === 'roles')
        const roleList = await useRoleList()
        item!.options = roleList.map((it: { description: string; id: any }) => {
          return {
            label: it.description,
            value: it.id,
          }
        })
      })
      return {
        modalDialogRef,
        userFormRef,
        dialogTitle,
        submitLoading,
        formModel,
        formItems,
        ...table,
        rowKey,
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
