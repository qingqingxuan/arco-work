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
              v-for="item of tableColumns"
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
    <ModalDialog ref="modalDialogRef" :title="actionTitle" @confirm="onDataFormConfirm">
      <a-form :model="formModel">
        <a-form-item
          v-for="item of formItems"
          :class="[item.required ? 'form-item__require' : 'form-item__no_require']"
          :label="item.label"
          :key="item.key"
          :disabled="item.disabled"
        >
          <template v-if="item.type === 'input'">
            <a-input :placeholder="item.placeholder" v-model="(formModel as any)[item.key]">
              <template #prepend v-if="item.key === 'name'">
                {{ ROLE_CODE_FLAG }}
              </template>
            </a-input>
          </template>
        </a-form-item>
      </a-form>
    </ModalDialog>
    <ModalDialog ref="menuModalDialogRef" title="编辑菜单权限" @confirm="onUpdateRoleMenus">
      <a-tree
        ref="menuTreeRef"
        :data="menuData"
        checkable
        v-model:expanded-keys="defaultExpandedKeys"
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
  import { useRowKey, useTable, useTableColumn } from '@/hooks/table'
  import type { ModalDialogType, FormItem } from '@/types/components'
  import { Message, Modal, TreeInstance } from '@arco-design/web-vue'
  import { reactive } from 'vue'
  import { defineComponent, nextTick, onMounted, ref } from 'vue'
  import { Role } from './hooks/roleHooks'
  const ROLE_CODE_FLAG = 'ROLE_'

  function handleMenuData(
    menuData: Array<any>,
    selectedKeys: number[],
    defaultExpandedKeys: Array<number>
  ) {
    const tempMenus = [] as Array<any>
    menuData.forEach((it) => {
      const tempMenu = {} as any
      tempMenu.key = it.id
      tempMenu.title = it.title

      if (it.children && it.children.length > 0) {
        defaultExpandedKeys.push(tempMenu.key)
        const index = selectedKeys.indexOf(tempMenu.key)
        if (index !== -1) {
          selectedKeys.splice(selectedKeys.indexOf(tempMenu.key), 1)
        }
        tempMenu.children = handleMenuData(it.children, selectedKeys, defaultExpandedKeys)
      }
      tempMenus.push(tempMenu)
    })
    return tempMenus
  }
  export default defineComponent({
    name: 'Role',
    setup() {
      const modalDialogRef = ref<ModalDialogType | null>(null)
      const menuModalDialogRef = ref<ModalDialogType | null>(null)
      const menuTreeRef = ref<TreeInstance | null>(null)
      const table = useTable()
      const rowKey = useRowKey('id')
      const actionTitle = ref('添加角色')
      const menuData = ref<Array<any>>([])
      const tableColumns = useTableColumn([
        table.indexColumn,
        {
          title: '角色名称',
          key: 'name',
          dataIndex: 'name',
        },
        {
          title: '角色标识',
          key: 'code',
          dataIndex: 'code',
        },
        {
          title: '角色状态',
          key: 'status',
          dataIndex: 'status',
        },
        {
          title: '创建时间',
          key: 'createdAt',
          dataIndex: 'createdAt',
        },
        {
          title: '操作',
          key: 'actions',
          dataIndex: 'actions',
        },
      ])
      const defaultCheckedKeys = ref<Array<number>>([])
      const defaultExpandedKeys = ref<Array<number>>([])
      let tempRole: { id: any } | null = null
      const formItems = reactive<FormItem[]>([
        {
          label: '角色名称',
          key: 'name',
          type: 'input',
          required: true,
          disabled: false,
          placeholder: '请输入角色名称',
          validator: function () {
            if (!formModel.name) {
              Message.error(this.placeholder || '')
              return false
            }
            return true
          },
        },
        {
          label: '角色描述',
          key: 'description',
          required: true,
          type: 'input',
          placeholder: '请输入角色描述',
          validator: function () {
            if (!formModel.description) {
              Message.error(this.placeholder || '')
              return false
            }
            return true
          },
        },
      ])
      const formModel = reactive({
        id: 0,
        name: '',
        description: '',
      })
      function doRefresh() {
        get<Role[]>({ url: getRoleList }).then(table.handleSuccess).catch(console.log)
      }
      function onAddItem() {
        actionTitle.value = '添加角色'
        modalDialogRef.value?.toggle()
        formModel.name = ''
        formModel.description = ''
        formItems[0].disabled = false
      }
      function onUpdateItem(item: any) {
        actionTitle.value = '编辑角色'
        modalDialogRef.value?.toggle()
        nextTick(() => {
          formItems[0].disabled = true
          formModel.id = item.id
          formModel.name = item.name.replace(ROLE_CODE_FLAG, '')
          formModel.description = item.description
        })
      }
      function onChangeStatus(data: any) {
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
      function onDataFormConfirm() {
        if (formItems.every((it) => (it.validator ? it.validator() : true))) {
          post({
            url: formModel.id ? updateRole : createRole,
            data: formModel.id
              ? {
                  id: formModel.id,
                  description: formModel.description,
                }
              : {
                  name: ROLE_CODE_FLAG + formModel.name,
                  description: formModel.description,
                },
          })
            .then((res) => {
              formModel.id = 0
              formModel.name = ''
              formModel.description = ''
              modalDialogRef.value?.toggle()
              Message.success(res.msg)
              doRefresh()
            })
            .catch((error: Error) => {
              Message.error(error.message)
            })
        }
      }
      async function onShowMenu(item: any) {
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
          const haflfNodes = menuTreeRef.value!.getHalfCheckedNodes()
          const checkNodes = menuTreeRef.value!.getCheckedNodes()
          const res = await post({
            url: updateMenuByRoleId,
            data: {
              roleId: tempRole?.id,
              menus: [
                ...haflfNodes.map((it: any) => {
                  return it.key
                }),
                ...checkNodes.map((it: any) => {
                  return it.key
                }),
              ].join(','),
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
        ROLE_CODE_FLAG,
        modalDialogRef,
        menuModalDialogRef,
        menuTreeRef,
        rowKey,
        formModel,
        menuData,
        tableColumns,
        formItems,
        actionTitle,
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
