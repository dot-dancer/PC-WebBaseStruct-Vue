<template>
    <div>
        <div><router-link :to="{path: 'test'}">test</router-link></div>
        <div><router-link :to="{path: 'detail'}">detail</router-link></div>
        <div>Detail Page</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

defineOptions({name: 'DetailPage'})

onMounted(() => {
    console.log('Detail Page onMounted')
})

</script>

<style lang="scss" scoped>

</style>