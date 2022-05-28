<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 用户条目
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/18   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { UserItemType } from './typing'
defineOptions({name: 'UserItem'})

//==============================================================================
//== 类型定义
interface UserItemPropType{
    data: UserItemType;
}

//==============================================================================
//== 初始化
const props = defineProps<UserItemPropType>()


//==============================================================================
//== 事件处理
</script>

<template>
    <title-panel class="g-flex-ccc user-item">
        <div class="invite">
            <el-tooltip content="邀请人" placement="top">
                <icon-font icon="icon-link"></icon-font>
            </el-tooltip>
        </div>
        <div class="tools">
            <ul class="g-flex-rsbc">
                <li class="edit">
                    <icon-font icon="icon-edit"></icon-font>
                </li>
                <li class="remove">
                    <icon-font icon="icon-trash"></icon-font>
                </li>
            </ul>
        </div>
        <img src="src/assets/imgs/portraits/8.jpg"/>
        <div class="g-flex-ccc desc">
            <div class="name">阿凡提</div>
            <div class="time">
                <icon-font icon="icon-time"></icon-font>
                <span>2022-05-12 23:20</span>
            </div>
            <div class="statistics">
                <ul class="g-flex-rsc">
                    <li>
                        <div class="count">20</div>
                        <div class="text">文章</div>
                    </li>
                    <li>
                        <div class="count">20</div>
                        <div class="text">收藏</div>
                    </li>
                    <li>
                        <div class="count">20</div>
                        <div class="text">评论</div>
                    </li>
                </ul>
            </div>
        </div>
    </title-panel>
</template>

<style lang="scss" scoped>
.user-item{
    position: relative;
    margin: 20px 0px;
    // width: 170px;
    padding: 20px;
    border-radius: var(--radius5px);
    @include shadow();
    @include hover-border();

    &:hover{
        .tools{
            opacity: 1;
            transform: translateY(-50%);
        }
    }

    .invite{
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 5px;

        :deep(.iconfont){
            font-size: 18px;
            color: var(--text-light-color);
        }
    }

    .tools{
        position: absolute;
        opacity: 0;
        left: 20px;
        top: 0px;
        transition: all .3s;
        
        li{
            @include shadow();
            cursor: pointer;
            margin: 0 6px;
            padding: 6px;
            border-radius: 50%;
            color: var(--text-reverse-color);

            &.edit{
                background: var(--deep-bg);
            }

            &.remove{
                background: var(--error-color);
            }
        }
    }

    img{
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
    }

    .desc{
        margin-top: 10px;

        .name{
            font-size: 16px;
            font-weight: bold;
        }

        .time{
            padding-top: 5px;
            font-size: 12px;
            color: var(--text-light-color);

            :deep(.iconfont){
                font-size: 14px;
                padding-right: 5px;
            }
        }

        .statistics{
            margin-top: 20px;

            li{
                padding-right: 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                &:last-child{
                    padding-right: 0;
                }

                .count{
                    font-size: 18px;
                    font-weight: bold;
                }

                .text{
                    color: var(--text-light-color);
                    padding-top: 5px;
                }
            }
        }
    }
}
</style>