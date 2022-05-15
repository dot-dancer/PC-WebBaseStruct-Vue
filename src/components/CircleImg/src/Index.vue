<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 圆形图片组件
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/12   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { toRefs } from 'vue'

defineOptions({name: ''})

//==============================================================================
//== 类型定义
interface CircleImgPropType{
    src?: string;
    width?: number;
    height?: number;
    icon?: string;
    iconSize?: number;
}

//==============================================================================
//== 初始化
const props = withDefaults(defineProps<CircleImgPropType>(), {
    src: '',
    width: 100,
    height: 100,
    icon: '',
    iconSize: 14,
})

const { src, width, height, icon, iconSize } = toRefs(props)

//==============================================================================
//== 事件处理
</script>

<template>
    <span :class="`circle-img ${icon ? 'icon' : ''}`">
        <i :class="`iconfont ${icon}`" :style="{fontSize: `${iconSize}px`}" v-if="icon"></i>
        <img :src="src" :width="`${width}px`" :height="`${height}px`" v-else/>
    </span>
</template>

<style lang="scss" scoped>
.circle-img{
    border-radius: 50%;

    &.icon{
        padding: 10px;
    }
}
</style>