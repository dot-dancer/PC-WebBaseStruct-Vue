<template>
 <el-config-provider :locale="elLocale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { get } from 'lodash'
import { computed } from 'vue'
import { useStore } from 'vuex'
const iStore = useStore()
const elLocale = computed(() => get(iStore, 'state.base.elLocale'))

</script>

<style lang="scss">
html, body{
  background-color: var(--bg);
}

#idApp{
    min-height: 100vh;
    min-width: 100vw;
}
</style>