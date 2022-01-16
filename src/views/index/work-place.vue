<template>
  <div class="main-container">
    <a-card
      title="工作台"
      :bodyStyle="{ padding: '10px' }"
      :headStyle="{ padding: '0 10px' }"
      size="small"
      :bordered="false"
      class="card-border-radius"
    >
      <a-row class="margin-top" wrap>
        <a-col :xs="24" :sm="16" :md="16" :lg="16" :xl="14">
          <div class="flex justify-center items-center">
            <div class="avatar-wrapper">
              <img :src="avatar" />
            </div>
            <div class="flex flex-col justify-around ml-3.5 flex-1">
              <div class="text-lg">早上好，Andy，青春只有一次，别让自己过得不精彩</div>
              <div class="text-sm text-gray-500 mt-1">今日有小雨，出门别忘记带伞哦~</div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="8" :md="8" :lg="8" :xl="10">
          <div class="flex justify-end items-center h-full w-full mt-4">
            <div class="flex flex-col justify-around align-end item-action">
              <div class="text-gray">项目数</div>
              <div class="text-lg mt-2">12</div>
            </div>
            <div class="flex flex-col justify-around align-end item-action">
              <div class="text-gray">待办项</div>
              <div class="text-lg mt-2">3/20</div>
            </div>
            <div class="flex flex-col justify-around align-end item-action">
              <div class="text-gray">当前日期</div>
              <div class="text-lg mt-2">{{ currentDate }}</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <div class="mt-3"></div>
    <a-row :gutter="[20, 10]">
      <a-col
        :xs="12"
        :sm="8"
        :md="8"
        :xl="4"
        :xxl="4"
        v-for="(item, index) of fastActions"
        :key="index"
      >
        <a-card
          @click="fastActionClick(item)"
          class="flex flex-col items-center justify-center fast-item-wrapper"
          :bordered="false"
        >
          <a-space direction="vertical" align="center">
            <component :is="item.icon" :style="{ color: item.color, fontSize: '28px' }" />
            <span class="mt-8 text-md">{{ item.title }}</span>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
    <div class="mt-3"></div>
    <a-row :gutter="[20, 10]">
      <a-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="8"
        :xl="8"
        v-for="(item, index) of dataItems"
        :key="index"
      >
        <a-card class="card-border-radius" size="small" :bordered="false">
          <ProjectItem class="flex-1 ml-2" :item="item" />
        </a-card>
      </a-col>
    </a-row>
    <div class="mt-3">
      <a-row :gutter="20">
        <a-col :xs="24" :sm="16" :md="16" :lg="16" :xl="16">
          <a-card
            :body-style="{ padding: '0px' }"
            :bordered="false"
            class="card-border-radius"
            title="项目进度"
          >
            <a-table :data="dataList" :pagination="false" :bordered="false">
              <template #columns>
                <a-table-column data-index="projectName" title="项目名"></a-table-column>
                <a-table-column data-index="beginTime" title="开始时间"></a-table-column>
                <a-table-column data-index="endTime" title="结束时间"></a-table-column>
                <a-table-column data-index="progress" title="进度">
                  <template #cell="{ record }">
                    <a-tag>
                      {{ record.progress + '%' }}
                    </a-tag>
                  </template>
                </a-table-column>
                <a-table-column data-index="status" title="状态">
                  <template #cell="{ record }">
                    <a-tag
                      :color="record.progress < 100 ? 'red' : 'green'"
                      :loading="record.progress < 100"
                    >
                      {{ record.status }}
                    </a-tag>
                  </template>
                </a-table-column>
              </template>
            </a-table>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
          <a-card
            :body-style="{ padding: '0px' }"
            :bordered="false"
            class="card-border-radius"
            title="消息列表"
          >
            <a-list :bordered="false">
              <a-list-item>
                <a-list-item-meta
                  v-for="(item, index) of messageList"
                  :key="index"
                  :title="item.name"
                  :description="item.content"
                >
                  <template #avatar>
                    <a-avatar :size="32" :style="{ backgroundColor: '#3370ff' }">
                      <IconUser />
                    </a-avatar>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
  import ProjectItem from './components/ProjectItem.vue'
  import TodoItem from './components/TodoItem.vue'
  import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { random } from 'lodash'
  import useUserStore from '@/store/modules/user'
  const COLORS = ['#67C23A', '#E6A23C', '#F56C6C', '#409EFF']
  const date = new Date()
  export default defineComponent({
    name: 'WorkPlace',
    components: {
      ProjectItem,
      TodoItem,
    },
    setup() {
      const userStore = useUserStore()
      const avatar = computed(() => userStore.avatar)
      const tempWaitingItems = reactive([] as Array<any>)
      const router = useRouter()
      const fastActionClick = ({ path = '/' }) => {
        router.push(path)
      }
      const dataList = [
        {
          key: '1',
          projectName: 'Vue Admin Work A 开发',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 100,
          status: '完成',
        },
        {
          key: '2',
          projectName: '官网开发',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 90,
          status: '进行中',
        },
        {
          key: '3',
          projectName: '文档编写',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 80,
          status: '进行中',
        },
        {
          key: '4',
          projectName: 'X 版升级',
          beginTime: '2021-12-01',
          endTime: '2025-12-31',
          progress: 50,
          status: '进行中',
        },
        {
          key: '5',
          projectName: 'Admin Work版升级',
          beginTime: '2021-12-01',
          endTime: '2025-12-31',
          progress: 50,
          status: '进行中',
        },
        {
          key: '6',
          projectName: '基础版升级',
          beginTime: '2021-12-01',
          endTime: '2025-12-31',
          progress: 50,
          status: '进行中',
        },
      ]
      return {
        tempWaitingItems,
        avatar,
        currentDate: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(),
        dataItems: [
          {
            title: 'Vue Admin Work A',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work-a',
          },
          {
            title: 'Vue Admin Work P',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work-p',
          },
          {
            title: 'Arco Work',
            target: 'http://qingqingxuan.gitee.io/arco-work',
          },
        ],
        fastActions: [
          {
            title: '首页',
            icon: 'icon-dashboard',
            path: '/',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '系统管理',
            path: '/system/department',
            icon: 'icon-settings',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '列表',
            path: '/list/table-custom',
            icon: 'icon-list',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '表单',
            path: '/form/base-form-view',
            icon: 'icon-edit',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '多级菜单',
            path: '/next/menu2/menu-2-1/menu-2-1-1',
            icon: 'icon-share-alt',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '更多功能',
            path: '/other/chart/icons',
            icon: 'icon-apps',
            color: COLORS[random(0, COLORS.length)],
          },
        ],
        dataList,
        messageList: [
          {
            name: '杰轮',
            content: '哎哟，不错哦~',
          },
          {
            name: 'Thomas',
            content: '继续加油，给大家带来更好的作品',
          },
          {
            name: '主管',
            content: '下班不准走，今天要996……',
          },
          {
            name: '老板',
            content: '天天要996，你们加油，我再买个大房子',
          },
          {
            name: '铁子',
            content: '晚上8点，记得搓澡',
          },
        ],
        fastActionClick,
      }
    },
  })
</script>

<style lang="less" scoped>
  .avatar-wrapper {
    width: 3rem;
    height: 3rem;
    max-width: 3rem;
    max-height: 3rem;
    min-width: 3rem;
    min-height: 3rem;
    & > img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid yellowgreen;
    }
  }
  .item-action {
    position: relative;
    padding: 0 30px;
  }
  .item-action::after {
    position: absolute;
    top: 20%;
    right: 0;
    height: 60%;
    content: '';
    display: block;
    width: 1px;
    background-color: var(--border-color);
  }
  div.item-action:last-child::after {
    width: 0;
  }
  .fast-item-wrapper {
    height: 80px;
    border-radius: 8px;
    .anticon {
      font-size: 20px;
    }
  }
  .fast-item-wrapper:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px #ddd;
  }
</style>
