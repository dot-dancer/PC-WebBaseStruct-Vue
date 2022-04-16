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

let iLoginUser: GlobalType.ARecord = {} // 当前登录者信息

//! 获取当前登录者相关信息
const retriveLoginUser = async () => {
    // FOR_DEBUG_TODO: 将根据实际业务调整获取登录用户信息的数据
    return {
        id: 1,
        userName: 'admin',
    }
}

//! 初始化系统基础业务
export const initBusiness = async () => {
    // 获取登录用户信息
    iLoginUser = await retriveLoginUser()

    app.getAppCtl().checkIsLogin()
}

// =============================================================================
// = 基础平台应用控制器的实现
const AppCtl: GlobalType.ARecord = {
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
            this.redirectToLogin()
        }
    },
    
    //! 获取当前登录者信息
    getLoginUser(){
        return iLoginUser
    },

    //! 判断当前界面是否处于登录界面
    isLoginPage(){
        const stLoginPath = app.getConstant('LoginPath');
        const stPathName = window.location.pathname;
        if (stLoginPath == stPathName){
            return true;
        }

        return false;
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