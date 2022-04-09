/*! @file
********************************************************************************
<PRE>
文件实现功能   : 系统app全局对象的定义
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
import SysCfg from './syscfg'

const app = {
    //! 获取系统配置选项的值
    getConfig<T>(key: string): T{
        return (SysCfg as Record<string, any>)[key]
    },

    //! 判断是否启用了指定模块
    checkBModIsEnable(stModuleName: string){
        const enableBModNames: string[] = app.getConfig<string[]>('enableBModNames')
        
        if (enableBModNames.find(item => item == stModuleName)){
            return true
        }

        return false
    },

    //! 显示登录界面
    showLogin(){
        // FOR_DEBUG_TODO: 将会实现路由的跳转
        alert('跳转到登录界面')
    },

    //! 判断当前界面是否处于登录界面
    isLoginPage(){

    }
}

export default app