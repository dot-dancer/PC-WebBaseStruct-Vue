<template>
 <el-config-provider :locale="elLocale">
    <cust-router-view></cust-router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useBaseStore } from '@/store'
const iStore = useBaseStore()

// 设置 ele plus 语言环境
const elLocale = computed(() => iStore.elLocale)

// 将当前登录用户信息存入状态管理器中
iStore.setLoginUser(app.getAppCtl().getLoginUser())

</script>

<style lang="scss">
html, body{
  background-color: var(--bg);
  background-image: linear-gradient(to bottom right, 
                                        var(--login-light-bg) 0%, 
                                        var(--login-middle-bg) 50%, 
                                        var(--login-deep-bg) 100%);
}

#idApp{
    min-height: 100vh;
    min-width: 100vw;
}
</style>