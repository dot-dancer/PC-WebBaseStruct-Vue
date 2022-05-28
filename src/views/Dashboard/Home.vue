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
import { nanoid } from 'nanoid';
import StaCounter from './components/StaCounter'

defineOptions({name: 'Home'})

// =============================================================================
// = 定义类型

// =============================================================================
// = 初始化

</script>

<template>
    <div class="home">
        <div class="g-flex-rsbs inner">
            <div class="left">
                <div class="g-flex-rsbc stats">
                    <title-panel :title="lpk('RealTime Statistics')" class="user-stats">
                        <div class="g-flex-rsac">
                            <StaCounter
                                :count="181"
                                :text="lpk('Member')"
                                :unit="lpk('Unit Of Person')"
                            />

                            <StaCounter
                                :count="981"
                                :text="lpk('Article')"
                                :unit="lpk('Unit Of Article')"
                            />
                        </div>
                        <div class="todo-list">
                            <ul>
                                <li>
                                    <dot></dot>
                                    <span>近一周新增: 用户 20 人, 文章 30 篇</span>
                                </li>

                                <li>
                                    <dot type="error"></dot>
                                    <span>近一周新增投诉: 20 条</span>
                                </li>
                            </ul>
                        </div>
                    </title-panel>

                    <title-panel :title="lpk('Trend Statistics')" class="trend-stats">
                        <template #toolsSlot>
                            <div class="g-flex-rsac tools-time-query">
                                <div class="g-flex-rsac query-item type">
                                    <span>{{lpk('新增文章')}}</span>
                                    <icon-font icon="icon-down-arrow icon-arrow"></icon-font>
                                </div>
                                <div class="g-flex-rsac query-item time">
                                    <icon-font icon="icon-date"></icon-font>
                                    <span>{{lpk('Time Range', {index: 1})}}</span>
                                    <icon-font icon="icon-down-arrow icon-arrow"></icon-font>
                                </div>
                            </div>
                        </template>
                        <base-chart :data="[{labels: ['a', 'b'], values: [[1, 2], [3, 4]]}]"></base-chart>
                    </title-panel>
                </div>

                <title-panel title="活跃用户" class="active-users">
                    <div class="inner">
                        <ul class="g-flex-rsc">
                            <li v-for="index in 9">
                                <el-tooltip content="最近登录时间: 2022-05-17 21:22" placement="top">
                                    <router-link to="/" class="g-flex-ccc">
                                        <img :src="`src/assets/imgs/portraits/${index-1}.jpg`"/>
                                        <span>{{nanoid().substring(0, 6)}}</span>
                                    </router-link>
                                </el-tooltip>
                            </li>
                        </ul>
                    </div>
                </title-panel>

                <title-panel title="阅读排行" class="hot-articles">
                    <div class="inner">
                        <ul>
                            <li v-for="index in 10">
                                <article-item></article-item>
                            </li>
                        </ul>
                    </div>
                </title-panel>
            </div>
            <div class="right">
                <title-panel class="g-flex-ccs portal-entry">
                    <div class="title">{{lpk('Portal Site Entry')}}</div>
                    <div class="btn">{{lpk('Click To Visit')}}</div>
                </title-panel>
                <title-panel :title="lpk('Quick Entry')" class="tools-box">
                    <div class="inner">
                        <ul class="g-flex-rsbs">
                            <li>
                                <router-link to="/" class="g-flex-ccc">
                                    <icon-font icon="icon-statistics"></icon-font>
                                    <span>访问统计</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/" class="g-flex-ccc">
                                    <icon-font icon="icon-bianjiqi"></icon-font>
                                    <span>文章管理</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/" class="g-flex-ccc">
                                    <icon-font icon="icon-tag"></icon-font>
                                    <span>标签管理</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/" class="g-flex-ccc">
                                    <icon-font icon="icon-pinglun"></icon-font>
                                    <span>评论管理</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </title-panel>

                <title-panel title="最新评论" class="last-comment">
                    <div class="inner">
                        <ul>
                            <li v-for="index in 3">
                                <div class="g-flex-rsc name-time">
                                    <span class="txtellipsis name">{{nanoid().substring(0, 7)}}</span>
                                    <span class="time">2022-05-17 22:30</span>
                                </div>
                                <div class="text">健康快乐每一天, 多运动.</div>
                                <div class="g-flex-ccc icon-bg reply">
                                    <el-tooltip placement="top" content="回复">
                                        <icon-font icon="icon-reply"></icon-font>
                                    </el-tooltip>
                                </div>
                            </li>
                        </ul>
                    </div>
                </title-panel>

                <title-panel title="最新注册" class="last-regist">
                    <ul>
                        <li v-for="index in 6" class="g-flex-rsbc">
                            <div class="g-flex-rsc portrait-name">
                                <img :src="`src/assets/imgs/portraits/${20 - index}.jpg`"/>
                                <div class="g-flex-ccs name-time">
                                    <span class="txtellipsis name">{{nanoid().substring(0, 7)}}</span>
                                    <span class="time">2022-05-17 15:23</span>
                                </div>
                            </div>
                            <div class="g-flex-ccc icon-bg inviteer">
                                <el-tooltip placement="top" :content="`邀请人: ${nanoid().substring(0, 7)}`">
                                    <icon-font icon="icon-link"></icon-font>
                                </el-tooltip>
                            </div>
                        </li>
                    </ul>
                </title-panel>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
$sta-panel-height: 210px;

.home{
    .inner{
        .active-users, .hot-articles, .tools-box, .last-comment, .last-regist{
            margin-top: $g-space;

            .inner{
                margin-top: 10px;
            }
        }

        .left{
            flex: 1;
            width: 0;
            overflow-x: hidden;
            .user-stats{
                flex: 2;
                max-width: 400px;
                margin-right: $g-space;
                height: $sta-panel-height;
                background: var(--bg);
            }
            .trend-stats{
                flex: 4;
                height: $sta-panel-height;
            }

            .todo-list{
                margin-top: 20px;

                li{
                    margin: 10px 0;
                    padding: 8px;
                    font-size: 12px;
                    border-radius: var(--radius5px);
                    background: var(--light-bg);
                }
            }

            .tools-time-query{
                padding: 8px 15px;
                border: 1px solid var(--border-color);
                border-radius: 20px;

                .time{
                    margin-left: 20px;
                }

                :deep(.iconfont){
                    font-size: 16px;
                    padding-right: 5px;
                }

                :deep(.icon-down-arrow){
                    font-size: 12px;
                    padding-left: 5px;
                }
            }

            .active-users{
                overflow: hidden;

                &:hover{
                    overflow: auto;
                }
                
                .inner{
                    margin-top: 10px;

                    li{
                        margin: 10px;
                        a{
                            color: var(--text-color);

                            img{
                                width: 60px;
                                height: 60px;
                                border-radius: 50%;
                                object-fit: cover;
                            }

                            span{
                                padding-top: 10px;
                            }
                        }
                    }
                }
            }
        }

        .right{
            width: 300px;
            margin-left: $g-space;
            min-height: 100vh;

            .portal-entry{
                height: 86px;
                padding-left: 20px;
                background: url(@/assets/imgs/portal-entry-bg.jpg) no-repeat;
                background-size: cover;

                .title{
                    color: var(--text-reverse-color);
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 15px;
                }

                .btn{
                    cursor: pointer;
                    color: var(--text-reverse-color);
                    display: inline-block;
                    background: rgba(var(--text-color-red), var(--text-color-green), var(--text-color-blue), 0.4);
                    padding: 6px 20px;
                    border-radius: 20px;
                    transition: all .3s;

                    &:hover{
                        color: var(--text-color);
                        background: var(--text-reverse-color);
                    }
                }
            }

            .tools-box{
                .inner{

                    li{
                        a{
                            padding: 6px 4px;
                            border-radius: var(--radius5px);
                            color: var(--text-color);
                            transition: all .3s;

                            span{
                                padding-top: 5px;
                            }
                            :deep(.iconfont){
                                font-size: 26px;
                            }

                            &:hover{
                                background: rgba(var(--text-color-red), var(--text-color-green), var(--text-color-blue), 0.1);
                            }
                        }
                    }
                }
            }

            .last-comment, .last-regist{
                .icon-bg{
                    cursor:pointer;
                    position: absolute;
                    top: 50%;
                    right: 5px;
                    transform: translateY(-50%);
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: var(--light-bg);

                    :deep(.iconfont){
                        font-size: 18px;
                    }
                }
            }

            .last-comment{
                li{
                    position: relative;
                    margin-top: 10px;
                    padding: 10px 0;
                    border-bottom: 1px dashed var(--border-color);

                    &:last-child{
                        border: none;
                    }

                    .name-time{
                        padding-right: 20px;
                        margin-bottom: 10px;

                        .name, .time{
                            display: inline-block;
                        }
                        
                        .name{
                            max-width: 100px;
                            padding-right: 10px;
                            font-weight: bold;
                        }

                        .time{
                            font-size: 12px;
                            color: var(--desc-color);
                        }
                    }

                    .text{
                        color: var(--text-light-color);
                    }

                    .reply{
                        :deep(.iconfont){
                            font-size: 20px;
                        }
                    }
                }
            }

            .last-regist{
                margin-bottom: 10px;
                li{
                    position: relative;
                    margin-top: 10px;
                    padding: 10px 0;
                    border-bottom: 1px dashed var(--border-color);
                    &:last-child{
                        border: none;
                    }

                    img{
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                        object-fit: cover;
                        padding-right: 10px;
                    }

                    .portrait-name{
                        .name{
                            font-weight: bold;
                            max-width: 100px;
                            padding-bottom: 10px;
                        }

                        .time{
                            font-size: 12px;
                            color: var(--desc-color);
                        }
                    }
                }
            }
        }
    }
}
</style>