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

// =============================================================================
// = 定义该模块使用到的类型接口
interface StateType{
    iLoginUser: GlobalType.ARecord
}

interface MutationsType{
    setLoginUser: (state: StateType, payload: GlobalType.ARecord) => void
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
    const baseStore: StoreType = {
        state: {
            iLoginUser: {}, // 当前登录者相关信息
        },
        mutations: {
            setLoginUser(state, payload){
                state.iLoginUser = payload
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