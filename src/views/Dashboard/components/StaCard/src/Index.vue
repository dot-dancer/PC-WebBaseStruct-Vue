<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 主页数字统计组件
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
import type { StaItemType } from './typing'

defineOptions({name: 'StaCard'})

interface StaPropType{
    type: string;
    data: StaItemType
}

// =============================================================================
// = 初始化
const props = defineProps<StaPropType>()

</script>

<template>
    <title-panel :title="lpk('')">
        <div class="sta-card">
        </div>
    </title-panel>
</template>

<style lang="scss" scoped>
.sta-card{
    position: relative;
}

</style>