<template>
<div>
    <router-link :to="{name: 'articleList'}">{{lpk('blog.Article.Title')}}</router-link><br/>
    <router-view v-slot="{ Component }"> 
        <transition>
            <keep-alive>
                <component :is="Component"/>
            </keep-alive>
        </transition>
    </router-view>
</div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>

</style>