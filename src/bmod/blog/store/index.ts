/*! @file
********************************************************************************
<PRE>
文件实现功能   : blog 模块状态管理实现
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
import sysCfg from '../config/syscfg'

type BlogStateType = {
}

export const initStore = () => {

    const state: BlogStateType = {
    }

    const mutations = {
    }

    const actions = {
    }
    
    const getters = {
    }

    const store = {
        namespaced: true,
        state,
        getters,
        mutations,
        actions,
    }
    
    app.registBModStores(sysCfg.module, store)
}