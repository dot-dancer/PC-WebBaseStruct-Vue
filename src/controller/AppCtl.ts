/*! @file
********************************************************************************
<PRE>
文件实现功能   : 基础平台应用控制器
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/04/15   1.0     dotdancer  创建 
</PRE>
*******************************************************************************/
import { isEmpty } from 'lodash'
import { LOGIN_PATH } from '@/utils/Constants'
import { mergeLpk, changeLocale, getLocale } from '@/config/lpk'
import { getTheme, changeTheme } from '@/config/theme'

// =============================================================================
// = 登录者信息相关
let iLoginUser: GlobalType.ARecord = {} // 当前登录者信息
//! 获取当前登录者相关信息
const retriveLoginUser = async () => {
    // FOR_DEBUG_TODO: 将根据实际业务调整获取登录用户信息的数据
    return {
        // id: 1,
        // userName: 'admin',
    }
}

//! 获取登录者信息
export const initLoginUserInfo = async () => {
    // 获取登录用户信息
    iLoginUser = await retriveLoginUser()

    app.getAppCtl().checkIsLogin()
}

// =============================================================================
// = 系统语言包相关
//! 初始系统语言环境
export const initLpk = () => {
    mergeLpk(import.meta.globEager('@/locales/*'))
}

// =============================================================================
// = 基础平台应用控制器的实现
const AppCtl: GlobalType.ARecord = {

    //! 合并语言包内容
    mergeLpk, 

    //! 获取当前语言环境
    getLocale, 
    
    //! 切换语言环境
    changeLocale,

    //! 获取当前正在使用的主题名称
    getTheme,

    //! 更换系统主题
    changeTheme,
    
    //! 检测当前登录者是否处于登录状态
    checkIsLogin(){
        const bIsLogin = !isEmpty(iLoginUser)

        if (this.isLoginPage()){
            if (bIsLogin){
                this.redirectToHome()
            }

            return
        }

        if (!bIsLogin){
            // FOR_DEBUG_将要打开
            // this.redirectToLogin()
        }
    },
    
    //! 获取当前登录者信息
    getLoginUser(){
        return iLoginUser
    },

    //! 判断当前界面是否处于登录界面
    isLoginPage(){
        const stLoginPath = LOGIN_PATH
        const stPathName = window.location.pathname;
        if (stLoginPath == stPathName){
            return true
        }

        return false
    },

    //! 显示登录界面
    redirectToLogin(){
        window.location.href = '/login'
    },
    
    //! 跳转到主页
    redirectToHome(){
        window.location.href = '/'
    }
}

export default AppCtl