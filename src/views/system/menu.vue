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
          :default-expanded-keys="expandedKeys"
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
              <template v-if="item.key === 'index'" #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
              <template v-else-if="item.key === 'routeName'" #cell="{ record }">
                {{ record.routeName ? record.routeName : '-' }}
              </template>
              <template v-else-if="item.key === 'component'" #cell="{ record }">
                {{ record.component ? record.component : '-' }}
              </template>
              <template v-else-if="item.key === 'icon'" #cell="{ record }">
                <component :is="record.icon || 'IconMenu'" style="font-size: 18px" />
              </template>
              <template v-else-if="item.key === 'cacheable'" #cell="{ record }">
                <a-tag size="small" :color="record.cacheable ? 'blue' : 'red'">
                  {{ record.cacheable ? '是' : '否' }}
                </a-tag>
              </template>
              <template v-else-if="item.key === 'affix'" #cell="{ record }">
                <a-tag size="small" :color="record.affix ? 'blue' : 'red'">
                  {{ record.affix ? '是' : '否' }}
                </a-tag>
              </template>
              <template v-else-if="item.key === 'actions'" #cell="{ record }">
                <a-space>
                  <a-button status="success" @click="onUpdateItem(record)" size="mini">
                    编辑
                  </a-button>
                  <a-button status="danger" size="mini" @click="onDeleteItem(record)"
                    >删除</a-button
                  >
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
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
  import { defineComponent, onMounted, ref } from 'vue'
  import { get, post } from '@/api/http'
  import { getMenuList, createMenu, updateMenu } from '@/api/url'
  import { useRowKey, useTable } from '@/hooks/table'
  import { Message, Modal } from '@arco-design/web-vue'
  import { reactive } from 'vue'
  import {
    MenuModel,
    useTableColumn,
    useFormItems,
    useMenuModel,
    useForm,
  } from './hooks/menuHookes'
  import { useModelDialog } from '@/components/ModalDialog/useModalDialog'
  interface TreeItem {
    title: string
    key: string
    children?: TreeItem[]
  }
  export default defineComponent({
    name: 'Menu',
    setup() {
      const expandedKeys = reactive<number[]>([])
      const table = useTable()
      const treeData = ref<Array<TreeItem>>([])
      const dataForm = ref()
      const rowKey = useRowKey('id')
      const { formModel, clearFormModel, setFormModel, getFormModel } = useMenuModel()
      const { columns } = useTableColumn()
      const { formItems, setParentOptions, setFormItemDisabled } = useFormItems(formModel)
      const { menuFormRef, clearValidate } = useForm()
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
        handleData(res.data)
        setParentOptions(res.data)
        table.handleSuccess(res)
      }
      function handleData(data: Array<any>) {
        data.forEach((it) => {
          if (it.children && it.children.length > 0) {
            expandedKeys.push(it.id)
            handleData(it.children)
          } else {
            delete it.children
          }
        })
      }
      function onAddItem() {
        setDialogTitle('添加菜单')
        clearFormModel()
        clearValidate()
        setFormItemDisabled('pid', false)
        setFormItemDisabled('type', false)
        showModalDialog()
      }
      function onUpdateItem(item: MenuModel) {
        setDialogTitle('编辑菜单')
        clearValidate()
        setFormItemDisabled('pid', true)
        setFormItemDisabled('type', true)
        setFormModel(item)
        showModalDialog()
      }
      async function onConfirm() {
        try {
          startDialogLoading()
          const model = getFormModel()
          console.log(model)

          // const res = await post({
          //   url: model.id ? updateMenu : createMenu,
          //   data: model,
          // })
          // if (res.code === 200) {
          //   Message.success(dialogTitle.value + '成功')
          //   closeModalDialog()
          //   doRefresh()
          // }
        } catch (error: any) {
          closeDialogLoading()
          Message.error(error.message)
        }
      }
      function onDeleteItem(item: any) {
        Modal.confirm({
          title: '提示',
          content: '是否要删除此数据？',
          okText: '删除',
          cancelText: '取消',
          onOk: () => {
            Message.success('模拟删除成功，参数为：' + JSON.stringify(item))
          },
        })
      }
      onMounted(doRefresh)
      return {
        rowKey,
        dialogTitle,
        submitLoading,
        expandedKeys,
        modalDialogRef,
        dataForm,
        menuFormRef,
        ...table,
        treeData,
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
<style lang="less" scoped>
  :deep(.arco-table-cell-expand-icon) {
    justify-content: space-around;
  }
</style>
