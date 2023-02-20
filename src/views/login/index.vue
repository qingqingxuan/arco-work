<template>
  <div class="login-container">
    <div class="center">
      <div class="left">
        <img :src="logo" />
        <div class="proj-name">{{ projectName }} 管理系统</div>
        <div class="desc">Vue3 + Vite + Typescript + Arco Design</div>
        <div class="bottom">{{ projectName + '    ' + version }} · Made by qingqingxuan</div>
      </div>
      <div class="form-wrapper">
        <div class="title">账号登录</div>
        <div class="item-wrapper mt-6">
          <a-input v-model="username" placeholder="请输入用户名/手机号" allow-clear size="large">
            <template #prefix>
              <icon-mobile />
            </template>
          </a-input>
        </div>
        <div class="item-wrapper mt-4">
          <a-input-password v-model="password" placeholder="请输入密码" allow-clear size="large">
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </div>
        <div class="flex-1"></div>
        <div class="mt-10">
          <a-button type="primary" class="login" :loading="loading" @click="onLogin">
            登录
          </a-button>
        </div>
        <div class="my-width flex-1 mt-4 mb-8">
          <div class="flex justify-between">
            <a-checkbox v-model="autoLogin">自动登录</a-checkbox>
            <a-link :underline="false" type="primary">忘记密码？</a-link>
          </div>
        </div>
        <a-divider orientation="center">第三方登录</a-divider>
        <div class="text-center text-lg">
          <icon-alipay-circle />
          <icon-github class="mr-6 ml-6" />
          <icon-weibo-circle-fill />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ImageBg1 from '@/assets/img_login_bg_01.png'
  import logo from '@/assets/logo.png'
  import { post, Response } from '@/api/http'
  import { login } from '@/api/url'
  import { Message } from '@arco-design/web-vue'
  import { UserState } from '@/store/types'
  import setting from '../../setting'
  import useAppInfo from '@/hooks/useAppInfo'
  import useUserStore from '@/store/modules/user'
  export default defineComponent({
    name: 'Login',
    setup() {
      const projectName = setting.projectName
      const { version } = useAppInfo()
      const username = ref('admin')
      const password = ref('123456')
      const autoLogin = ref(true)
      const loading = ref(false)
      const router = useRouter()
      const route = useRoute()
      const userStore = useUserStore()
      const onLogin = () => {
        loading.value = true
        post({
          url: login,
          data: {
            username: username.value,
            password: password.value,
          },
        })
          .then(({ data }: Response) => {
            userStore.saveUser(data as UserState).then(() => {
              router
                .replace({
                  path: route.query.redirect ? (route.query.redirect as string) : '/',
                })
                .then(() => {
                  Message.success('登录成功，欢迎：' + username.value)
                  loading.value = false
                })
            })
          })
          .catch((error) => {
            loading.value = false
            Message.error(error.message)
          })
      }
      return {
        projectName,
        version,
        username,
        password,
        autoLogin,
        loading,
        onLogin,
        ImageBg1,
        logo,
      }
    },
  })
</script>

<style lang="less" scoped>
  @leftWith: 35%;
  .login-container {
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-image: url('../../assets/bg.png');
    .center {
      width: 70%;
      height: 60%;
      border-radius: 10px;
      border: 1px solid #f5f5f5;
      display: flex;
      align-items: center;
      padding: 10px;
      box-shadow: 0 0 5px #ececec;
      .left {
        flex: 1;
        height: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        & > img {
          width: 80px;
          height: 80px;
          margin: 0 auto;
          border: 1px solid #e4e4e4;
          padding: 10px;
          border-radius: 10px;
        }
        .proj-name {
          font-size: 30px;
          font-weight: bold;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .desc {
          text-align: center;
          font-weight: bold;
          color: #333;
        }
        .bottom {
          font-size: 12px;
          color: #333;
          text-align: center;
        }
      }
      .form-wrapper {
        flex: 1;
        padding: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;
        .title {
          font-size: 25px;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }
        .login {
          width: 100%;
        }
      }
    }
  }
  @media screen and(max-width: 966px) {
    .left {
      display: none;
    }
    .right {
      background-image: url('../../assets/img_login_mobile_bg_01.jpg');
      background-size: cover;
      .form-wrapper {
        width: 80% !important;
      }
    }
  }
</style>
