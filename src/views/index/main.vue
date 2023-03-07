<template>
  <div class="main-container">
    <div class="left">
      <div class="item">
        <Title title="销售渠道" />
        <EnrollmentChannelsChart />
      </div>
      <div class="item">
        <Title title="周销售额分析图" />
        <WeekSalesChart />
      </div>
      <div class="item">
        <Title title="热卖产品指数" />
        <HotProductChart />
      </div>
    </div>
    <div class="center">
      <div style="display: flex; flex-direction: column; height: 100%">
        <a-card>
          <CenterTitle />
        </a-card>
        <div class="center-data-item-wrapper">
          <DataItem
            class="item"
            title="周销售金额"
            :data-model="{ num: 1000, prefix: '￥', bg: Bg1 }"
          />
          <DataItem
            class="item"
            title="周增长人数"
            :data-model="{ num: 56100, suffix: '人', bg: Bg2 }"
          />
          <DataItem
            class="item"
            title="周成交单数"
            :data-model="{ num: 3216, suffix: '单', bg: Bg3 }"
          />
        </div>
        <a-card style="flex: 1; overflow: hidden">
          <div style="display: flex; flex-direction: column; height: 100%">
            <Title title="年销售成交额走势图" />
            <FullYearSalesChart style="margin-top: 10px" />
            <div style="flex: 1; overflow: auto">
              <ProjectList />
            </div>
          </div>
        </a-card>
      </div>
    </div>
    <div class="right">
      <div class="item">
        <Title title="招生渠道" />
        <EnrollmentChannelsChart />
      </div>
      <div class="item">
        <Title title="公司各部门人员数量" />
        <DepartmentChart />
        <EnrollmentChannelsChart />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, watch } from 'vue'
  import Title from './components/Title'
  import EnrollmentChannelsChart from './components/chart/EnrollmentChannelsChart.vue'
  import DepartmentChart from './components/chart/DepartmentChart.vue'
  import useAppConfigStore from '@/store/modules/app-config'
  import CenterTitle from './components/CenterTitle.vue'
  import DataItem from './components/DataItem.vue'
  import FullYearSalesChart from './components/chart/FullYearSalesChart.vue'
  import ProjectList from './components/ProjectList.vue'
  import Bg1 from '@/assets/bg_item_1.png'
  import Bg2 from '@/assets/bg_item_2.png'
  import Bg3 from '@/assets/bg_item_3.png'
  import WeekSalesChart from './components/chart/WeekSalesChart.vue'
  import HotProductChart from './components/chart/HotProductChart.vue'
  export default defineComponent({
    name: 'Home',
    components: {
      Title,
      EnrollmentChannelsChart,
      DepartmentChart,
      CenterTitle,
      DataItem,
      FullYearSalesChart,
      ProjectList,
      WeekSalesChart,
      HotProductChart,
    },
    setup() {
      const appStore = useAppConfigStore()
      console.log(appStore.mainHeight)

      const mainHeight = computed(() => {
        return appStore.mainHeight + 'px'
      })

      const onResize = () => {
        setTimeout(() => {}, 500)
      }
      const collapse = computed(() => {
        return appStore.isCollapse
      })
      watch(collapse, () => {
        onResize()
      })
      return {
        Bg1,
        Bg2,
        Bg3,
        mainHeight,
        collapse,
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

<style lang="less" scoped>
  :deep(.arco-card) {
    border-radius: 5px;
    border: none;
    box-shadow: 0px 8px 8px 0px rgba(162, 173, 200, 0.15);
  }
  :deep(.arco-card-body) {
    padding: 0;
    height: 100%;
  }
  :deep(.arco-table-th) {
    background-color: transparent;
  }
  .main-container {
    display: flex;
    height: v-bind(mainHeight);
    overflow: hidden;
    .left {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .item {
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        background: var(--color-bg-2);
        transition: box-shadow 0.2s cubic-bezier(0, 0, 1, 1);
        box-shadow: 0px 8px 8px 0px rgba(162, 173, 200, 0.15);
        div:nth-last-child(1) {
          flex: 1;
        }
      }
      .item + .item {
        margin-top: 10px;
      }
    }
    .center {
      margin: 0 10px;
      flex: 1;
      overflow: hidden;
      .center-data-item-wrapper {
        display: flex;
        margin: 10px 0;
        .item {
          flex: 1;
        }
        .item + .item {
          margin-left: 10px;
        }
      }
    }
    .right {
      width: 25%;
      display: flex;
      flex-direction: column;
      & > div:nth-child(1) {
        flex: 1;
      }
      & > div:nth-child(2) {
        flex: 2;
      }
      .item {
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
        background: var(--color-bg-2);
        border-radius: 5px;
        transition: box-shadow 0.2s cubic-bezier(0, 0, 1, 1);
        box-shadow: 0px 8px 8px 0px rgba(162, 173, 200, 0.15);
        & > div:nth-child(2) {
          flex: 1;
        }
        & > div:nth-child(3) {
          flex: 1;
        }
      }
      .item + .item {
        margin-top: 10px;
      }
    }
  }
</style>
