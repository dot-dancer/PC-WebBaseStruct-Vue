<template>
<div>
    <router-link :to="{name: 'articleList'}">文章列表</router-link><br/>
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