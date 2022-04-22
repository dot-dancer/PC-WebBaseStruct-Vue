/*! @file
********************************************************************************
<PRE>
文件实现功能   : 系统主题的实现
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/04/21   1.0     dotdancer  创建 
</PRE>
*******************************************************************************/
import { get } from 'lodash'

// =============================================================================
// = 系统主题的定义
const stThemeStorageName = 'theme' // 存储主题字段名称
const stDefaultTheme = 'blue' // 默认主题
let stCurUseTheme: string = stDefaultTheme // 当前使用系统主题

// =============================================================================
// = 系统主题相关操作
//! 初始系统主题
export const initTheme = () => {
    
    const iLoginUser = app.getAppCtl().getLoginUser()

    // 优先从登录者信息中获取主题
    stCurUseTheme = get(iLoginUser, 'cust.theme')
    // 其次从本地存储中获取
    stCurUseTheme = stCurUseTheme || Tools.LocalStorage.getItem(stThemeStorageName)
    // 最终使用默认主题
    stCurUseTheme = stCurUseTheme || stDefaultTheme

    // 开始切换主题
    changeTheme(stCurUseTheme)
}


//! 切换主题
export const changeTheme = (stArgTheme: string) => {

    // 设置新主题
    document.documentElement.setAttribute('data-theme', stArgTheme)
    stCurUseTheme = stArgTheme 
    
    // 在本地保存主题
    Tools.LocalStorage.setItem(stThemeStorageName, stCurUseTheme)
}

//! 获取当前正在使用的主题
export const getTheme = () => {
    return stCurUseTheme
}