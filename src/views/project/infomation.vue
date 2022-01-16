<template>
  <a-space direction="vertical" class="w-full">
    <a-card size="small">
      <div class="text-lg">
        <span> 当前版本号：{{ version }} </span>
      </div>
    </a-card>

    <a-card :body-style="{ padding: '10px' }">
      <a-descriptions bordered :column="3" title="构建依赖" :data="dependenciesList">
      </a-descriptions>
    </a-card>
    <a-card :body-style="{ padding: '10px' }">
      <a-descriptions bordered :column="3" title="开发依赖" :data="devDependenciesList">
      </a-descriptions>
    </a-card>
  </a-space>
</template>

<script lang="ts" setup>
  import { useLayoutStore } from '@/layouts'
  import useAppInfo from '@/hooks/useAppInfo'
  import { onMounted, reactive, ref } from 'vue'
  const { version, dependencies, devDependencies } = useAppInfo()
  const showContact = ref(false)
  const state = useLayoutStore().state
  const dependenciesList = reactive<Record<string, string>[]>([])
  const devDependenciesList = reactive<Record<string, string>[]>([])
  onMounted(() => {
    const depValues = Object.values(dependencies)
    Object.keys(dependencies).map((it, index) => {
      dependenciesList.push({
        label: it,
        value: depValues[index],
      })
    })
    const devDepValues = Object.values(devDependencies)
    Object.keys(devDependencies).map((it, index) => {
      devDependenciesList.push({
        label: it,
        value: devDepValues[index],
      })
    })
  })
</script>
