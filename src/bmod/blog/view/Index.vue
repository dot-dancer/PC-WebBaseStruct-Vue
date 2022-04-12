<template>
<div>
    <router-link to="/blog/article/list">Article List</router-link><br/>
    <router-link to="/blog/article/search">Article Search</router-link><br/>
    <router-link to="/blog/article/add">Add Article</router-link><br/>
    <router-link to="/blog/profile">Blog Profile</router-link><br/>
    <router-link to="/blog/type/list">Article Type List</router-link>
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