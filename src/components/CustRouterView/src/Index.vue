<template>
    <router-view v-slot="{ Component, route }"> 
        <keep-alive :exclude="gstNoCacheNames" v-if="false !== keepAlive">
            <component :is="Component"/>
        </keep-alive>
        <!-- component加上:key可能会导致多个使用Dashboard的路由切换时, 创建新的Dashboard组件 -->
        <component v-else :is="Component"/>
    </router-view>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useBaseStore } from '@/store';

interface CustRouterViewPropType{
    keepAlive?: boolean;
}

const props = withDefaults(defineProps<CustRouterViewPropType>(), {
    keepAlive: true
})

const { keepAlive } = toRefs(props)
const gstNoCacheNames = computed(() => useBaseStore().gstNoCacheNames)

</script>

<style lang="scss" scoped>
</style>