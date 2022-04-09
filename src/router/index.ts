import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
    { path: '/', component: () => import('@/view/Dashboard.vue')},
    { path: '/:pathMatch(.*)*', component: () => import('@/view/NotFound.vue') },
]

// 初始化所有扩展模块
// import.meta.globEager('@/bmod/*/entry.ts')

const iRouter = createRouter({
    history: createWebHistory(),
    routes,
})

export default iRouter