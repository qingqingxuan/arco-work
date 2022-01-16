<template>
  <div class="flex justify-between items-center mt-1.5">
    <span class="tip" :class="[item.status]" v-for="(item, index) of stronger" :key="index"></span>
    <span class="ml-1 mr-1">{{ tipValue }}</span>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from '@vue/reactivity'
  import { watch, ref } from 'vue'

  interface StrongTip {
    status: 'normal' | 'low' | 'middle' | 'strong'
  }

  const props = defineProps({
    inputValue: {
      type: String,
      default: '',
    },
    lowReg: {
      type: RegExp,
      default: /^[0-9]{6,16}$|^[a-zA-Z]{6,16}$/,
    },
    middleReg: {
      type: RegExp,
      default: /^[A-Za-z0-9]{6,16}$/,
    },
    strongReg: {
      type: RegExp,
      default: /^\w{6,16}$/,
    },
  })
  const stronger = reactive<StrongTip[]>([
    {
      status: 'normal',
    },
    {
      status: 'normal',
    },
    {
      status: 'normal',
    },
  ])
  const tipValue = ref('弱')
  watch(
    () => props.inputValue,
    () => {
      if (props.lowReg.test(props.inputValue)) {
        stronger[0].status = 'low'
        stronger[1].status = 'normal'
        stronger[2].status = 'normal'
        tipValue.value = '弱'
      } else if (props.middleReg.test(props.inputValue)) {
        stronger[0].status = 'low'
        stronger[1].status = 'middle'
        stronger[2].status = 'normal'
        tipValue.value = '中'
      } else if (props.strongReg.test(props.inputValue)) {
        stronger[0].status = 'low'
        stronger[1].status = 'middle'
        stronger[2].status = 'strong'
        tipValue.value = '强'
      } else {
        stronger.forEach((it) => (it.status = 'normal'))
      }
    }
  )
</script>
<style scoped lang="less">
  .tip {
    height: 10px;
    border-radius: 2px;
    background-color: #fff;
    width: 28%;
  }
  .normal {
    background-color: #f3f3f3;
  }
  .low {
    background-color: #f00;
  }
  .middle {
    background-color: #dceb0c;
  }
  .strong {
    background-color: #0c94ee;
  }
</style>
