<template>
  <a-card
    hoverable
    :headStyle="{ padding: '0 10px' }"
    title="上半年销售业绩图（单位：万）"
    size="small"
    :style="{ height: '100%' }"
  >
    <div class="chart-item-container">
      <a-skeleton animation v-if="loading">
        <a-skeleton-line :rows="4" />
      </a-skeleton>
      <div v-else ref="studentChart" class="chart-item"> </div>
    </div>
  </a-card>
</template>

<script lang="ts">
  import useEcharts from '@/hooks/useEcharts'
  import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
  import { dispose } from 'echarts/core'

  export default defineComponent({
    name: 'StudentChart',
    setup() {
      const loading = ref(true)
      const studentChart = ref<HTMLDivElement | null>(null)
      const init = () => {
        const option = {
          grid: {
            left: '2%',
            right: '5%',
            top: '5%',
            bottom: '3%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
          },
          yAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月'],
            axisTick: {
              show: false,
            },
          },
          xAxis: {
            type: 'value',
            boundaryGap: 0,
          },
          series: [
            {
              data: [480, 289, 711, 618, 393, 571, 470],
              type: 'bar',
              smooth: true,
              showSymbol: false,
              barWidth: 'auto',
              label: {
                show: true,
                formatter(val: any) {
                  return val.data + '万'
                },
              },
            },
          ],
        }
        setTimeout(() => {
          loading.value = false
          nextTick(() => {
            useEcharts(studentChart.value as HTMLDivElement).setOption(option)
          })
        }, 1000)
      }
      const updateChart = () => {
        useEcharts(studentChart.value as HTMLDivElement).resize()
      }
      onMounted(init)
      onBeforeUnmount(() => {
        dispose(studentChart.value as HTMLDivElement)
      })
      return {
        loading,
        updateChart,
        studentChart,
      }
    },
  })
</script>

<style lang="less" scoped>
  .chart-item-container {
    width: 100%;
    height: 90%;
    height: 250px;
    .chart-item {
      height: 100%;
    }
  }
</style>
