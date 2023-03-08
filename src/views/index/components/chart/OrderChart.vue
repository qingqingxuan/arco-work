<template>
  <div ref="orderChartWrapper" style="height: 100%"> </div>
</template>

<script lang="ts">
  import useEcharts from '@/hooks/useEcharts'
  import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
  import { dispose, graphic } from 'echarts/core'

  export default defineComponent({
    name: 'OrderChart',
    setup() {
      const loading = ref(true)
      const orderChartWrapper = ref<HTMLDivElement | null>(null)
      const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      const init = () => {
        const option = {
          grid: {
            top: '5%',
            left: '5%',
            right: '5%',
            bottom: '5%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: weeks,
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#98A3B2',
                width: 0,
                type: 'solid',
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                fontSize: 10,
              },
            },
          },
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                textStyle: {
                  fontSize: 10,
                },
              },
              splitLine: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#98A3B2',
                  width: 0,
                  type: 'solid',
                },
              },
            },
          ],
          series: [
            {
              data: [82, 93, 90, 74, 82, 60, 50].reverse(),
              type: 'line',
              smooth: false,
              lineStyle: {
                width: 0,
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.5,
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(128, 255, 165)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(1, 191, 236)',
                  },
                ]),
              },
            },
          ],
        }
        setTimeout(() => {
          loading.value = false
          nextTick(() => {
            useEcharts(orderChartWrapper.value as HTMLDivElement).setOption(option)
          })
        }, 100)
      }
      const updateChart = () => {
        useEcharts(orderChartWrapper.value as HTMLDivElement).resize()
      }
      onMounted(init)
      onBeforeUnmount(() => {
        dispose(orderChartWrapper.value as HTMLDivElement)
      })
      return {
        loading,
        orderChartWrapper,
        updateChart,
      }
    },
  })
</script>
