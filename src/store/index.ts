/*! @file
********************************************************************************
<PRE>
文件实现功能   : 聚合所有模块的状态管理信息, 并创建状态管理对象
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/04/13   1.0     dotdancer  创建 
</PRE>
*******************************************************************************/
import { createPinia, defineStore, Pinia } from 'pinia'
import zhCN from 'element-plus/lib/locale/lang/zh-cn'
import enUS from 'element-plus/lib/locale/lang/en'

// =============================================================================
// = 定义该模块使用到的类型接口
interface StateType{
    iLoginUser: GlobalType.ARecord,
    locale: string,
    elLocale: {name: string, el: GlobalType.ARecord}
}

interface MutationsType{
    setLoginUser: (state: StateType, payload: GlobalType.ARecord) => void;
    setLocale: (state: StateType, payload: string) => void;
}

interface StoreType{
    state: StateType;
    mutations: MutationsType,
    getters: {
        getLoginUser: (state: StateType) => GlobalType.ARecord
    }
}

// =============================================================================
// = 创建状态信息管理对象
export const initStore: () => Pinia = () => {
    return createPinia()
}

// =============================================================================
// = 定义基础平台的状态管理信息
export const useBaseStore = defineStore('base', {
    state: () => ({
        iLoginUser: {}, // 当前登录者相关信息, 默认: 空
        locale: app.getAppCtl().getLocale(), // 系统当前语言环境, 默认: 中文
        elLocale: 'zh-CN' == app.getAppCtl().getLocale() ? zhCN : enUS, // Element Plus语言环境, 默认: 中文
    }),
    getters: {
        getLoginUser(): GlobalType.ARecord{
            return this.iLoginUser
        }
    },
    actions: {
        setLoginUser(payload: GlobalType.ARecord){
            this.iLoginUser = payload
        },
        setLocale(payload: GlobalType.ARecord){
            this.locale = payload
        }
    }
}) 

