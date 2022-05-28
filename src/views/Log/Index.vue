<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 日志列表
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
import { reactive } from 'vue'
import { nanoid } from 'nanoid'

defineOptions({name: 'LogList'})

//==============================================================================
//== 类型定义
const giColums = [
    {prop: 'content', type: 'expand'},
    {prop: 'content', label: '内容'},
    {prop: 'createTime', label: '创建时间'},
]

const iState = reactive({
    gridDataSource: {
        total: 60,
        data: [
            {id: 1, content: nanoid().substring(0, 6), createTime: '2022-05-22 12:22'},
            {id: 1, content: nanoid().substring(0, 6), createTime: '2022-05-22 12:22'},
            {id: 1, content: nanoid().substring(0, 6), createTime: '2022-05-22 12:22'},
            {id: 1, content: nanoid().substring(0, 6), createTime: '2022-05-22 12:22'},
            {id: 1, content: nanoid().substring(0, 6), createTime: '2022-05-22 12:22'},
            {id: 1, content: nanoid().substring(0, 6), createTime: '2022-05-22 12:22'},
            {id: 1, content: nanoid().substring(0, 6), createTime: '2022-05-22 12:22'},
            {id: 1, content: nanoid().substring(0, 6), createTime: '2022-05-22 12:22'},
            {id: 1, content: nanoid().substring(0, 6), createTime: '2022-05-22 12:22'},
        ],
    }
})

//==============================================================================
//== 初始化


//==============================================================================
//== 事件处理
</script>

<template>
    <div class="log-list">
        <div class="list">
            <base-grid 
                :enableSelect="false"
                :columns="giColums"
                :dataSource="iState.gridDataSource"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.log-list{
}
</style>