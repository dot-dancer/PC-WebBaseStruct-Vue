<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 列表条目组件
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
import { toRefs } from 'vue'

// =============================================================================
// = 定义当前页面中使用到的类型
interface ListItemPropType{
    cls?: string;
    prefix?: string;
    suffix?: string;
    path?: string;
    type?: string;
    text: string;
}

// =============================================================================
// = 定义当前页面中使用到的属性
const props = withDefaults(defineProps<ListItemPropType>(), {
    cls: '',
    path: '',
    type: 'middle',
})
const { cls, prefix, suffix, path, text } = toRefs(props)


// =============================================================================
// = 定义当前页面中使用到的事件
const emit = defineEmits<{
    (e: 'click', value: MouseEvent) : void
}>()

const onClickHandler = (evt: MouseEvent) => {
    emit('click', evt)
}

</script>

<template>
    <div :class="`list-item ${cls}`" @click="onClickHandler">
        <component 
            :is="`${path ? 'router-link' : 'div'}`" 
            :to="path" 
            :class="`g-flex-rsbc inner type-${type}`"
        >
            <div class="g-flex-rsc prefix-icon-text">
                <icon-font :icon="prefix" v-if="prefix"/>
                <span class="text" v-html="text"></span>
            </div>
            <icon-font :icon="suffix" v-if="suffix"/>
        </component>
    </div>
</template>

<style lang="scss" scoped>
.list-item{
    overflow: hidden;

    .prefix-icon-text{
        flex: 1;
    }

    .inner{
        color: var(--text-color);
        cursor: pointer;
        border-radius: var(--radius5px);
        user-select: none;

        &.type-big{
            margin: 6px 0;
            padding: 10px 10px;
        }

        &.type-middle{
            margin: 4px 0;
            padding: 8px 10px;
        }

        &.type-small{
            margin: 0;
            padding: 4px 10px;
        }
    }

    .iconfont{
        color: var(--menu-icon-color);
        font-size: 20px;
    }
    
    .inner:hover, .router-link-active{
        color: var(--active-color);
        background: var(--active-bg);

        .iconfont{
            color: var(--active-color);
        }

        .icon-right-arrow{
            left: 0;
            opacity: 1;
        }
    }

    .router-link-active{
        .icon-child-arrow{
            transform: rotate(-180deg);
        }
    }
    
    .icon-right-arrow{
        opacity: 0;
        position: relative;
        font-size: 24px;
        left: -20px;
        transition: all .3s;
    }

    .icon-child-arrow{
        display: inline-block;
        transition: all .3s;
        font-size: 14px;
    }

    .text{
        padding-left: 10px;
    }
}
</style>