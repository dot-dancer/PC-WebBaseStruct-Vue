<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 带标题的面板
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/15   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { toRefs } from 'vue'
import { TitlePanelToolItemType } from './typing'

defineOptions({name: 'TitlePanel'})

//==============================================================================
//== 类型定义
interface TitlePanelPropType{
    title?: string;
    tools?: TitlePanelToolItemType[];
}

//==============================================================================
//== 初始化
const props = withDefaults(defineProps<TitlePanelPropType>(), {
    title: '',
    tools: () => []
})

const { title, tools } = toRefs(props);

//==============================================================================
//== 事件处理
const onToolItemClickHandler = (item: TitlePanelToolItemType) => {
    item.handler && item.handler()
}
</script>

<template>
    <div class="title-panel">
        <div class="g-flex-rsbs title-w">
            <div class="title">{{title}}</div>
            <div class="g-flex-rsbc tools">
                <ul class="g-flex-rsbc">
                    <li v-for="(item, index) in tools" :key="index" @click="() => {onToolItemClickHandler(item)}">
                        <el-tooltip v-if="item.text" :content="item.text" placement="top">
                            <icon-font :icon="item.icon"></icon-font>
                        </el-tooltip>
                        <icon-font :icon="item.icon" v-else></icon-font>
                    </li>
                </ul>
                <slot name="toolsSlot"></slot>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.title-panel{
    padding: 10px;
    background-color: var(--bg);
    border-radius: var(--radius5px);

    .title-w{
        z-index: 9;
    }
    
    .title{
        color: var(--title-color);
        font-weight: bold;
    }

    .tools{
        li{
            cursor: pointer;
            margin: 0 5px;

            :deep(.iconfont){
                font-size: 18px;
            }
        }
    }
}
</style>