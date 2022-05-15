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
    <title-panel :title="data.title">
        <div :class="`sta-card ${type}`">
            <router-link :to="data.path" class="g-flex-rsbc">
                <div class="cnt">
                    <div class="number">
                        <span class="count">{{data.totalCount}}</span>
                        <span class="unit">({{data.unit}})</span>
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
        </div>
    </title-panel>
</template>

<style lang="scss" scoped>
.sta-card{
    position: relative;
    cursor: pointer;
    padding: 0 4px;
    padding-top: 30px;
    padding-bottom: 0;

    a{
        .cnt{
            flex: 1;
        }
        
        .number{
            margin-top: 6px;
            margin-bottom: 10px;

            .count{
                color: var(--text-color);
                font-weight: bold;
                font-size: 26px;
            }

            .unit{
                padding-left: 5px;
                color: var(--desc-color);
            }
        }

        .sub-title{
            position: absolute;
            right: 0;
            top: -16px;
            font-size: 12px;
        }

        .goup{
            display: inline;
            color: #2BB578;

            span{
                padding: 0 5px;
            }
        }

        .desc{
            color: var(--desc-color);
        }

        .icon-w{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: none !important;

            :deep(.iconfont){
                font-size: 34px;
            }
        }
    }

    &.member{
        .icon-w{
            color: #6B75FE;
        }
    }

    &.article{
        .icon-w{
            color: #2BB578;
        }
    }

    &.comment{
        .icon-w{
            color: #FFBA0F;
        }
    }

    &.complaint{
        .goup{
            color: #F7182D;
        }

        .icon-w{
            color: #F7182D;
        }
    }
}

</style>