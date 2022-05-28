<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 搜索组件
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/22   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { toRefs, reactive } from 'vue'

defineOptions({name: 'Search'})

//==============================================================================
//== 类型定义
interface SearchPropType{
    advColumns?: GlobalType.ARecord[]
}

interface SearchStateType{
    searchKey: string;
    advColumns: GlobalType.ARecord;
}

//==============================================================================
//== 初始化
const props = withDefaults(defineProps<SearchPropType>(), {
    advColumns: () => []
})


const iState = reactive<SearchStateType>({
    searchKey: '',
    advColumns: props.advColumns
})

//==============================================================================
//== 事件处理
</script>

<template>
    <div class="g-flex-rsbc search">
        <div class="txt">
            <input v-model.trim="iState.searchKey" type="text" placeholder="请输入搜索内容"/>
            <span class="clear" v-if="iState.searchKey.length" @click="() => iState.searchKey = ''">
                <icon-font icon="icon-delete-solid"></icon-font>
            </span>
        </div>
        <div class="g-flex-rsbc oper-btn">
            <icon-font icon="icon-search"></icon-font>
            <span class="line"></span>
            <icon-font icon="icon-refresh"></icon-font>
            <span class="line" v-if="iState.advColumns.length"></span>
            <icon-font icon="icon-double-arrow-down" v-if="iState.advColumns.length"></icon-font>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.search{
    color: var(--text-reverse-color);

    .txt, .oper-btn{
        padding: 7px 10px;
    }

    .txt{
        position: relative;
        border-top-left-radius: var(--radius25px);
        border-bottom-left-radius: var(--radius25px);
        background: var(--bg);
        border: 1px solid var(--border-color);

        input{
            border: none;
            width: 160px;
            padding: 1px 0;
        }

        .clear{
            position: absolute;
            right: 0px;
            top: 7px;
            color: var(--text-light-color);
        }
    }

    .oper-btn{
        padding-right: 4px;
        border-top-right-radius: var(--radius25px);
        border-bottom-right-radius: var(--radius25px);
        background: var(--deep-bg);
    }

    :deep(.iconfont){
        padding: 0 8px;
    }

    :deep(.iconfont){
        cursor: pointer;
        font-size: 16px;

        &:first-child{
            padding-left: 0;
        }
    }

    .line{
        padding: 0;
        width: 1px;
        height: 18px;
        background-color: var(--border-hover-color);
    }
}
</style>