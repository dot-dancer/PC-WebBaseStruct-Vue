import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { resolve } from 'path'

// --[ element-plus 按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// --]

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    
    // --[ element-plus 按需引入
    AutoImport({resolvers: [ElementPlusResolver()]}),
    Components({resolvers: [ElementPlusResolver()], directoryAsNamespace: true,}),
    // -- element-plus 按需引入 ]

    // -- [ 在setup模式下使用Options API 
    DefineOptions(),
    // --]
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
  },
  // vite 中使用 less/scss/sass/stylus 等 css 预处理器, 直接进行安装，不用像 webpack 那样安装 loader 和配置
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@use "@/assets/styles/global-scss-var.scss" as *;`,
      },
    },
    // vite 中已集成了 postcss
    // https://vitejs.cn/config/#css-postcss
    postcss: {
      plugins: [require('autoprefixer')({
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'ff > 31',
          'ie >= 8',
          '> 1%',
        ],
        grid: true,
      }), {
        // 去除警告: [WARNING] "@charset" must be the first rule in the file
        postcssPlugin: 'internal:charset-removal',
        AtRule: {
          charset: (atRule) => {
            if (atRule.name === 'charset') {
              atRule.remove();
            }
          }
        }
      }],
    },
  },
  build: {
    // 生产环境移除console
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      // 将 js 和 css 文件夹分离
      // https://github.com/vitejs/vite/issues/3815
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  server: {
    port: 882,
    cors: true,
  },
})
