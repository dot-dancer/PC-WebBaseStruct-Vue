<template>
    <router-view v-slot="{ Component, route }"> 
        <transition v-if="false !== keepAlive">
            <keep-alive :exclude="gstNoCacheNames">
                <component :is="Component" :key="route.fullPath"/>
            </keep-alive>
        </transition>
        <component v-else :is="Component" :key="route.fullPath"/>
    </router-view>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useBaseStore } from '@/store';

const gstNoCacheNames = computed(() => useBaseStore().gstNoCacheNames)

const props = defineProps({
    keepAlive: {
        type: Boolean,
        default: () => true,
    },
})

const { keepAlive } = toRefs(props)

</script>

<style lang="scss" scoped>

</style>