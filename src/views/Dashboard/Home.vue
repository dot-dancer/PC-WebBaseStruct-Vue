<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 主页内容
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
import { reactive } from 'vue'
import type { StaItemType } from './components/StaCard'
import StaCard from './components/StaCard'

defineOptions({name: 'Home'})

// =============================================================================
// = 定义类型
interface StaListType{
    sta: {
        member: StaItemType;
        article: StaItemType;
        complaint: StaItemType;
        comment: StaItemType;
    }
}

// =============================================================================
// = 初始化
const iState = reactive<StaListType>({
    sta: { // 统计相关
        member: { // 会员统计
            title: lpk('Member'),
            weekCount: 0,
            totalCount: 102,
            icon: 'icon-biaoshilei_yonghuzu',
            path: 'user',
            unit: lpk('Unit Of Person'),
        },
        article: { // 文章统计
            title: lpk('Article'),
            weekCount: 0,
            totalCount: 813,
            icon: 'icon-bianjiqi',
            path: 'article',
            unit: lpk('Unit Of Article'),
        },
        comment: { // 评论统计
            title: lpk('Comment'),
            weekCount: 0,
            totalCount: 90,
            icon: 'icon-pinglun',
            path: 'comment',
            unit: lpk('Unit Of Comment'),
        },
        complaint: { // 投诉统计
            title: lpk('Complaint'),
            weekCount: 0,
            totalCount: 8,
            icon: 'icon-alerting',
            path: 'complaint',
            unit: lpk('Unit Of Complaint'),
        },
    },
})

</script>

<template>
    <div class="home">
        <div class="g-flex-rsbs inner">
            <div class="left">
                <div class="sta-list">
                    <ul class="g-flex-rsbc">
                        <li v-for="(value, key) in iState.sta" :key="key">
                            <StaCard :data="value" :type="key"/>  
                            <!-- <div class="line"></div> -->
                        </li>
                    </ul>
                </div>
            </div>
            <div class="right">

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home{
    .inner{
        .left{
            flex: 1;

            .sta-list{
                li:last-child{
                    .line{
                        display: none;
                    }
                }

                li{
                    width: 24%;

                    .line{
                        margin-right: 20px;
                        width: 1px;
                        height: 100px;
                        border-right: 1px dashed var(--border-color);
                    }
                }
            }
        }

        .right{
            width: 260px;
            margin-left: 15px;
            min-height: 100vh;
        }
    }
}
</style>