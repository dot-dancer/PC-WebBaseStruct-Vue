<template>
    <i :class="`iconfont ${cls} ${icon}`"></i>
</template>

<script setup lang="ts" name="IconFont">
import { toRefs } from 'vue'
const props = defineProps({
    cls: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: ''
    }
})

const { icon } = toRefs(props)
</script>

<style lang="scss" scoped>

</style>