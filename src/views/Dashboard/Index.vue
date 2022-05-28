<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : Dashboard主页
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
import Menu from './components/Menu'

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
                <div class="g-flex-rsc tbar-normal tbar">
                    <div class="tleft">
                        <div class="module-title">{{useBaseStore().stMainTitle}}</div>
                    </div>
                    <div class="tright">
                        <ul class="g-flex-rsc">
                            <li>
                                <icon-font icon="icon-bell"/>
                            </li>
                            <li>
                                <icon-font icon="icon-user-circle"/>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- <div class="tbar-normal"></div> -->
                <div class="content">
                    <cust-router-view></cust-router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$leftWidth: 220px;
$paddingLR: $g-space;

.dashboard{
    padding: 0px;
    box-sizing: border-box;

    .left{
        width: $leftWidth;
        padding: 0 15px;
        padding-top: 20px;
        box-sizing: border-box;
        min-height: 100vh;

        .system-title{
            .iconfont{
                color: var(--active-color);
                font-size: 22px;
            }

            .title{
                padding-left: 4px;
                font-size: 18px;
                font-weight: bold;
            }
        }

        
    }

    .center{
        flex: 1;
        min-height: 100vh;
        background: var(--light-bg);
        padding-bottom: 20px;

        .tbar-normal{
            height: 50px;
            width: 100%;
            overflow: hidden;
        }

        .tbar{
            // position: fixed;
            // top: 0;
            // left: calc($leftWidth + $paddingLR);
            // z-index: 100000;
            // background: var(--light-bg);
            box-sizing: border-box;
            padding: 0 $paddingLR;

            .tleft{
                flex: 1;

                .module-title{
                    padding: 14px 0;
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

        .content{
            padding-left: $paddingLR;
            padding-right: $paddingLR;
        }
    }
}
</style>