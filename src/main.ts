import { createApp } from 'vue'
import { initApp, initGlobalComponents } from './config/init'
import { initStore } from './store'
import { initRouter } from './router'
import App from './App.vue'
import './assets/fonts/iconfont.css'
import './assets/styles/over-el-plus.scss'
import './assets/styles/theme.scss'
import './assets/styles/global.scss'

(async () => {
    // =========================================================================
    // = 初始化系统基础配置信息(保证所有模块的基础数据加载完成后, 才创建UI)
    // = 1. 全局变量app, 语言包(lpk), Ajax的定义
    // = 2. 异步加载基础平台运行的配置信息
    // = 3. 异步装载扩展模块, 并完成基本的初始化
    await initApp() 

    // =========================================================================
    // = 初始化UI
    const uiApp = createApp(App)

    // =========================================================================
    // = 注册全局组件
    initGlobalComponents(uiApp)

    // =========================================================================
    // = 注册全局组件
    uiApp.config.globalProperties.lpk = lpk
    uiApp.use(initStore()).use(initRouter()).mount('#idApp')
})()

