/*! @file
********************************************************************************
<PRE>
文件实现功能   : 聚合所有模块的路由信息, 并创建路由对象
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
import { get } from 'lodash'
import { Router, createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useBaseStore } from '@/store'
import Dashboard from '@/views/Dashboard/Index.vue'

let giAllRoutes: RouteRecordRaw[] = []

export const initRouter: () => Router = () => { 
    // =========================================================================
    // = 定义基础平台的路由
    let routes: RouteRecordRaw[] = [
        {path: '/', redirect: '/dashboard'}, 
        {
            path: '/dashboard', 
            name: 'dashboard', 
            component: Dashboard,
            meta: {
                isRootMenu: true,
                icon: 'icon-home',
                title: lpk('page.dashboard'),
            },
            children: [
                {
                    path: '', 
                    name: 'home', 
                    component: () => import('@/views/Dashboard/Home.vue'),
                }
            ]           
        },
        {path: '/login', name: 'login', component: () => import('@/views/Login/Index.vue')},
        {path: '/test', name: 'test', component: () => import('@/views/test/Index.vue')},
        {   path: '/detail', 
            name: 'detail',
            component: () => import('@/views/test/Detail.vue'),
            meta: {
                keepAlive: false,
                cmpName: 'DetailPage',
                title: 'title-detail',
            }
        },
        {
            name: 'user',
            path: '/user',
            component: Dashboard,
            meta: {
                isRootMenu: true,
                icon: 'icon-user',
                title: lpk('User Manage'),
            },
            children: [
                {
                    path: '', 
                    component: () => import('@/views/User/Index.vue'),
                }
            ]  
        },
        {
            name: 'log',
            path: '/log',
            component: Dashboard,
            meta: {
                isRootMenu: true,
                icon: 'icon-log',
                title: lpk('Log Manage'),
            },
            children: [
                {
                    path: '', 
                    component: () => import('@/views/Log/Index.vue'),
                }
            ]  
        },
        {
            name: 'complaint',
            path: '/complaint',
            component: Dashboard,
            meta: {
                isRootMenu: true,
                icon: 'icon-alerting',
                title: lpk('Complaint Manage'),
            },
            children: [
                {
                    path: '', 
                    component: () => import('@/views/Complaint/Index.vue'),
                }
            ]  
        },
        {path: '/:pathMatch(.*)*', component: () => import('@/views/NotFound.vue')},   
    ]

    // =========================================================================
    // = 聚合扩展模块的路由
    routes = routes.concat(app.getAllBModRoutes())
    giAllRoutes = routes

    // =============================================================================
    // = 收集所有不需要缓存路由对应组件名称
    gatherNoCacheComponentNames()

    // =========================================================================
    // = 创建路由实体
    const iRouter = createRouter({
        /*
            为了url的美观, 同时为了避免在微信等一些场景分享页面时, hash链接丢失
            参数等问题, 所以项目中会坚持使用history模式

            采用history模式, 在 build 后访问子路径刷新页面时, 会遇到404问题
            解决方法, 调整nginx配置:
            location / {
                try_files $uri $uri/ @router;
                index  index.html index.htm;
            }

            location @router {
                rewrite ^.*$ /index.html last;
            }
        */
        history: createWebHistory(),
        routes,
    })

    // =========================================================================
    // = 注册路由守卫
    iRouter.afterEach((iNext, iPrev) => {
        // 调整Dashboard中央区域标题
        if (get(iNext, 'meta.title')){
            useBaseStore().setMainTitle(iNext.meta.title as string)
        }
    })

    // =========================================================================
    // = 返回创建出来的路由实例
    return iRouter
}

//! 收集所有不需要缓存路由对应组件的名称
const gatherNoCacheComponentNames = () => {
    const gstNoCacheNames: string[] = []

    const _Do = (giRoutes: RouteRecordRaw[] = giAllRoutes) => {
        if (!giRoutes || !giRoutes.length){
            return
        }
    
        giRoutes.map(item => {
            const bIsCache = get(item, 'meta.keepAlive')
            const stCmpName = get(item, 'meta.cmpName')
            if (false === bIsCache && stCmpName){
                gstNoCacheNames.push(stCmpName)
            }
    
            item.children && _Do(item.children)
        })
    }

    _Do()

    useBaseStore().setNoCacheNames(gstNoCacheNames)
}

//! 导出所有路由信息
export const getAllRoutes: () => RouteRecordRaw[] = () => {
    return giAllRoutes
}