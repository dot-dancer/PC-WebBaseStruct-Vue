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
import Dashborad from '@/views/Dashboard/Index.vue'

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
            name: 'blogIndex',
            path: stPath,
            component: Dashborad,
            meta: {
                isRootMenu: true,
                canSelect: false,
                title: lpk('blog.Manage'),
                icon: 'icon-edit',
            },
            children: [
                {
                    name: 'articleList',
                    path: `${stPath}/article`, 
                    component: () => import(`../views/article/Index.vue`),
                    meta: {
                        isMenu: true,
                        icon: 'icon-article',
                        title: lpk('blog.article.Manage'),
                    },
                },
                {
                    name: 'articleTagList',
                    path: `${stPath}/tag`, 
                    component: () => import(`../views/tag/Index.vue`),
                    meta: {
                        isMenu: true,
                        icon: 'icon-tag-01',
                        title: lpk('blog.tag.Manage'),
                    },
                },
            ]
    }]

    // -------------------------------------------------------------------------
    // - 向基础平台注册该模块的所有路由信息
    app.registBModRoute(giRoutes)
}