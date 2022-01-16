<template>
  <a-card
    :body-style="{ padding: '10px' }"
    :head-style="{ padding: '0 15px' }"
    :title="dataModel.title"
    size="small"
    :bordered="false"
    class="card-border-radius"
  >
    <template #extra>
      <component :is="dataModel.icon" :style="{ fontSize: '22px', color: dataModel.color }" />
    </template>
    <a-skeleton animation v-if="loading">
      <a-skeleton-line :rows="4" />
    </a-skeleton>
    <template v-else>
      <div style="height: 100px" class="flex flex-col justify-between overflow-hidden">
        <span class="text-2xl text-bold">
          <a-statistic :value="num" :value-from="0" :start="true" animation>
            <template #prefix>
              <icon-arrow-rise style="color: red" />
              <span v-if="prefix">{{ prefix }}</span>
            </template>
            <template #suffix>
              <span v-if="suffix">{{ suffix }}</span>
            </template>
          </a-statistic>
        </span>
        <div class="flex flex-col justify-center flex-1">
          <slot name="extra" :extra="dataModel.extra"></slot>
        </div>
      </div>
    </template>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'DataItem',
    props: {
      dataModel: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    setup(props) {
      const loading = ref(true)
      const num = parseInt(props.dataModel.data)
      setTimeout(() => {
        loading.value = false
      }, 1000)
      return {
        num,
        loading,
        prefix: props.dataModel.prefix,
        suffix: props.dataModel.suffix,
      }
    },
  })
</script>

<style lang="less" scoped>
  .divide {
    margin: 10px 0;
    border-bottom: 1px solid var(--color-neutral-3);
  }
</style>
