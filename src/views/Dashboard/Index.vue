<script setup lang="ts">
import IconFont from '@/components/IconFont/index.vue';
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 控制中心主页
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
import { useBaseStore } from '@/store'
import Menu from './components/Menu.vue'

</script>

<template>
    <div class="dashboard">
        <div class="g-flex-rsbs inner">
            <div class="left">
                <div class="g-flex-rcc system-title">
                    <icon-font icon="icon-gift"/>
                    <span class="title">{{lpk('System.Title')}}</span>
                </div>
                <Menu></Menu>
            </div>
            <div class="center">
                <div class="g-flex-rsc tbar">
                    <div class="tleft">
                        <div class="module-title">{{useBaseStore().stMainTitle}}</div>
                    </div>
                    <div class="tright">
                        <ul class="g-flex-rss">
                            <li>
                                <icon-font icon="icon-bell"/>
                            </li>
                            <li>
                                <icon-font icon="icon-user-circle"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="content">
                    <cust-router-view></cust-router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.dashboard{
    padding: 10px;

    .left{
        width: 240px;
        padding: 0 15px;
        padding-top: 20px;
        box-sizing: border-box;
        min-height: calc(100vh - 20px);
        background: var(--light-bg);
        border-top-left-radius: var(--radius15px);
        border-bottom-left-radius: var(--radius15px);

        .system-title{
            .iconfont{
                color: var(--active-color);
                font-size: 22px;
            }

            .title{
                padding-left: 4px;
                font-size: 18px;
            }
        }

        
    }

    .center{
        flex: 1;
        padding-left: 20px;
        border-top-right-radius: var(--radius15px);
        border-bottom-left-radius: var(--radius15px);

        .tbar{
            .tleft{
                flex: 1;

                .module-title{
                    padding: 20px 0;
                    font-size: 18px;
                    font-weight: bold;
                }
            }

            .tright{
                li{
                    margin:0 5px;
                    cursor: pointer;

                    .iconfont{
                        font-size: 20px;
                    }
                }
            }
        }
    }
}
</style>