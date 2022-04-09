/*! @file
********************************************************************************
<PRE>
文件实现功能   : 通用工具函数的实现
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
let fCachePreventNum = 0 // API请求防缓存计数器

const Tools: Record<string, any> = {
    // 显示loading遮罩提示
    showLoadMask(){

    },
    hideLoadMask(){

    },
    addCachePrevent(url: string = ''): string{
        const nQueryStringFlagIndex = url.indexOf('?')
        url += (-1 == nQueryStringFlagIndex ? '?' : '&') + 'cp=' + fCachePreventNum++

        return url
    },
    Router: { // 路由操作命令空间
        
    },
    Store: { // 状态管理命令空间

    },
    LocalStorage: { // 本地存储操作命名空间

    },
    Cookie: { // Cookie操作命名空间

    }, 
    Time: { // 时间操作命名空间

    }, 
}

export default Tools