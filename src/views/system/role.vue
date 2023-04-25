<template>
  <div class="main-container">
    <TableBody>
      <template #header>
        <TableHeader :show-filter="false">
          <template #table-config>
            <AddButton @add="onAddItem" />
          </template>
        </TableHeader>
      </template>
      <template #default>
        <a-table
          :bordered="false"
          :loading="tableLoading"
          :data="dataList"
          :pagination="false"
          :row-key="rowKey"
        >
          <template #columns>
            <a-table-column
              v-for="item of columns"
              :key="item.key"
              :align="item.align"
              :title="(item.title as string)"
              :width="item.width"
              :data-index="(item.key as string)"
              :fixed="item.fixed"
            >
              <template v-if="item.key === 'index'" #cell="dataItem">
                {{ (dataItem as any).rowIndex + 1 }}
              </template>
              <template v-else-if="item.key === 'status'" #cell="{ record }">
                <a-tag v-if="record.status === 1" color="green"> 正常 </a-tag>
                <a-tag v-else color="red"> 禁用 </a-tag>
              </template>
              <template v-else-if="item.key === 'actions'" #cell="{ record }">
                <a-space>
                  <a-button status="success" size="mini" @click="onUpdateItem(record)"
                    >编辑</a-button
                  >
                  <a-button
                    v-if="record.status === 1"
                    status="danger"
                    size="mini"
                    @click="onChangeStatus(record)"
                    >禁用</a-button
                  >
                  <a-button v-else status="primary" size="mini" @click="onChangeStatus(record)">
                    启用
                  </a-button>
                  <a-button status="warning" size="mini" @click="onShowMenu(record)">
                    菜单权限
                  </a-button>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>
    </TableBody>
    <ModalDialog ref="modalDialogRef" :title="dialogTitle" @confirm="onDataFormConfirm">
      <a-form ref="roleFormRef" :model="formModel">
        <a-form-item v-for="item of formItems" :key="item.formItem.field" v-bind="item.formItem">
          <FormRender :render="item.render" :disabled="item.disabled" />
        </a-form-item>
      </a-form>
    </ModalDialog>
    <ModalDialog ref="menuModalDialogRef" title="编辑菜单权限" @confirm="onUpdateRoleMenus">
      <a-tree
        ref="menuTreeRef"
        :data="menuData"
        checkable
        :expanded-keys="defaultExpandedKeys"
        v-model:checked-keys="defaultCheckedKeys"
      />
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { FORM_URLENCODED, CONTENT_TYPE } from '@/api/axios.config'
  import { get, post } from '@/api/http'
  import {
    createRole,
    getSelectedMenusByRoleId,
    updateMenuByRoleId,
    getRoleList,
    updateRole,
  } from '@/api/url'
  import { useRowKey, useTable } from '@/hooks/table'
  import type { ModalDialogType } from '@/types/components'
  import { Message, Modal, TreeInstance } from '@arco-design/web-vue'
  import { useModelDialog } from '@/components/ModalDialog/useModalDialog'
  import { defineComponent, onMounted, ref } from 'vue'
  import {
    RoleModel,
    useTableColumn,
    useFormItems,
    useRoleModel,
    ROLE_CODE_FLAG,
    handleMenuData,
    useForm,
  } from './hooks/roleHooks'

  export default defineComponent({
    name: 'Role',
    setup() {
      const menuModalDialogRef = ref<ModalDialogType | null>(null)
      const menuTreeRef = ref<TreeInstance | null>(null)
      const table = useTable()
      const rowKey = useRowKey('id')
      const { columns } = useTableColumn()
      const { formModel, clearFormModel, setFormModel } = useRoleModel()
      const { formItems, setFormItemDisabled } = useFormItems(formModel)
      const { roleFormRef, clearValidate } = useForm()
      const { modalDialogRef, dialogTitle, setDialogTitle, showModalDialog } = useModelDialog()
      const defaultCheckedKeys = ref<Array<number>>([])
      const defaultExpandedKeys = ref<Array<number>>([])
      const menuData = ref<Array<any>>([])
      let tempRole: RoleModel | null = null

      function doRefresh() {
        get<RoleModel[]>({ url: getRoleList }).then(table.handleSuccess).catch(console.log)
      }
      function onAddItem() {
        clearValidate()
        setDialogTitle('添加角色')
        clearFormModel()
        setFormItemDisabled('code', false)
        showModalDialog()
      }
      function onUpdateItem(item: RoleModel) {
        clearValidate()
        setDialogTitle('编辑角色')
        setFormItemDisabled('code', true)
        setFormModel(item)
        showModalDialog()
      }
      function onChangeStatus(data: RoleModel) {
        Modal.confirm({
          title: '提示',
          content: data.status === 1 ? '是否要禁用此角色？' : '是否要启用此角色？',
          cancelText: '取消',
          okText: '确定',
          onOk: () => {
            post({
              url: updateRole,
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
          const validate = await roleFormRef.value?.validate()
          if (validate) {
            return
          }
          const res = await post({
            url: formModel.id ? updateRole : createRole,
            data: formModel.id
              ? {
                  id: formModel.id,
                  name: formModel.name,
                }
              : {
                  code: ROLE_CODE_FLAG + formModel.code,
                  name: formModel.name,
                },
          })
          clearFormModel()
          modalDialogRef.value?.toggle()
          Message.success(res.msg)
          doRefresh()
        } catch (error: any) {
          Message.error(error.message)
        }
      }
      async function onShowMenu(item: RoleModel) {
        try {
          tempRole = item
          const res = await get({
            url: getSelectedMenusByRoleId,
            data: {
              roleId: item.id,
            },
          })
          menuData.value = []
          defaultExpandedKeys.value = []
          menuData.value = handleMenuData(
            res.data.allMenus,
            res.data.selectedIds || [],
            defaultExpandedKeys.value
          )
          defaultCheckedKeys.value = res.data.selectedIds
          menuModalDialogRef.value?.toggle()
        } catch (error: any) {
          Message.error(error.message)
        }
      }
      async function onUpdateRoleMenus() {
        try {
          const checkNodes = menuTreeRef.value!.getCheckedNodes({
            includeHalfChecked: true,
          })
          const keys = new Set(checkNodes.map((it) => it?.key))
          if (keys.size === 0) {
            Message.error('请至少选择一个菜单')
            return
          }
          const res = await post({
            url: updateMenuByRoleId,
            data: {
              roleId: tempRole?.id,
              menus: Array.from(keys).join(','),
            },
            headers: {
              [CONTENT_TYPE]: FORM_URLENCODED,
            },
          })
          Message.success(res.msg)
          menuModalDialogRef.value?.toggle()
        } catch (error: any) {
          Message.error(error.message)
        }
      }
      onMounted(doRefresh)
      return {
        modalDialogRef,
        menuModalDialogRef,
        menuTreeRef,
        roleFormRef,
        rowKey,
        formModel,
        menuData,
        columns,
        formItems,
        dialogTitle,
        defaultCheckedKeys,
        defaultExpandedKeys,
        ...table,
        onAddItem,
        onDataFormConfirm,
        onShowMenu,
        onChangeStatus,
        onUpdateItem,
        onUpdateRoleMenus,
      }
    },
  })
</script>
