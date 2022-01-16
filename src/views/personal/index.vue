<template>
  <div class="main-container">
    <div class="box-wrapper">
      <div class="flex">
        <a-card
          :bordered="false"
          class="card-border-radius personal-box"
          :body-style="{ padding: '10px' }"
        >
          <div class="info-wrapper">
            <div class="avatar-wrapper">
              <div
                class="avatar"
                :class="{ 'avatar-touch': touched, 'avatar-end': uploaded }"
                @mouseenter="avatarTouchStart"
              >
                <img :src="avatar" />
              </div>
              <div class="flex items-center justify-center camera-layer" @click="uploadAvatar">
                <icon-camera style="color: #fff; font-size: 30px" />
              </div>
            </div>
            <div class="text-xl">
              {{ nickName }}
            </div>
            <div class="des-wrapper">
              <i class="el-icon-edit"></i>
              冰冻三尺，非一日之寒，成大事者不拘小节。
            </div>
            <div class="text-wrapper">
              <div class="label"> 昵称： </div>
              <div class="value"> 蝴蝶飞呀飞 </div>
            </div>
            <div class="text-wrapper">
              <div class="label"> 性别： </div>
              <div class="value"> 男 </div>
            </div>
            <div class="text-wrapper">
              <div class="label"> 生日： </div>
              <div class="value"> 2021-1-1 </div>
            </div>
            <div class="text-wrapper">
              <div class="label"> 部门： </div>
              <div class="value"> 研发部 </div>
            </div>
            <div class="mt-4">
              <a-space align="center" :style="{ flexWrap: 'wrap' }">
                <a-tag color="green" size="small">技术控</a-tag>
                <a-tag color="green" size="small">爱学习</a-tag>
                <a-tag color="green" size="small">大嘴巴</a-tag>
                <a-tag color="green" size="small">宅男</a-tag>
              </a-space>
            </div>
          </div>
        </a-card>
        <a-card
          :bordered="false"
          title="待办事项"
          class="flex-1 card-border-radius wating-box"
          :body-style="{ padding: '10px' }"
        >
          <div v-for="(item, index) of watingJobs" :key="index" class="flex wating-item">
            <div class="flex-1">
              {{ item.title }}
            </div>
            <div style="width: 40px">
              <a-tag :color="item.status === 0 ? 'red' : 'green'" size="mini">
                {{ item.status === 0 ? '未完成' : '已完成' }}
              </a-tag>
            </div>
          </div>
        </a-card>
      </div>
      <div class="mt-2">
        <a-card
          :bordered="false"
          title="消息中心"
          class="card-border-radius flex-sub"
          :body-style="{ padding: '10px' }"
        >
          <template #extra>
            <a-button type="primary" size="mini"> 查看更多 </a-button>
          </template>
          <div
            v-for="(item, index) of messages"
            :key="index"
            class="flex items-center message-wrapper"
          >
            <div
              class="notify"
              :class="{ 'bg-red-500': item.status === 0, 'bg-green-500': item.status === 1 }"
            ></div>
            <div class="flex-1 ml-2">
              <div class="message-title">
                {{ item.title }}
              </div>
              <div class="content">
                {{ item.content }}
              </div>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import useUserStore from '@/store/modules/user'
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'Personal',
    setup() {
      const touched = ref(false)
      const uploaded = ref(false)
      const avatarTouchStart = () => {
        touched.value = true
      }
      const uploadAvatar = () => {
        uploaded.value = true
        setTimeout(() => {
          touched.value = false
          uploaded.value = false
        }, 1000)
      }
      const userStore = useUserStore()
      return {
        touched,
        uploaded,
        messages: [
          {
            title: '重要通知：今天要加班，一堆bug等着修改，请全体家人们注意',
            content:
              '为了配合市场家人们努力开单，从今天开始，技术部及教研老师们要努力加班，全力配合市场的家人们多多开单。谢谢大家的支持与配合。',
            status: 0, // 0未读 1已读
          },
          {
            title: '重要通知：今天要加班，一堆bug等着修改，请全体家人们注意',
            content:
              '为了配合市场家人们努力开单，从今天开始，技术部及教研老师们要努力加班，全力配合市场的家人们多多开单。谢谢大家的支持与配合。',
            status: 1, // 0未读 1已读
          },
          {
            title: '重要通知：今天要加班，一堆bug等着修改，请全体家人们注意',
            content:
              '为了配合市场家人们努力开单，从今天开始，技术部及教研老师们要努力加班，全力配合市场的家人们多多开单。谢谢大家的支持与配合。',
            status: 1, // 0未读 1已读
          },
          {
            title: '重要通知：今天要加班，一堆bug等着修改，请全体家人们注意',
            content:
              '为了配合市场家人们努力开单，从今天开始，技术部及教研老师们要努力加班，全力配合市场的家人们多多开单。谢谢大家的支持与配合。',
            status: 1, // 0未读 1已读
          },
        ],
        watingJobs: [
          {
            title: '和朋友同事一起玩王者，吃鸡',
            status: 0, // 0未完成，1已完成
          },
          {
            title: '下班写今日总结',
            status: 1, // 0未完成，1已完成
          },
          {
            title: '中午打卡，吃饭，下去买一瓶快乐水',
            status: 0, // 0未完成，1已完成
          },
          {
            title: '给项目经理演示项目成果，汇报项目进度，查看同事新提交的bug',
            status: 1, // 0未完成，1已完成
          },
          {
            title: '上班打卡',
            status: 0, // 0未完成，1已完成
          },
          {
            title: '和朋友同事一起玩王者，吃鸡',
            status: 0, // 0未完成，1已完成
          },
          {
            title: '下班写今日总结',
            status: 1, // 0未完成，1已完成
          },
          {
            title: '中午打卡，吃饭，下去买一瓶快乐水',
            status: 0, // 0未完成，1已完成
          },
          {
            title: '给项目经理演示项目成果，汇报项目进度，查看同事新提交的bug',
            status: 1, // 0未完成，1已完成
          },
          {
            title: '上班打卡',
            status: 0, // 0未完成，1已完成
          },
        ],
        avatar: userStore.avatar,
        nickName: userStore.nickName,
        avatarTouchStart,
        uploadAvatar,
      }
    },
  })
</script>
<style lang="less" scoped>
  .box-wrapper {
    .personal-box {
      width: 30%;
      .info-wrapper {
        text-align: center;
        .avatar-wrapper {
          display: inline-block;
          width: 6rem;
          height: 6rem;
          margin-top: 20px;
          position: relative;
          .avatar {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            transform-origin: bottom;
            transform: rotate(0deg);
            z-index: 1;
            transition: all 0.5s ease-in-out;
            & > img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              border: 2px solid rgb(245, 241, 7);
            }
          }
          .avatar-touch {
            transform: rotate(180deg);
          }
          .avatar-end {
            transform: rotate(0deg);
          }
          .camera-layer {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 50%;
          }
        }
        .des-wrapper {
          width: 70%;
          margin: 0 auto;
          font-size: 14px;
          padding: 15px;
        }
        .text-wrapper {
          font-size: 0.8rem;
          margin-top: 20px;
          width: 50%;
          margin: 0 auto;
          .label {
            display: inline-block;
            width: 40%;
            text-align: right;
          }
          .value {
            display: inline-block;
            width: 60%;
            text-align: left;
          }
        }
        .text-wrapper + .text-wrapper {
          margin-top: 15px;
        }
      }
    }
    .message-wrapper {
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: 10px;
      .notify {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      .message-title {
        font-size: 14px;
      }
      .content {
        font-size: 12px;
        margin-top: 10px;
        line-height: 1rem;
      }
    }
    .message-wrapper + .message-wrapper {
      margin-top: 10px;
    }
    .wating-box {
      width: 30%;
      margin-left: 10px;
      .wating-item {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
      }
    }
  }
</style>
