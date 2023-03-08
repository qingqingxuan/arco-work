<template>
  <div class="chart-item-container">
    <div ref="fullYearSalesChart" class="chart-item"></div>
  </div>
</template>
<script lang="ts">
  import useEcharts from '@/hooks/useEcharts'
  import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
  import { dispose, graphic } from 'echarts/core'
  import { random } from 'lodash-es'
  function getData() {
    const data: number[] = []
    while (data.length < 12) {
      data.push(random(80, 250))
    }
    return data
  }
  const months = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ]
  export default defineComponent({
    name: 'FullYearSalesChart',
    setup() {
      const loading = ref(true)
      const fullYearSalesChart = ref<HTMLDivElement | null>(null)
      let interval: any = null
      const init = () => {
        const option = {
          color: ['rgba(64, 58, 255)'],
          grid: {
            top: '5%',
            left: '2%',
            right: '2%',
            bottom: '4%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: months,
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
          },
          yAxis: {
            type: 'value',
            max: 300,
            splitLine: { show: false },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#98A3B2',
                width: 0,
                type: 'solid',
              },
            },
          },
          series: [
            {
              type: 'line',
              name: '全年销售额',
              stack: '总量',
              data: getData(),
              symbolSize: 0,
              smooth: true,
              lineStyle: {
                width: 5,
                shadowColor: '#999', //设置折线阴影
                shadowBlur: 10,
                shadowOffsetY: 5,
              },
              itemStyle: {
                color: new graphic.LinearGradient(1, 0, 0, 0, [
                  { offset: 0, color: '#D860FF' },
                  { offset: 0.5, color: '#3CA6FF' },
                  { offset: 1, color: '#00FDAD' },
                ]),
              },
            },
          ],
        }
        setTimeout(() => {
          loading.value = false
          setTimeout(() => {
            nextTick(() => useEcharts(fullYearSalesChart.value as HTMLDivElement).setOption(option))
          }, 100)
        }, 1000)
      }
      const updateChart = () => {
        useEcharts(fullYearSalesChart.value as HTMLDivElement).resize()
      }
      onMounted(init)
      onBeforeUnmount(() => {
        dispose(fullYearSalesChart.value as HTMLDivElement)
        clearInterval(interval)
      })
      return {
        loading,
        fullYearSalesChart,
        updateChart,
      }
    },
  })
</script>

<style lang="less" scoped>
  .chart-item-container {
    width: 100%;

    .chart-item {
      height: 20vh;
    }
  }
</style>
