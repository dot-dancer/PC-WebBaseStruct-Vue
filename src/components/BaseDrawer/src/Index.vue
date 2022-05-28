<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 抽屉组件
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/28   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { ref, toRefs, reactive } from 'vue'

defineOptions({name: 'BaseDrawer'})

//==============================================================================
//== 类型定义
interface BaseDrawerPropType{
    model: boolean;
    enableDefaultButtons?: boolean;
    setVisible?: any;
    onSubmit: any;
    onOpen?: any;
    onClose?: any;
    buttons?: GlobalType.MenuOrButtonConfigType[];
}

interface BaseDrawerStateType{
    giButtons: GlobalType.MenuOrButtonConfigType[];
}

//==============================================================================
//== 初始化
const props = withDefaults(defineProps<BaseDrawerPropType>(), {
    enableDefaultButtons: true,
    buttons: () => [],
})

const { setVisible, onSubmit, onOpen, onClose } = props;
const { model, enableDefaultButtons, buttons } = toRefs(props)

const iState = reactive<BaseDrawerStateType>({
    giButtons: [...buttons.value]
})

if (enableDefaultButtons) {
    iState.giButtons.unshift({
        text: '取消',
        type: 'info',
        handler(){
            setVisible(false)
        }
    })

    iState.giButtons.push({
        text: '确定',
        handler(){
            console.log('确定----')
            onSubmit && onSubmit()
        }
    })
}

// 清空所有按钮的图标
iState.giButtons.map(item => item.icon = '')

//==============================================================================
//== 事件处理
const onOpenHandler = () => {
    onOpen && onOpen()
}

const onCloseHandler = () => {
    setVisible(false)
    onClose && onClose()
}

</script>

<template>
    <el-drawer
        class="base-drawer"
        v-model="model"
        @opened="onOpenHandler"
        @closed="onCloseHandler"
        v-bind="$attrs" 
        :lock-scroll="true"
    >
        <slot></slot>

        <template #footer>
            <div class="g-flex-rec footer" v-if="iState.giButtons.length">
                <template v-for="btn in iState.giButtons">
                    <icon-button v-bind="btn"></icon-button>
                </template>
            </div>
        </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.base-drawer{
}
</style>