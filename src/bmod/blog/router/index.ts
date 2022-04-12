import type { RouteRecordRaw } from 'vue-router'
import sysCfg from '../config/syscfg'
import Dashboard from '@/view/Dashboard.vue'

const stModuleName = sysCfg.module // 模块名称

// =============================================================================
// = 初始化该模块路由
export const initRoutes = () => {
    const stPath = `/${stModuleName}`
    // const all = import.meta.glob('../view/**/*.vue')
    // console.log(all)

    const giRoutes: RouteRecordRaw[] = [{ 
            path: stPath, 
            meta: {
                text: '博客管理'
            },
            component: Dashboard,
            children: [
                {path: '', component: () => import(`../view/Index.vue`), 
                    children: [
                        {path: `${stPath}/article/list`, component: () => import(`../view/article/List.vue`),
                            children: [
                                {name: 'article_list_tab1', path: `tab1`, component: () => import(`../view/article/tab/Tab1.vue`)},
                                {name: 'article_list_tab2', path: `tab2`, component: () => import(`../view/article/tab/Tab2.vue`)},
                            ]
                        },
                        {path: `${stPath}/article/search`, component: () => import(`../view/article/Search.vue`)},
                        {path: `${stPath}/profile`, component: () => import(`../view/profile/Index.vue`)},

                        {path: `${stPath}/type/list`, component: () => import(`../view/type/List.vue`)},
                    ]
                },
            ]
    }, 
    {path: `${stPath}/article/add`, component: () => import(`../view/article/AddArticle.vue`)},
    ]

    // -------------------------------------------------------------------------
    // - 向基础平台注册该模块的所有路由信息
    app.registBModRoute(giRoutes)
}