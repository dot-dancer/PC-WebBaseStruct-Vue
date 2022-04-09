import type { RouteRecordRaw } from 'vue-router'
export default {
    // initRoutes: initRoutes: (rootRoutes: RouteRecordRaw[]) => void = (rootRoutes = []) => {
    //     const stModuleName = 'blog'
    //     const stPath = `@/bmod/${stModuleName}/view`
    
    //     const giRoutes = [
    //         { 
    //             path: `/${stModuleName}`, 
    //             component: () => import('@/view/Dashboard.vue'),
    //             children: [
    //                 {path: '', component: () => import(`${stPath}/List.vue`)},
    //                 {path: 'profile', component: () => import(`${stPath}/profile/index.vue`)}
    //             ]
    //         },
    //     ];
    
    //     rootRoutes = rootRoutes.concat(giRoutes)
    // }

    initRoutes(){
        console.log('initRoutes blog');
    }
}