<script setup lang="ts">
</script>

<template>
    <ul class="menu">
        <li v-for="index in 8">
            <router-link :to="{name: 'articleList'}" class="g-flex-rsbc content">
                <div class="g-flex-rsc left-icon-text">
                    <icon-font icon="icon-home"/>
                    <span class="text">Dashboard</span>
                </div>
                <icon-font icon="icon-child-arrow icon-down-solid-arrow" v-if="2==index"/>
                <icon-font icon="icon-right-arrow" v-else/>
            </router-link>
            <div class="children" v-if="2==index">
                <ul>
                    <li v-for="k in 2">
                        <router-link :to="`/blog/${k}`" class="g-flex-rsbc content">
                            <div class="g-flex-rsc left-icon-text">
                                <icon-font icon="icon-home"/>
                                <span class="text">Dashboard_child</span>
                            </div>
                            <icon-font icon="icon-right-arrow"/>
                        </router-link>
                    </li>
                </ul>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.menu{

    li{
        margin: 15px 0;
        overflow: hidden;

        a{
            color: var(--text-color);
            padding: 8px 10px;
            cursor: pointer;
            border-radius: var(--radius5px);
        }

        a:hover, .router-link-active{
            color: var(--active-color);
            background: var(--active-bg);

            .iconfont{
                color: var(--active-color);
            }

            .icon-right-arrow{
                left: 0;
                opacity: 1;
            }
        }

        &:hover{
            .children{
                height: auto;
                opacity: 1;
            }

            .icon-child-arrow{
                transform: rotate(-180deg);
            }
        }

        .left-icon-text{
            flex: 1;
        }

        .iconfont{
            color: var(--icon-color);
            font-size: 20px;
        }

        .text{
            padding-left: 10px;
        }

        .icon-child-arrow{
            display: inline-block;
            transition: all .3s;
            font-size: 14px;
        }

        .icon-right-arrow{
            opacity: 0;
            position: relative;
            font-size: 24px;
            left: -20px;
            transition: all .3s;
        }

        .children{
            transition: all .3s;
            box-sizing: border-box;
            height: 0;
            opacity: 0;
            overflow: hidden;
            margin-left: 20px;
        }
    }
}
</style>