/*! @file
********************************************************************************
<PRE>
文件实现功能   : 系统初始化模块
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/04/08   1.0     dotdancer  创建 
</PRE>
*******************************************************************************/
import { type App } from 'vue'
import Tools from '@/utils/Tools'
import app from './app'
import { lpk } from './lpk'
import Ajax from '@/utils/Request'

import { initLoginUserInfo, initLpk } from '@/controller/AppCtl'
import { initTheme } from '@/config/theme'

// =============================================================================
// = 初始化全局变量
// = 为了操作方便, 选择向window上挂载几个全局对象, 其它模块**禁止创建全局对象**
// 声明全局变量相关类型
type globalVarKey = 'app' | 'lpk' | 'Tools' | 'Ajax'
declare global { 
    interface Window { 
        app: GlobalType.ARecord;     // 全局app对象, 挂载一些全局数据与操作方法
        lpk: FnLpkType;              // 全局语言包对象
        Tools: GlobalType.ARecord;   // 全局工具库
        Ajax: GlobalType.ARecord;    // 全局Ajax请求对象
    }
}

// 开始向window上面挂载全局变量
// 注意: 因为不想分开在各自的实现中挂载全局变量, 所以像: Ajax的初始化中会用到app
// 而当时app还未被全局化, 所以在Ajax初始化过程中只能通过import app 方式来使用, 
// 其它几个全局模块也类似。这样也有一个好处不用在乎各变量所在文件的引入顺序
const iGlobalVars: GlobalType.ARecord = {
    app,   // 全局应用对象, 挂载一些全局数据与操作方法
    lpk,   // 全局获取语言包内容方法
    Tools, // 全局自定义工具库
    Ajax,  // 全局Ajax请求对象
}
Object.keys(iGlobalVars).forEach(stKey => window[stKey as globalVarKey] = iGlobalVars[stKey]);


// =============================================================================
// = 初始化系统的实现, 导出初始化系统配置信息的实现, 供主入口处调用
export const initApp = async () => {
    // -------------------------------------------------------------------------
    // - 初始化基础业务相关信息(比如: 获取当前登录者信息等)
    await initLoginUserInfo()

    // -------------------------------------------------------------------------
    // - 设置系统主题样式
    initTheme()

    // -------------------------------------------------------------------------
    // - 加载基础平台的语言包 
    // import.meta.globEager 不支持以变量方式加载数据, 
    // 因此只有全都加载, 然后再过滤不需要的语言包内容
    initLpk()
    
    // -------------------------------------------------------------------------
    // - 初始化各扩展模块
    const iAllEntry: GlobalType.ARecord = import.meta.globEager('@/bmod/*/entry.ts')
    for (const key in iAllEntry){
        const iEntryFile = iAllEntry[key]
        iEntryFile.entryInit && (await iEntryFile.entryInit())
    }
}

// =============================================================================
// = 注册全局组件
/*
    注意: 动态加载的自定义组件, 其上层文件夹名称作为组件的名称, 同时对文件命名时
          必须以index.vue作为名称, 否则自动注册组件将会失败
*/
export const initGlobalComponents = (uiApp: App<Element>) => {
    const iAllGlobalCmps = import.meta.globEager('../components/*/src/Index.vue')
    Object.keys(iAllGlobalCmps).map((key) => {
        const paths = key.split('/')
        const stCmpName = paths[paths.length - 3]
        uiApp.component(stCmpName, iAllGlobalCmps[key].default)
    })
}

