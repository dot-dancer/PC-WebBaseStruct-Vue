/*! @file
********************************************************************************
<PRE>
文件实现功能   : blog 模块路由实现
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
import type { RouteRecordRaw } from 'vue-router'
import sysCfg from '../config/syscfg'
import Dashboard from '@/view/Dashboard.vue'

const stModuleName = sysCfg.module // 模块名称

// =============================================================================
// = 初始化该模块路由 
export const initRoutes = () => {
    const stPath = `/${stModuleName}`

    // -------------------------------------------------------------------------
    // - 定义该模块的路由信息
    /*
        路由使用的相对路径, 因为使用绝对路径需要写成: `@/${stModuleName}/view/article/List.vue`
        而 import 或 import.meta.glob 不支持动态路径
    */
    const giRoutes: RouteRecordRaw[] = [{
            path: stPath, 
            component: Dashboard,
            children: [
                {name: 'blogIndex',  path: '', component: () => import(`../view/Index.vue`), 
                    children: [
                        {name: 'articleList', path: `${stPath}/article/list`, component: () => import(`../view/article/List.vue`),},
                    ]
                },
            ]
    }]

    // -------------------------------------------------------------------------
    // - 向基础平台注册该模块的所有路由信息
    app.registBModRoute(giRoutes)
}