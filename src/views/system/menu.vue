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
          :row-key="rowKey"
          :pagination="false"
          :columns="columns"
          :default-expanded-keys="expandedKeys"
        />
      </template>
    </TableBody>
    <ModalDialog
      ref="modalDialogRef"
      :title="dialogTitle"
      :loading="submitLoading"
      @confirm="onConfirm"
      content-height="50vh"
    >
      <a-form
        ref="menuFormRef"
        :model="formModel"
        :label-col-props="{ span: 6 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item v-for="item of formItems" :key="item.formItem.field" v-bind="item.formItem">
          <FormRender :render="item.render" :options="item.options" :disabled="item.disabled" />
        </a-form-item>
      </a-form>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue'
  import { get, post } from '@/api/http'
  import { getMenuList, createMenu, updateMenu, deleteMenu } from '@/api/url'
  import { useRowKey, useTable } from '@/hooks/table'
  import { Message, Modal } from '@arco-design/web-vue'
  import {
    MenuModel,
    getExpandedMenus,
    useTableColumn,
    useFormItems,
    useMenuModel,
    useForm,
    useExpandedKeys,
  } from './hooks/menuHooks'
  import { useModelDialog } from '@/components/ModalDialog/useModalDialog'
  export default defineComponent({
    name: 'Menu',
    setup() {
      const table = useTable()
      const rowKey = useRowKey('id')
      const { formModel, clearFormModel, setFormModel, getFormModel } = useMenuModel()
      const { columns } = useTableColumn({
        onUpdate: onUpdateItem,
        onDelete: onDeleteItem,
      })
      const { formItems, setParentOptions, setFormItemDisabled, onChangeType } =
        useFormItems(formModel)
      const { menuFormRef, clearValidate } = useForm()
      const { keys: expandedKeys, setExpandKeys } = useExpandedKeys()
      const {
        submitLoading,
        startDialogLoading,
        closeDialogLoading,
        modalDialogRef,
        dialogTitle,
        setDialogTitle,
        showModalDialog,
        closeModalDialog,
      } = useModelDialog()
      async function doRefresh() {
        const res = await get<MenuModel[]>({ url: getMenuList })
        setExpandKeys(getExpandedMenus(res.data))
        setParentOptions(res.data)
        table.handleSuccess(res)
      }
      function onAddItem() {
        setDialogTitle('添加菜单')
        clearFormModel()
        clearValidate()
        setFormItemDisabled('pid', false)
        setFormItemDisabled('type', false)
        onChangeType(0)
        showModalDialog()
      }
      function onUpdateItem(item: MenuModel) {
        setDialogTitle('编辑菜单')
        clearValidate()
        setFormItemDisabled('pid', true)
        setFormItemDisabled('type', true)
        setFormModel(item, formItems.value[0])
        onChangeType(item.type)
        showModalDialog()
      }
      async function onConfirm() {
        try {
          startDialogLoading()
          const model = getFormModel(formItems.value[0])
          const res = await post({
            url: model.id ? updateMenu : createMenu,
            data: model,
          })
          if (res.code === 200) {
            Message.success(dialogTitle.value + '成功')
            closeModalDialog()
            doRefresh()
          }
        } catch (error: any) {
          Message.error(error.message)
        } finally {
          closeDialogLoading()
        }
      }
      function onDeleteItem(item: MenuModel) {
        if (item.type === 0 && item.children && item.children.length > 0) {
          Message.error('该菜单下有子菜单，不能删除')
          return
        }
        Modal.confirm({
          title: '提示',
          content: '是否要删除此菜单？',
          okText: '删除',
          cancelText: '取消',
          onOk: () => {
            get({
              url: deleteMenu,
              data: {
                id: item.id,
              },
            })
              .then((res) => {
                if (res.code === 200) {
                  Message.success('删除成功')
                  doRefresh()
                }
              })
              .catch((err: Error) => {
                Message.error(err.message)
              })
          },
        })
      }
      onMounted(() => {
        doRefresh()
      })
      return {
        rowKey,
        dialogTitle,
        submitLoading,
        expandedKeys,
        modalDialogRef,
        menuFormRef,
        ...table,
        columns,
        formItems,
        formModel,
        onAddItem,
        onDeleteItem,
        onUpdateItem,
        onConfirm,
      }
    },
  })
</script>
