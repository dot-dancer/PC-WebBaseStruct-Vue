/*! @file
********************************************************************************
<PRE>
文件实现功能   : Ajax模块的实现
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
import axios, { AxiosInstance, Method, AxiosRequestConfig, AxiosResponse } from 'axios'
import app from '@/config/app'

// =============================================================================
// = 定义 或 扩展axios的类型
interface AxiosRequestConfigExt<D = any> extends AxiosRequestConfig{
    reqParams?: AxiosRequestConfigExt;     // 所有请求参数
    showMask?: boolean;                  // 是否显示LoadMask     
    bIsNeedCachePrevent?: boolean;       // 是否加上防缓存cp随机数
    bIsNeedJsonStringify?: boolean;      // 是否需要强制将对象转成字串
    timeout?: number;                    // 请求超时时间
    force401ToLogin?: boolean;           // 遇401是否强制跳转到登录界面
}
type ReqResponseType = Promise<AxiosResponse<any, any>>


// =============================================================================
// = 设置axios默认配置选项
axios.defaults.headers.head['Content-Type'] = 'application/json;charset=utf-8'

// =============================================================================
// = 定义该模块内全局变量
let timerLoadMask: TimeoutReturnType // 延迟显示LoadMask秒数
const axiosInstance: AxiosInstance = axios.create // 创建axios实例
({
    baseURL : app.getConfig('baseUrl'),
    timeout : 10000
})


// =============================================================================
// = 定义每次请求响应处理
axiosInstance.interceptors.response.use(res => 
{
    // -------------------------------------------------------------------------
    // - 请求未抛异常情况处理
    // 清除LoadMask计时器, 并隐藏遮罩
    clearTimeout(timerLoadMask)
    Tools.hideLoadMask()

    // -------------------------------------------------------------------------
    // - 获取响应内容, 以及外界调用请求时传递的参数值
    const { status, data, config = {} } = res
    const { reqParams = {} } = config as AxiosRequestConfigExt
    const { force401ToLogin = false } = reqParams

    // -------------------------------------------------------------------------
    // - http: 200状态码情况处理
    if (200 == status) {
        // 统一处理后台返回的code状态码
        if (data) {
            switch(data.code){
                // 遇401强制跳回登录界面
                case 401: { 
                    if (force401ToLogin){
                        app.getAppCtl().redirectToLogin()
                        return
                    }
                }
                break

                // 遇404直接报错
                case 404: { 
                    return Promise.reject(data)
                }
                break
            }
        }

        return data
    } 
    // -------------------------------------------------------------------------
    // - http: 非200状态码情况处理
    else {
        return Promise.reject(data)
    }
}, error => {
    // -------------------------------------------------------------------------
    // - 请求出错处理
    // 清除LoadMask计时器, 并隐藏遮罩
    clearTimeout(timerLoadMask)
    Tools.hideLoadMask()
    
    // -------------------------------------------------------------------------
    // - 翻译错误解释
    // FOR_DEBUG_TODO: 国际化处理
    let { message } = error
    if (message == 'Network Error') 
    {
        message = '后端接口连接异常'
    }
    else if (message.includes('timeout')) 
    {
        message = '系统接口请求超时'
    }
    else if (message.includes('Request failed with status code')) 
    {
        message = '系统接口' + message.substr(message.length - 3) + '异常'
    }

    return Promise.reject(error)
})


// =============================================================================
// = 定义具体的请求方法
type FnReqMethodType =    ((reqParams: AxiosRequestConfigExt) => ReqResponseType)
                        | ((method: string, reqParams: AxiosRequestConfigExt) => ReqResponseType)
const Ajax: Record<string, FnReqMethodType>  = 
{
    request: function(method, reqParams){
        // ---------------------------------------------------------------------
        // - 获取请求参数
        let { url, params, headers, showMask, 
              bIsNeedCachePrevent, bIsNeedJsonStringify, timeout
        } = reqParams
    
        // ---------------------------------------------------------------------
        // - 判断是否需要显示LoadMask
        if (false !== showMask) {
          clearTimeout(timerLoadMask)
          timerLoadMask = setTimeout(() => {
            Tools.showLoadMask()
          }, 1000)
        }

        // ---------------------------------------------------------------------
        // - 判断是否需要加防缓存处理
        if (false !== bIsNeedCachePrevent) {
            url = Tools.addCachePrevent(url)
        }

        // ---------------------------------------------------------------------
        // - 判断是否需要强制将请求参数转为JSON串
        if (bIsNeedJsonStringify) {
            params = JSON.stringify(params)
        }

        // ---------------------------------------------------------------------
        // - 开始发起请求
        return axiosInstance.request({
                    reqParams: reqParams,
                    url: url,
                    [method == 'GET' ? 'params' : 'data']: params,
                    method: (['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].indexOf(method) > -1 ? method : 'GET') as Method,
                    headers: Object.assign({
                        /*
                        // 这里可以自定义全局的头信息
                        'Content-Type': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                        */
                    }, headers),
                    timeout: timeout || 10000
                } as AxiosRequestConfig)
      }
}


// =============================================================================
// = 绑定多种请求类型方法
const gstMethods: string[] = ['get', 'post', 'put', 'patch', 'delete']
gstMethods.map(method => {
    const fnHandler: FnReqMethodType = (reqParams: AxiosRequestConfigExt) => {
        if ('get' == method){
            if (typeof reqParams === 'string') {
                reqParams = {
                    url: reqParams,
                    params: ''
                }
            }
        }
        return Ajax.request(method.toLocaleUpperCase(), reqParams)
    }

    Ajax[method] = fnHandler
})

export default Ajax