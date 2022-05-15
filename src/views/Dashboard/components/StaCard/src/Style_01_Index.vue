<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 主页数字统计组件
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
import type { StaItemType } from './typing'

defineOptions({name: 'StaCard'})

interface StaPropType{
    type: string;
    data: StaItemType
}

// =============================================================================
// = 初始化
const props = defineProps<StaPropType>()
const { type, data } = toRefs(props)

</script>

<template>
    <div :class="`sta-card ${type}`">
        <div class="title">{{data.title}}</div>
        <div class="number">
            <span class="count">{{data.totalCount}}</span>
        </div>
        <div class="sub-title">
            <div class="g-flex-rsc goup">
                <icon-font icon="icon-goup"></icon-font>
                <span>+{{data.weekCount}}</span>
            </div>
            <span class="desc">{{lpk('Last Week')}}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sta-card{
    position: relative;
    cursor: pointer;
    padding: 10px;

    .number{
        margin-top: 6px;
        margin-bottom: 10px;

        .count{
            font-weight: bold;
            font-size: 28px;
        }
    }

    .sub-title{
        font-size: 12px;
    }

    .goup{
        display: inline;
        color: #83C8AB;

        span{
           padding: 0 5px;
        }
    }

    .desc{
        color: var(--desc-color);
    }

    &.complaint{
        .goup{
            color: #BD5463;
        }
    }
}

</style>