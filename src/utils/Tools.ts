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
import cookies from 'js-cookie'
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
        setItem(key: string, value: any)
        {
            localStorage.setItem(key, JSON.stringify(value));
        },
        getItem(key: string)
        {
            const stValue = localStorage.getItem(key);
            try
            {
                return JSON.parse(stValue as string); 
            }
            catch(e)
            {
                return stValue;
            }
        },
        removeItem(key: string)
        {
            localStorage.removeItem(key);
        }
    },
    Cookie: { // Cookie操作命名空间
        setItem(key: string, value: any)
        {
            cookies.set(key, value, {expires: 30});
        },
        getItem(key: string, mixDefaultValue: any)
        {
            const stValue = cookies.get(key) || mixDefaultValue;
            try
            {
                return JSON.parse(stValue); 
            }
            catch(e)
            {
                return stValue;
            }
        },
        removeItem(key: string)
        {
            cookies.remove(key);
        }
    }, 
    Time: { // 时间操作命名空间

    }, 
}

export default Tools