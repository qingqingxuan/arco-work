<template>
  <a-popover :style="{ width: '200px' }" trigger="click">
    <template #content>
      <div style="border-bottom: 1px solid #f5f5f5" class="flex items-center justify-between">
        <a-checkbox v-model="allChecked" @change="onAllChange"> 全选 </a-checkbox>
        <a-button type="text" class="text-right" @click="onReset"> 重置 </a-button>
      </div>
      <draggable
        :list="innerTableProps"
        animation="500"
        tag="transition-group"
        item-key="key"
        @end="onUpdateValue"
      >
        <template #item="{ element }">
          <div class="flex pt-2 pb-2">
            <a-checkbox v-model="element.checked" :label="element.prop" @change="onChange">
              {{ element.title }}
            </a-checkbox>
            <div class="flex-1"></div>
            <icon-menu />
          </div>
        </template>
      </draggable>
    </template>
    <a-button type="primary" size="small" shape="circle">
      <template #icon>
        <icon-settings />
      </template>
    </a-button>
  </a-popover>
</template>

<script lang="ts">
  import { TablePropsType } from '@/types/components'
  import { defineComponent, PropType, reactive, ref, toRef } from 'vue'
  import draggable from 'vuedraggable'
  export default defineComponent({
    name: 'SortableTable',
    components: { draggable },
    props: {
      columns: {
        type: Array as PropType<TablePropsType[]>,
        require: true,
      },
    },
    emits: ['update'],
    setup(props, { emit }) {
      const tempTableProps = toRef(props, 'columns')
      const tempArray =
        tempTableProps.value
          ?.filter((it) => !!it.key)
          .map((it) => {
            return {
              ...it,
              checked: ref(true),
            } as TablePropsType
          }) || []
      const innerTableProps = reactive(tempArray)
      const isIndeterminate = ref(
        innerTableProps.filter((it) => it.checked).length !== innerTableProps.length
      )
      const allChecked = ref(innerTableProps.every((it) => it.checked))
      function onAllChange(value: any) {
        innerTableProps.forEach((it) => (it.checked = value?.target?.checked))
        emit(
          'update',
          innerTableProps.filter((it) => it.checked)
        )
      }
      const onChange = () => {
        const checkedItems = innerTableProps.filter((it) => it.checked)
        allChecked.value = checkedItems.length === innerTableProps.length
        isIndeterminate.value =
          checkedItems.length > 0 && checkedItems.length !== innerTableProps.length
        emit('update', checkedItems)
      }
      const onReset = () => {
        innerTableProps.forEach((it) => (it.checked = true))
        onChange()
      }
      function onUpdateValue() {
        emit('update', innerTableProps)
      }
      return {
        innerTableProps,
        isIndeterminate,
        allChecked,
        onAllChange,
        onChange,
        onReset,
        onUpdateValue,
      }
    },
  })
</script>
