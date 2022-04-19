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
import { createStore, Store } from 'vuex'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

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

export const initStore: () => Store<any> = () => {
    // -------------------------------------------------------------------------
    // - 定义基础平台的状态管理信息
    const stLocale = app.getAppCtl().getLocale()
    let elLocale = zhCn
    switch (stLocale){
        case 'zh-CN': {
            elLocale = zhCn
        }
        break

        case 'en-US': {
            elLocale = en
        }
        break
    }
    const baseStore: StoreType = {
        state: {
            iLoginUser: {}, // 当前登录者相关信息, 默认: 空
            locale: stLocale, // 系统当前语言环境, 默认: 中文
            elLocale: elLocale, // Element Plus语言环境, 默认: 中文
        },
        mutations: {
            setLoginUser(state, payload){
                state.iLoginUser = payload
            },
            setLocale(state, payload){
                state.locale = payload
            }
        },
        getters: {
            getLoginUser(state){
                return state.iLoginUser
            }
        }
    }
    
    // -------------------------------------------------------------------------
    // - 聚合扩展模块的路由
    const modules: GlobalType.ARecord = {
        base: baseStore, 
        ...app.getAllBModStores(),
    }
    
    // -------------------------------------------------------------------------
    // - 定义基础平台的状态管理信息
    return createStore({
        modules,
    })
}