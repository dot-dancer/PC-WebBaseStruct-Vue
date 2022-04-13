<template>
    <div class="dashboard">
        <router-link :to="{name: 'blogIndex'}">Blog</router-link>
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
.dashboard{
}
</style>