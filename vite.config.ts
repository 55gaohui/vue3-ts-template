import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression' //生成.gz文件
import postcsspxtoviewport from 'postcss-px-to-viewport'
import autoprefixer from 'autoprefixer'
import { VueHooksPlusResolver } from '@vue-hooks-plus/resolvers'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //自动按需引入
    Components({
      dts: 'types/auto-imports-component.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    //自动vue API
    AutoImport({
      resolvers: [ElementPlusResolver(), VueHooksPlusResolver()],
      dts: 'types/auto-imports-api.d.ts', // 生成配置文件，如果是ts项目，通常我们会把声明文件放在根目录/types中，注意，这个文件夹需要先建好，否则可能导致等下无法往里生成auto-imports.d.ts文件
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true // 默认false, true启用。生成一次就可以，避免每次工程启动都生成，一旦生成配置文件之后，最好把enable关掉，即改成false。否则这个文件每次会在重新加载的时候重新生成，这会导致eslint有时会找不到这个文件。当需要更新配置文件的时候，再重新打开
      }
    }),
    {
      ...viteCompression(),
      apply: 'build' //仅在build生成.gz文件
    }
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      '#': path.join(__dirname, 'types')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx']
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/styles/global.less";'
      }
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', '> 1%']
        }),
        {
          postcssPlugin: 'internal: chartset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'chartset') {
                atRule.remove()
              }
            }
          }
        },
        postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 375, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['el-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          landscape: false // 是否处理横屏情况
        })
      ]
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    https: false,
    proxy: {
      '/api': {
        target: 'http://demonuxtapi.dishait.cn',
        changeOrigin: true,
        ws: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        //插件手动分包
        manualChunks: {
          vue: ['vue', 'pinia', 'vue-router']
        },
        // js和css文件夹分离
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  }
})
