<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 图标按钮
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/18   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { ref, toRefs, useAttrs } from 'vue'

defineOptions({name: 'IconButton'})

//==============================================================================
//== 类型定义
interface IconButtonPropType{
    plain?: boolean;
    text?: string;
    icon?: string;
    iconType?: string;
    handler?: any;
}

//==============================================================================
//== 初始化
const props = withDefaults(defineProps<IconButtonPropType>(), {
    text: '',
    icon: '',
    iconType: '',
})

const { plain, text, icon, iconType, handler } = toRefs(props)
const { type = 'primary' } = toRefs(useAttrs())

const refRealIcon = ref<string>(icon.value)
if (!refRealIcon.value && iconType.value){
    switch(iconType.value){
        case 'add': {
            refRealIcon.value = 'icon-add'
        }
        break

        case 'edit': {
            refRealIcon.value = 'icon-edit'
        }
        break

        case 'remove': {
            refRealIcon.value = 'icon-trash'
        }
        break
    }
}


//==============================================================================
//== 事件处理
</script>

<template>
    <a 
        v-if="plain"
        href="javascript:void(0)"
        class="icon-button icon-plain-tag"
        :class="`plain-${type}`" 
        @click="handler"
    >
        <icon-font v-if="refRealIcon" :icon="refRealIcon"></icon-font>
        <span v-if="text">{{ text }}</span>
        <span v-else><slot></slot></span>
    </a>
    <el-button 
        v-else
        type="primary" 
        v-bind="$attrs" 
        round 
        class="icon-button" 
        @click="handler"
    >
        <icon-font v-if="refRealIcon" :icon="refRealIcon"></icon-font>
        <span v-if="text">{{ text }}</span>
        <span v-else><slot></slot></span>
    </el-button>
</template>

<style lang="scss" scoped>
.icon-button{
    :deep(.iconfont){
        font-size: 16px;
    }

    span{
        padding-left: 5px;
    }

    &.icon-plain-tag{
        padding-right: 12px;

        &.plain-danger{
            color: var(--error-color);
        }
    }
}
</style>