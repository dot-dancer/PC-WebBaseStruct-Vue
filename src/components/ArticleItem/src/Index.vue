<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 文章列表条目
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/15   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { toRefs } from 'vue'
import { ArticleItemType } from './typing'

defineOptions({name: 'ArticleItem'})

//==============================================================================
//== 类型定义
interface ArticleItemPropType{
    data: ArticleItemType;
}

//==============================================================================
//== 初始化
const props = defineProps<ArticleItemPropType>()

const { data } = toRefs(props);

//==============================================================================
//== 事件处理
const onToolItemClickHandler = (item: ArticleItemType) => {
}
</script>

<template>
    <div class="article-item">
        <div class="g-flex-rsbc">
            <img src="../../../assets/imgs/banners/1.jpg"/>
            <div class="content">
                <div class="g-flex-rsbc title-time">
                    <router-link to="/" class="title">
                        <span class="text">标签类别: 第一次做这种剪影类海报，磨好几天的细节</span>
                    </router-link>
                    <div class="time">2022-05-17 21:22</div>
                </div>
                <div class="desc">如果有3d模型，其实这种逆光剪影效果用3d软件做是比较方便的，但我这次是用ps做的练习，目的就是希望能够感受基础，明暗关系，剪映轮廓等等。收获很多，分享一些感悟点吧。</div>
                <div class="g-flex-rsc author-tools">
                    <div class="g-flex-rsc tag">
                        <icon-font icon="icon-tag-01"></icon-font>
                        <span>标签一</span>
                        <span>标签二</span>
                        <span>标签三</span>
                    </div>

                    <ul class="g-flex-rsc">
                        <li class="g-flex-rsc">
                            <icon-font icon="icon-user-circle"></icon-font>
                            <span>果一梨</span>
                        </li>
                        <li class="g-flex-rsc">
                            <icon-font icon="icon-eye"></icon-font>
                            <span>100</span>
                        </li>
                        <li class="g-flex-rsc">
                            <icon-font icon="icon-reply"></icon-font>
                            <span>100</span>
                        </li>
                        <li class="g-flex-rsc">
                            <icon-font icon="icon-heart"></icon-font>
                            <span>100</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.article-item{
    display: block;
    color: var(--text-color);
    border: 2px solid transparent;
    border-radius: var(--radius5px);
    padding: 15px 10px;

    &:hover{
        border: 2px solid var(--border-hover-color);
    }

    img{
        width: 150px;
        height: 112px;
        object-fit: cover;
        border-radius: var(--radius5px);
    }

    .content{
        margin-left: 10px;
        flex: 1;

        .title-time{
            height: 30px;
            overflow: hidden;

            .title{
                flex: 1;
                color: var(--text-color);
                font-size: 18px;
                font-weight: bold;
            }
        }

        .tag{
            cursor: pointer;
            max-width: 150px;
            margin: 2px 0;
            margin-right: 10px;
            padding:4px 10px;
            font-size: 12px;
            color: var(--text-light-color);
            background: var(--light-bg);
            border-radius: 20px;
            border-top-left-radius: 0;

            span{
                padding:0 4px;
            }
        }

        .desc{
            margin: 5px 0;
            height: 50px;
            line-height: 25px;
            overflow: hidden;
            color: var(--text-light-color);
        }

        .author-tools{
            margin-top: 5px;
            li{
                margin-right: 20px;
                
                :deep(.iconfont){
                    font-size: 20px;
                    padding-right: 5px;
                }
            }
        }
    }
}
</style>