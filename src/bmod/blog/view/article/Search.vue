<template>
    <div>
        <input v-model="user.name"/>
        Article Search
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'

const user = reactive({
    name: 'lisi'
})

onMounted(() => {
    console.log('Article Search onMounted')
})

setTimeout(() => {
    user.name = 'search-lisi'
}, 5000)
</script>

<style lang="scss" scoped>

</style>