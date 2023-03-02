<template>
  <div class="chart-item-container">
    <div ref="channelsChart" class="chart-item"> </div>
  </div>
</template>

<script lang="ts">
  import useEcharts from '@/hooks/useEcharts'
  import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
  import { dispose } from 'echarts/core'
  export default defineComponent({
    name: 'EnrollmentChannelsChart',
    setup() {
      const loading = ref(true)
      const channelsChart = ref<HTMLDivElement | null>(null)
      const init = () => {
        const option = {
          grid: {
            left: '12%',
            right: '5%',
            top: '5%',
            bottom: '3%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 2,
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '16',
                  fontWeight: 'bold',
                },
              },
              labelLine: {
                show: true,
                length: 5,
                length2: 5,
                smooth: true,
              },
              data: [
                { value: 1969, name: '线上' },
                { value: 743, name: '互推' },
                { value: 1594, name: '电话' },
                { value: 1347, name: '地推' },
                { value: 635, name: '直播' },
              ],
            },
          ],
        }
        setTimeout(() => {
          loading.value = false
          nextTick(() => {
            useEcharts(channelsChart.value as HTMLDivElement).setOption(option)
          })
        }, 1000)
      }
      const updateChart = () => {
        useEcharts(channelsChart.value as HTMLDivElement).resize()
      }
      onMounted(init)
      onBeforeUnmount(() => {
        dispose(channelsChart.value as HTMLDivElement)
      })
      return {
        loading,
        channelsChart,
        updateChart,
      }
    },
  })
</script>

<style lang="less" scoped>
  .chart-item-container {
    width: 100%;
    .chart-item {
      height: 100%;
    }
  }
</style>
