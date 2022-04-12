<template>
    <div>
        <input />
        Article List
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'

const user = reactive({
    name: 'zs'
})

onMounted(() => {
    console.log('Article List onMounted')
})

setTimeout(() => {
    user.name = 'update-zs'
}, 5000)
</script>

<style lang="scss" scoped>

</style>