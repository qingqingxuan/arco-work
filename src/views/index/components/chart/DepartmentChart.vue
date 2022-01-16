<template>
  <a-card
    :body-style="{ padding: '10px' }"
    :head-style="{ padding: '0 10px' }"
    title="公司各部门人员数量"
    class="card-border-radius"
    :bordered="false"
  >
    <div class="chart-item-container">
      <a-skeleton animation v-if="loading">
        <a-skeleton-line :rows="4" />
      </a-skeleton>
      <template v-else>
        <div ref="departmentChart" class="chart-item"> </div>
      </template>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
  import useEcharts from '@/hooks/useEcharts'
  import { dispose, graphic } from 'echarts/core'
  export default defineComponent({
    name: 'DepartmentChart',
    setup() {
      const loading = ref(true)
      const departmentChart = ref<HTMLDivElement | null>(null)
      const init = () => {
        const option = {
          tooltip: {
            trigger: 'item',
          },
          radar: {
            name: {
              textStyle: {
                color: '#333',
                fontSize: 10,
                backgroundColor: '#f5f5f5',
                borderRadius: 3,
                padding: [3, 5],
              },
            },
            indicator: [
              { name: '销售', max: 50 },
              { name: '管理', max: 5 },
              { name: '技术', max: 4 },
              { name: '客服', max: 3 },
              { name: '人资', max: 5 },
              { name: '运营', max: 10 },
            ],
            radius: 60,
            nameGap: 8,
          },
          series: [
            {
              name: '公司部门人员配备',
              type: 'radar',
              data: [
                {
                  value: [30, 3, 4, 3, 5, 8],
                  itemStyle: {
                    color: '#a8efeb',
                  },
                  areaStyle: {
                    opacity: 0.8,
                    color: new graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: 'rgba(234, 214, 238, 1)',
                      },
                      {
                        offset: 1,
                        color: 'rgba(168, 239, 235, 1)',
                      },
                    ]),
                  },
                },
              ],
            },
          ],
        }
        setTimeout(() => {
          loading.value = false
          nextTick(() => {
            const echartInstance = useEcharts(departmentChart.value as HTMLDivElement)
            echartInstance.setOption(option)
          })
        }, 1000)
      }
      const updateChart = () => {
        useEcharts(departmentChart.value as HTMLDivElement).resize()
      }
      onMounted(init)
      onBeforeUnmount(() => {
        dispose(departmentChart.value as HTMLDivElement)
      })
      return {
        loading,
        departmentChart,
        updateChart,
      }
    },
  })
</script>

<style lang="less" scoped>
  .chart-item-container {
    width: 100%;
    .chart-item {
      height: 30vh;
    }
  }
</style>
