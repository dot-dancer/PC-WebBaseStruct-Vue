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
import { Router, createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const initRouter: () => Router = () => { 
    // =========================================================================
    // = 定义基础平台的路由
    let routes: RouteRecordRaw[] = [
        {path: '/', component: () => import(`@/view/Dashboard.vue`)}, 
        {path: '/theme', name: 'theme', component: () => import('@/view/theme/Index.vue')},
        {path: '/:pathMatch(.*)*', component: () => import('@/view/NotFound.vue')},   
    ]

    // =========================================================================
    // = 聚合扩展模块的路由
    routes = routes.concat(app.getAllBModRoutes())

    // =========================================================================
    // = 创建并返回路由实体
    return createRouter({
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
}