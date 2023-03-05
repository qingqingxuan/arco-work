<template>
  <a-card
    :body-style="{ padding: '10px' }"
    :head-style="{ padding: '0 15px' }"
    :title="dataModel.title"
    size="small"
    :bordered="false"
  >
    <div class="title-wrapper">
      {{ title }}
    </div>
    <div style="height: 80px" class="flex flex-col justify-center items-center overflow-hidden">
      <span class="text-bold">
        <a-statistic
          :value="num"
          :value-from="0"
          :start="true"
          animation
          :value-style="{ color: 'rgb(var(' + color + '))' }"
        >
          <template #prefix>
            <icon-arrow-rise />
            <span v-if="prefix">{{ prefix }}</span>
          </template>
          <template #suffix>
            <span v-if="suffix">{{ suffix }}</span>
          </template>
        </a-statistic>
      </span>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue'

  export default defineComponent({
    name: 'DataItem',
    props: {
      dataModel: {
        type: Object,
        default: () => {
          return {}
        },
      },
      title: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      return {
        ...toRefs(props.dataModel),
      }
    },
  })
</script>

<style lang="less" scoped>
  .title-wrapper {
    text-align: center;
    background-color: #f5f5f5;
    padding: 6px;
    font-size: 16px;
    font-weight: bold;
    color: #000;
  }
</style>
