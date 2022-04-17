<template>
    <div class="dashboard">
        <div>LoginUser: {{iLoginUser.userName}}</div>
        <div><router-link :to="{name: 'theme'}">主题</router-link></div>
        <div><router-link :to="{name: 'blogIndex'}">Blog</router-link></div>
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
import { computed } from 'vue'
import { useStore } from 'vuex'

// =============================================================================
// = 将当前登录用户信息存入状态管理器中
const iStore = useStore()
iStore.commit('setLoginUser', app.getAppCtl().getLoginUser())

const iLoginUser = computed(() => iStore.getters.getLoginUser)

</script>

<style lang="scss" scoped>
.dashboard{
}
</style>