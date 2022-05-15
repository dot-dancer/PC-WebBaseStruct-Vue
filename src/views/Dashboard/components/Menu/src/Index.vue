<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : Dashboard菜单
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/03   1.0     dotdancer  创建 
</PRE>
*******************************************************************************/
import { reactive, watch } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'
import { useRouter, useRoute } from 'vue-router'
import { get, set } from 'lodash'

// =============================================================================
// = 初始化
const iRouter: Router = useRouter()
const iCurRoute = useRoute()
const giRoutes: RouteRecordRaw[] = iRouter.getRoutes()
const iStatus = reactive<GlobalType.ARecord>({
    giExpandNames: [], // 处于展开状态菜单名称
    active: '', // 处于激活状态菜单名称
})

// =============================================================================
// = 通过路由收集一级菜单
const giRootMenus: RouteRecordRaw[] = [] // 一级菜单

//! 递归获取一级菜单
const parseRootMenu = (routes: RouteRecordRaw[] = []) => {
    if (!routes || !routes.length){
        return
    }

    routes.map((item) => {
        if (get(item, 'meta.isRootMenu', false)){
            // 标识当前菜单是否存在子菜单
            item.children?.map(iChildMenu => get(iChildMenu, 'meta.isMenu') && set(item, 'meta.hasChildMenu', true))
            // 找到根级菜单项, 加入根级菜单数组
            giRootMenus.push(item)
        }

        // 不做递归调用, 设计路由时, 按照一级菜单只能放在第一个路由层级来处理
        // parseRootMenu(item.children)
    })
}
parseRootMenu(giRoutes)

// 对查找出来的菜单进行排序
giRootMenus.sort((iPrev, iNext) => get(iPrev, 'meta.sort', 0) - get(iNext, 'meta.sort', 0))

// =============================================================================
// = 定义事件处理
//! 处理菜单的点击事件
const onMenuItemClickHandler = (name: string, bIsForceExpand: boolean = false) => {
    const bIsExpand = iStatus.giExpandNames.includes(name)
    if (!bIsForceExpand && bIsExpand){
        iStatus.giExpandNames = iStatus.giExpandNames.filter((item: string) => item != name)
    } else {
        if (!bIsExpand){
            iStatus.giExpandNames.push(name)
       }
    }

    iStatus.active = name
}

// =============================================================================
// = 监听路由变化
watch(() => iCurRoute.fullPath, () => {
    giRoutes.map(item => {
        if (0 == iCurRoute.fullPath.indexOf(item.path)){
            if (!iStatus.giExpandNames.includes(item.name)){
                iStatus.giExpandNames.push(item.name)
            }
        }
    })
}, {immediate: true})

</script>

<template>
    <ul class="menu">
        <li v-for="iMenu in giRootMenus" :class="{expand: iStatus.giExpandNames.includes(get(iMenu, 'name'))}">
            <list-item
                :prefix="get(iMenu, 'meta.icon')"
                :text="get(iMenu, 'meta.title')"
                :path="false === get(iMenu, 'meta.canSelect') ? '' : iMenu.path"
                :suffix="`${get(iMenu, 'meta.hasChildMenu') ? 'icon-child-arrow icon-down-solid-arrow' : 'icon-right-arrow'}`"
                @click="() => { onMenuItemClickHandler(iMenu.name as string) }"
            />
            <div class="children" v-if="get(iMenu, 'meta.hasChildMenu')">
                <ul>
                    <template v-for="iChildMenu in iMenu.children">
                        <li v-if="get(iChildMenu, 'meta.isMenu')">
                            <list-item
                                :prefix="get(iChildMenu, 'meta.icon')"
                                :text="get(iChildMenu, 'meta.title')"
                                :path="iChildMenu.path"
                                suffix="icon-right-arrow"
                                @click="() => { onMenuItemClickHandler(iMenu.name as string, true) }"
                            />
                        </li>
                    </template>
                </ul>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.menu{

    li{
        margin: 10px 0;
        overflow: hidden;

        &.expand{
            .children{
                height: auto;
                opacity: 1;
            }

            :deep(.icon-child-arrow){
                transform: rotate(-180deg);
            }
        }

        .children{
            transition: all .3s;
            box-sizing: border-box;
            height: 0;
            opacity: 0;
            overflow: hidden;
            margin-left: 20px;
        }
    }
}
</style>