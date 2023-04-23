<template>
  <a-modal v-model:visible="showModal" :title="title" class="modal-dialog-wrapper" draggable>
    <Scrollbar wrap-class="modal-dialog__wrap">
      <slot></slot>
    </Scrollbar>
    <template #footer>
      <a-space>
        <a-button @click="onCancel">取消</a-button>
        <a-button type="primary" :loading="loading" @click="onConfirm">确定</a-button>
      </a-space>
    </template>
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'ModalDialog',
    props: {
      title: {
        type: String,
        default: '操作',
      },
      contentHeight: {
        type: String,
        default: '30vh',
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['confirm', 'cancel'],
    setup(props, { emit, expose }) {
      const showModal = ref(false)
      function toggle() {
        showModal.value = !showModal.value
        return Promise.resolve(showModal.value)
      }
      function show() {
        showModal.value = true
        return Promise.resolve(true)
      }
      function close() {
        showModal.value = false
        return Promise.resolve(false)
      }
      function onConfirm() {
        emit('confirm')
      }
      function onCancel() {
        showModal.value = false
        emit('cancel')
      }
      expose({
        show,
        close,
        toggle,
      })
      return {
        showModal,
        toggle,
        show,
        close,
        onConfirm,
        onCancel,
      }
    },
  })
</script>
<style>
  .modal-dialog__wrap {
    max-height: 80vh;
  }
</style>
