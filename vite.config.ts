import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import vueJsx from '@vitejs/plugin-vue-jsx'
import apiServe from 'vite-plugin-api-serve'
// 在正式打包的时候，可以把这两行代码放开
// import Components from 'unplugin-vue-components/vite'
// import { ArcoResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }) => {
  const dotenvConfig = dotenv.config({ path: `./.env.${mode}` })
  const dotenvObj = dotenvConfig.parsed
  return {
    base: dotenvObj?.BUILD_PATH || '/',
    build: {
      outDir: dotenvObj?.BUILD_OUT_DIR || 'dist',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      vueJsx(),
      apiServe()
      // 在正式打包的时候，可以把这三行代码放开
      // Components({
      //   resolvers: [ArcoResolver()],
      // }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "src/styles/variables.less";`,
          modifyVars: {},
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: path.resolve(process.cwd(), 'src') + '/',
        },
      ],
    },
    server: {
      open: true,
      // 如果需要本地代理解决跨域问题，则需要把下面代码注释关闭
      // proxy: {
      //   '/api': {
      //     // 以下为实际请求地址，注意域名部分不要写成 localhost 要用 ip：127.0.0.1 代替
      //     // 如：http://localhost:8888 要写成：http://127.0.0.1:8888
      //     target: 'http://xxxx',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
  }
})
