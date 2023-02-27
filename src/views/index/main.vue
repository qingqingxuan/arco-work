<template>
  <div class="main-container">
    <div class="left">
      <a-card> left-top </a-card>
      <a-card> left-center </a-card>
      <a-card> left-bottom </a-card>
    </div>
    <div class="center">
      <a-card> left-top </a-card>
      <a-card> left-center </a-card>
      <a-card> left-bottom </a-card>
    </div>
    <div class="right">
      <a-card> left-top </a-card>
      <a-card> left-center </a-card>
      <a-card> left-bottom </a-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .main-container {
    display: flex;
    height: 100vh;
    .left {
      width: 25%;
      background-color: red;
    }
    .center {
      flex: 1;
      background-color: blue;
    }
    .right {
      width: 25%;
      background-color: green;
    }
  }
</style>

<script lang="ts">
  import DataItem from './components/DataItem.vue'
  import OrderChart from './components/chart/OrderChart.vue'
  import SalesChart from './components/chart/SalesChart.vue'
  import StudentChart from './components/chart/StudentChart.vue'
  import EnrollmentChannelsChart from './components/chart/EnrollmentChannelsChart.vue'
  import FullYearSalesChart from './components/chart/FullYearSalesChart.vue'
  import DepartmentChart from './components/chart/DepartmentChart.vue'
  import { computed, defineComponent, ref, watch } from 'vue'
  import useAppConfigStore from '@/store/modules/app-config'
  export default defineComponent({
    name: 'Home',
    components: {
      DataItem,
      OrderChart,
      SalesChart,
      StudentChart,
      EnrollmentChannelsChart,
      FullYearSalesChart,
      DepartmentChart,
    },
    setup() {
      const appStore = useAppConfigStore()
      const mOrderChart = ref<InstanceType<typeof OrderChart>>()
      const salesChart = ref<InstanceType<typeof SalesChart>>()
      const enrollmentChannelsChart = ref<InstanceType<typeof EnrollmentChannelsChart>>()
      const studentChart = ref<InstanceType<typeof StudentChart>>()
      const fullYearSalesChart = ref<InstanceType<typeof FullYearSalesChart>>()
      const departmentChart = ref<InstanceType<typeof DepartmentChart>>()
      const onResize = () => {
        setTimeout(() => {
          mOrderChart.value?.updateChart()
          salesChart.value?.updateChart()
          enrollmentChannelsChart.value?.updateChart()
          studentChart.value?.updateChart()
          fullYearSalesChart.value?.updateChart()
          departmentChart.value?.updateChart()
        }, 500)
      }
      const collapse = computed(() => {
        return appStore.isCollapse
      })
      watch(collapse, () => {
        onResize()
      })
      return {
        collapse,
        mOrderChart,
        salesChart,
        enrollmentChannelsChart,
        studentChart,
        departmentChart,
        fullYearSalesChart,
        dataList: [
          {
            id: 'visited',
            title: '今日访问量',
            data: '1000',
            prefix: '+',
            bottomTitle: '总访问量',
            totalSum: '100万+',
            icon: 'icon-face-smile-fill',
            color: '#1890ff',
            extra: {
              data: 1000,
              data1: 2350,
            },
          },
          {
            id: 'newAdd',
            title: '新增用户',
            data: '500',
            prefix: '+',
            bottomTitle: '总用户量',
            totalSum: '200万+',
            icon: 'icon-heart-fill',
            color: '#ff0000',
            extra: {
              data: 700,
              data1: 968,
            },
          },
          {
            id: 'sales',
            title: '当月销售额',
            data: '50000',
            prefix: '￥',
            bottomTitle: '累计销售额',
            totalSum: '2000万+',
            color: '#18e3ff',
            icon: 'icon-star-fill',
            extra: {
              data: 0.8,
            },
          },
          {
            id: 'order',
            title: '当月订单量',
            data: '189',
            suffix: '笔',
            bottomTitle: '累计订单量',
            totalSum: '1万+',
            color: '#bbc314',
            icon: 'icon-sun-fill',
            extra: {
              data: 80,
            },
          },
        ],
      }
    },
  })
</script>
