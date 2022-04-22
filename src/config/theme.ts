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
export const themes: GlobalType.ARecord = {
    // 蓝色主题:
    blue: {
        '--color': '#303544',
        '--bg': '#F6F6FB',

        '--active-color': '#2937FF',
        '--active-deep-bg': '#2937FF',
        '--active-light-bg': '#E9E9F6',

        '--title-color': '#313643',
        '--subtitle-color': '#CACCD2',
        '--text-color': '#313643',
        '--desc-color': '#CACCD2',
        '--disabled-color': '#EAEBED',

        '--icon-color': '#B5B9C7',
        '--placeholder-color': '#DDE1ED',


        '--region-bg': '#FFF',
        '--grid-title-color': '#CACCD2',

        '--success-color': '#3AC56C',
        '--warning-color': '#FFA814',
        '--dangerous-color': '#EF5350',

        // 覆盖element plus
        'ele-plus': {
            '--el-color-primary': '#303544',
            '--el-color-primary-light-3': '#F00',
            '--el-border-radius-base': '20px'
        }
    },

    // 主题': '黑色
    black: {
        '--color': '#FFF',
        '--bg': '#282A36',

        '--active-color': '#2937FF',
        '--active-bg': '#E9E9F6',

        '--title-color': '#313643',
        '--subtitle-color': '#CACCD2',
        '--text-color': '#313643',
        '--desc-color': '#CACCD2',
        '--disabled-color': '#EAEBED',

        '--icon-color': '#B5B9C7',
        '--placeholder-color': '#DDE1ED',


        '--region-bg': '#FFF',
        '--grid-title-color': '#CACCD2',

        '--success-color': '#3AC56C',
        '--warning-color': '#FFA814',
        '--dangerous-color': '#EF5350',

        // 覆盖element plus
        'ele-plus': {
            '--el-color-primary': '#000',
            '--el-color-primary-light-3': '#F00',
            '--el-border-radius-base': '20px'
        }
    }
}

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

//! 将指定主题变量绑定到根元素上
const bindCssVar = (iTheme: GlobalType.ARecord) => {
    if (!iTheme){
        return
    }

    const style = document.documentElement.style as {[key: string]: any}
    Object.keys(iTheme).map(key => {
        if ('string' == typeof iTheme[key]){
            // iTheme[key] && (style[key] = iTheme[key])
            iTheme[key] && (style.setProperty(key, iTheme[key]))
            return
        }

        // 递归设置子对象中的主题元素值
        bindCssVar(iTheme[key])
    })
}

//! 切换主题
export const changeTheme = (stArgTheme: string) => {
    // 系统中不存在相关的theme, 直接停止切换主题
    const iTheme = themes[stArgTheme] 
    if (!iTheme){
        return
    }

    // 开始实现主题切换
    bindCssVar(iTheme)

    // 设置当前使用主题
    stCurUseTheme = stArgTheme 
    // 在本地保存主题
    Tools.LocalStorage.setItem(stThemeStorageName, stCurUseTheme)
}

//! 获取当前正在使用的主题
export const getTheme = () => {
    return stCurUseTheme
}