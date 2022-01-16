<template>
  <a-card title="生成二维码">
    <a-row :gutter="[10, 10]" class="mt-4">
      <a-col :span="8">
        <a-card title="带logo" :header-style="{ padding: '5px' }" :body-style="{ padding: 0 }">
          <div class="text-center flex justify-center">
            <canvas id="logoCanvas" width="250" height="250"></canvas>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8" v-for="(item, index) of qrcodeList" :key="index">
        <a-card :title="item.title">
          <div class="text-center">
            <img :src="item.url" class="canvas" style="margin: 0 auto" />
          </div>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import Qrcode from 'qrcode'
  import logo from '@/assets/logo.png'
  import { Message } from '@arco-design/web-vue'
  interface QrcodeItem {
    title: string
    url: string
  }
  export default defineComponent({
    name: 'Qrcode',
    setup() {
      const qrText = ref('')
      const qrUrl = ref('')
      const qrcodeList = reactive([] as Array<QrcodeItem>)
      const generatorCode = (it: any) => {
        if (!qrText.value) {
          Message.error('请输入二维码文本内容')
          return
        }
        Qrcode.toDataURL(qrText.value, {
          width: 250,
          margin: it.margin,
          color: {
            dark: it.darkColor,
            light: it.lightColor,
          },
        }).then((res: any) => {
          qrcodeList.push({
            title: it.title,
            url: res,
          } as QrcodeItem)
        })
      }
      const generatorCodeWithLogo = () => {
        const canvas = document.getElementById('logoCanvas') as HTMLCanvasElement
        Qrcode.toCanvas(canvas, qrText.value, {
          width: 250,
        }).then(() => {
          const context = canvas.getContext('2d')
          const img = new Image()
          const x = (canvas.getBoundingClientRect().width - 50) / 2
          img.src = logo
          img.onload = () => {
            context?.drawImage(img, x, x, 50, 50)
          }
        })
      }
      onMounted(() => {
        qrText.value = 'arco work'
        ;[
          {
            title: '普通样式',
            lightColor: '',
            darkColor: '',
          },
          {
            title: '前景色样式',
            lightColor: '',
            darkColor: '#ff0000',
          },
          {
            title: '背景色样式',
            lightColor: '#ffff00',
            darkColor: '',
          },
          {
            title: '混合样式',
            lightColor: '#ffff00',
            darkColor: '#ff0000',
          },
          {
            title: '小间距',
            margin: 10,
            lightColor: '#409eff',
            darkColor: '',
          },
        ].forEach(generatorCode)
        generatorCodeWithLogo()
      })
      return {
        qrcodeList,
        qrText,
        logo,
        qrUrl,
      }
    },
  })
</script>

<style lang="less" scoped>
  .content-wrappar {
    .canvas {
      width: 250px !important;
      height: 250px !important;
      border: 2px solid #f5f5f5;
    }
    .setting-wrapper {
      width: 50%;
      .label {
        width: 50px;
      }
      .slider-wrapper {
        width: 100%;
      }
    }
  }
</style>
