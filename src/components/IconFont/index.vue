<script setup lang="ts" name="IconFont">
import { toRefs } from 'vue'

interface IconFontPropType{
    icon: string;
}

const props = defineProps<IconFontPropType>()
const { icon } = toRefs(props)

</script>

<template>
    <i :class="`iconfont ${icon}`"></i>
</template>

<style lang="scss" scoped>

</style>