<template>
  <div>
    <a-row :gutter="[10, 10]">
      <a-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        :xxl="6"
        :xxxl="4"
        v-for="item of dataList"
        :key="item.id"
        class="col-item"
      >
        <a-card hoverable>
          <template #cover>
            <div
              :style="{
                height: '204px',
                overflow: 'hidden',
              }"
            >
              <img
                :style="{ height: '100%', 'object-fit': 'cover' }"
                :src="'http://qingqingxuan.gitee.io/img/demo-x-' + item.image + '.png'"
              />
            </div>
          </template>
          <a-card-meta :title="item.title">
            <template #description>
              <div class="mt-1">
                {{ item.description }}
              </div>
              <div class="flex justify-between align-center margin-top-xs">
                <span class="text-df text-gray">
                  {{ item.time }}
                </span>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
    <br />
    <TableFooter :pagination="pagination" />
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getCardList } from '@/api/url'
  import { usePagination, useTable } from '@/hooks/table'
  import { defineComponent, onMounted } from 'vue'
  export default defineComponent({
    name: 'CardList',
    setup() {
      const pagination = usePagination(doRefresh)
      const table = useTable()
      function doRefresh() {
        post({
          url: getCardList,
          data: () => {
            return {
              page: pagination.page,
              pageSize: pagination.pageSize,
            }
          },
        })
          .then((res) => {
            table.handleSuccess(res)
            pagination.setTotalSize(res.totalSize || 10)
          })
          .catch(console.log)
      }
      onMounted(doRefresh)
      return {
        ...table,
        pagination,
      }
    },
  })
</script>

<style lang="less" scoped>
  .goods-title {
    font-size: 16px;
  }
</style>
