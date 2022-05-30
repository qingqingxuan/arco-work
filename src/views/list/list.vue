<template>
  <div>
    <a-card v-for="item of dataList" :key="item.id" content-style="{ padding: '10px' }">
      <a-row class="item-wrapper" :x-gap="10" :y-gap="10" :cols="2">
        <a-col :span="6">
          <div class="header-wrapper">
            <div class="avatar-wrapper">
              <img class="avatar" :src="item.avatar" />
            </div>
            <div class="nick-wrapper">
              <span class="nick-name">{{ item.nickName }}</span>
              <a-rate :default-value="4" readonly />
              <div class="content">
                {{ item.content }}
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="6">
          <div class="content-wrapper">
            <div>时间</div>
            <div>{{ item.time }}</div>
          </div>
        </a-col>
        <a-col :span="12">
          <a-progress :percent="0.5" status="success" />
        </a-col>
      </a-row>
    </a-card>
    <TableFooter :pagination="pagination" />
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getCommentList } from '@/api/url'
  import { usePagination, useTable } from '@/hooks/table'
  import { defineComponent, onMounted } from 'vue'

  export default defineComponent({
    name: 'List',
    setup() {
      const table = useTable()
      const pagination = usePagination(doRefresh)
      function doRefresh() {
        post({
          url: getCommentList,
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
  .item-wrapper {
    padding: 10px;
    .header-wrapper {
      display: flex;
      justify-content: flex-start;
      .avatar-wrapper {
        position: relative;
        .avatar {
          border-radius: 5px;
          width: 70px;
          height: 70px;
          border: 1px solid #f5f5f5;
        }
        .vip {
          position: absolute;
          top: -13px;
          right: -13px;
          width: 30px;
          height: 30px;
          transform: rotate(45deg);
        }
      }
      .nick-wrapper {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
      }
    }
    .content-wrapper {
      text-align: center;
      height: 100%;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
</style>
