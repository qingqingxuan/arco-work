import vue from '@vitejs/plugin-vue'
import viteSvgIcons from 'vite-plugin-svg-icons'
import path from 'path'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'
import vueJsx from '@vitejs/plugin-vue-jsx'
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
      viteSvgIcons({
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      vueJsx(),
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
      proxy: {
        [dotenvObj?.VITE_PROXY_API || '']: {
          target: 'http://localhost:8080/',
          rewrite: (path) => path.replace(dotenvObj?.VITE_PROXY_API || '', ''),
        },
      },
    },
    // optimizeDeps: {
    //   include: [
    //     'vue',
    //     'lodash',
    //     '@arco-design/web-vue',
    //     '@arco-design/web-vue/es/icon',
    //     'pinia',
    //     'vue-router',
    //   ],
    // },
  }
})
