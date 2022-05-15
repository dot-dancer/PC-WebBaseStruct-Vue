<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 图标组件
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/03   1.0     dotdancer  创建 
</PRE>
*******************************************************************************/
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