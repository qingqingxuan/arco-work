import type { ModalDialogType } from '@/types/components'
import { ref, unref } from 'vue'

export function useModelDialog() {
  const modalDialogRef = ref<ModalDialogType | null>(null)
  const submitLoading = ref<boolean>(false)
  const dialogTitle = ref<string>('')
  function startDialogLoading() {
    submitLoading.value = true
  }
  function closeDialogLoading() {
    submitLoading.value = false
  }
  function showModalDialog() {
    unref(modalDialogRef).show()
  }
  function closeModalDialog() {
    closeDialogLoading()
    unref(modalDialogRef).close()
  }
  function setDialogTitle(title: string) {
    dialogTitle.value = title
  }
  return {
    modalDialogRef,
    submitLoading,
    dialogTitle,
    showModalDialog,
    closeModalDialog,
    startDialogLoading,
    closeDialogLoading,
    setDialogTitle,
  }
}
