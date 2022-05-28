<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 源点控件
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/16   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
defineOptions({name: 'Dot'})

//==============================================================================
//== 类型定义
interface DotPropType{
    type?: string;
    size?: number;
}


//==============================================================================
//== 初始化
const props = withDefaults(defineProps<DotPropType>(), {
    type: 'normal',
    size: 8,
})

const { type, size } = props;

//==============================================================================
//== 事件处理
</script>

<template>
    <div :class="`dot ${type}`" :style="{width: `${size}px`, height: `${size}px`}"></div>
</template>

<style lang="scss" scoped>
.dot{
    display: inline-block;
    border-radius: 50%;
    margin-right: 5px;

    &.normal{
        background: var(--deep-bg);
    }

    &.error{
        background: var(--error-color);
    }

}
</style>