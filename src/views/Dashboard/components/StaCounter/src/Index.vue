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
2022/05/15   1.0     dotdancer  创建 
</PRE>
*******************************************************************************/
import { toRefs } from 'vue'

defineOptions({name: 'StaCounter'})

interface StaCounterPropType{
    count: number;
    text: string;
    unit: string;
}

// =============================================================================
// = 初始化
const props = defineProps<StaCounterPropType>()
const { count, text, unit } = toRefs(props)

</script>

<template>
    <div class="g-flex-ccc sta-counter">
        <div class="count-w">
            <span class="count">{{ count }}</span>
        </div>
        <div class="text">
            <span>{{ text }}</span>
            <span class="unit">({{ unit }})</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sta-counter{
    position: relative;
    margin: 25px 0;

    .count-w{
        .count{
            font-size: 30px;
            font-weight: bold;
        }
    }

    .unit{
        color: var(--desc-color);
    }
}

</style>