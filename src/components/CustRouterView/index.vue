<template>
    <router-view v-slot="{ Component, route }"> 
        <transition :name="transitionName">
            <keep-alive :exclude="gstNoCacheNames" v-if="false !== keepAlive">
                <component :is="Component" :key="route.fullPath"/>
            </keep-alive>
            <component v-else :is="Component" :key="route.fullPath"/>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { get } from 'lodash'
import { computed, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { useBaseStore } from '@/store';

const props = defineProps({
    keepAlive: {
        type: Boolean,
        default: () => true,
    },
})

const iRoute = useRoute()

const { keepAlive } = toRefs(props)
const gstNoCacheNames = computed(() => useBaseStore().gstNoCacheNames)
const transitionName = computed(() => get(iRoute, 'meta.transition') || '')

</script>

<style lang="scss" scoped>
    .login-leave-to{
        transition: all .3s ease-out;
    }

    .login-enter-to{
        transition: all 1s ease;
    }

    .login-leave-to {
        transform: translateY(-100%) rotate(-180deg);
    }

    .login-enter-from{
        transform: translateY(100%) rotate(180deg);
    }
    .login-enter-to {
        transform: translateY(0) rotate(0deg);
    }
</style>