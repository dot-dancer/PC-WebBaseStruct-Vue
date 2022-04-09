import { mergeLpk } from '@/config/lpk'

// =============================================================================
// = 模块初始化
const stModuleName = 'oa'
export const entryInit = async () => {
    // -------------------------------------------------------------------------
    // - 如果未开启当前模块, 终止初始化当前模块内容
    if (!app.checkBModIsEnable(stModuleName)){
        return
    }
    
    console.log(`${stModuleName} init`)
}