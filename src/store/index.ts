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
    iLoginUser: GlobalType.ARecord;
    locale: string;
    elLocale: {name: string, el: GlobalType.ARecord};
    gstNoCacheNames: string[];
    stMainTitle: string;
}

// =============================================================================
// = 创建状态信息管理对象
export const initStore: () => Pinia = () => {
    return createPinia()
}

// =============================================================================
// = 定义基础平台的状态管理信息
export const useBaseStore = defineStore('base', {
    state: () => {
        const state: StateType = {
            iLoginUser: {}, // 当前登录者相关信息, 默认: 空
            locale: app.getAppCtl().getLocale(), // 系统当前语言环境, 默认: 中文
            elLocale: 'zh-CN' == app.getAppCtl().getLocale() ? zhCN : enUS, // Element Plus语言环境, 默认: 中文
            gstNoCacheNames: [], // 所有不缓存的组件名称
            stMainTitle: 'Dashboard', // Dashboard主内容区域的标题
        }

        return state
    },
    getters: {
        //! 获取当前登录者信息
        getLoginUser(): GlobalType.ARecord{
            return this.iLoginUser
        }
    },
    actions: {
        //! 设置登录用户信息
        setLoginUser(payload: GlobalType.ARecord){
            this.iLoginUser = payload
        },
        //! 设置系统当前使用语言
        setLocale(payload: string){
            this.locale = payload
        },
        //! 设置不需要缓存的组件名称
        setNoCacheNames(gstNames: string[]){
            this.gstNoCacheNames = gstNames
        },
        //! 设置Dashbord内容区域的标题
        setMainTitle(stTitle: string){
            this.stMainTitle = stTitle
        }
    }
}) 

