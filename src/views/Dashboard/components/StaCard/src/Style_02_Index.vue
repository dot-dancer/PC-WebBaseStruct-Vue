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
    <title-panel :title="data.title" :class="`sta-card ${type}`">
        <router-link :to="data.path" class="g-flex-rsbc">
            <div class="cnt">
                <div class="number">
                    <span class="count">{{data.totalCount}}</span>
                </div>
                <div class="sub-title">
                    <div class="g-flex-rsc goup">
                        <icon-font icon="icon-curve"></icon-font>
                        <span>+{{data.weekCount}}</span>
                    </div>
                    <span class="desc">{{lpk('Last Week')}}</span>
                </div>
            </div>

            <div class="g-flex-ccc icon-w">
                <icon-font :icon="data.icon"></icon-font>
            </div>
        </router-link>
    </title-panel>
</template>

<style lang="scss" scoped>
.sta-card{
    position: relative;
    cursor: pointer;
    padding: 10px;

    a{
        .cnt{
            flex: 1;
        }
        
        .number{
            margin-top: 6px;
            margin-bottom: 10px;

            .count{
                color: #FFF;
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
            color: #EEE;
        }

        .icon-w{
            padding: 10px;
            width: 40px;
            height: 40px;
            border-radius: 50%;

            :deep(.iconfont){
                font-size: 34px;
            }
        }
    }

    &.member{
        background: linear-gradient(to right, #44A1F7 0%, #40E1FF 100%);

        .icon-w{
            color: #6444FF;
            background: rgba(239, 236, 255, .6);
        }
    }

    &.article{
        background: linear-gradient(to right, #9D7BFB 0%, #CA99FA 100%);

        .icon-w{
            color: #0DAFA5;
            background: #D5F4F2;
        }
    }

    &.comment{
        background: linear-gradient(to right, #86D7F4 0%, #99EEEB 100%);

        .icon-w{
            color: #6444FF;
            background: #DAEAFF;
        }
    }

    &.complaint{
        background: linear-gradient(to right, #FF5681 0%, #FFAC89 100%);

        .goup{
            color: #F7182D;
        }

        .icon-w{
            color: #FFBA0F;
            background: #FDF2DB;
        }
    }
}

</style>