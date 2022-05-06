/*! @file
********************************************************************************
<PRE>
文件实现功能   : 系统app全局对象的定义
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
import { isArray } from 'lodash'
import { RouteRecordRaw } from 'vue-router'
import appCtl from '@/controller/AppCtl'
import sysCfg from './syscfg'

// =============================================================================
// = 存放所有扩展模块对应的状态信息 
let giAllBModStores: GlobalType.ARecord = {}
const storeBModOper: GlobalType.ARecord = { 
    //! 注册扩展模块状态信息
    registBModStores(module: string, store: GlobalType.ARecord){
        if (!module){
            return
        }

        giAllBModStores[module] = store
    },
    //! 获取所有扩展模块状态信息
    getAllBModStores(): GlobalType.ARecord{
        return giAllBModStores
    }
}

// =============================================================================
// = 存放所有扩展模块对应的路由信息 
let giAllBModRoutes: RouteRecordRaw[]  = []
const routeBModOper: Record<string, any> = {
    //! 注册扩展模块路由信息
    registBModRoute(mixRoute: RouteRecordRaw[] | RouteRecordRaw){
        if (isArray(mixRoute)){
            giAllBModRoutes = giAllBModRoutes.concat(mixRoute)
            return
        }

        giAllBModRoutes.push(mixRoute)
    },
    //! 获取所有扩展模块路由信息
    getAllBModRoutes(): RouteRecordRaw[]{
        return giAllBModRoutes
    }
} 


// =============================================================================
// = 全局变量app的实现
const app = {
    ...storeBModOper, // 扩展模块状态相关操作
    ...routeBModOper, // 扩展模块路由相关操作
    getAppCtl: () => appCtl, // 基础平台控制器相关操作

    //! 获取系统配置选项的值
    getConfig<T>(key: string): T{
        return (sysCfg as GlobalType.ARecord)[key]
    },

    //! 判断是否启用了指定模块
    checkBModIsEnable(stModuleName: string){
        const enableBModNames: string[] = app.getConfig<string[]>('enableBModNames')
        
        if (enableBModNames.find(item => item == stModuleName)){
            return true
        }

        return false
    }
}

export default app