<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 邀请码列表
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/22   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import { reactive } from 'vue'
import { nanoid } from 'nanoid'
import InviteCodeExpandItem from './InviteCodeExpandItem.vue'

defineOptions({name: 'InviteCode'})

//==============================================================================
//== 类型定义
const giColums = [
    // {prop: 'author', type: 'expand', component: InviteCodeExpandItem},
    {prop: 'code', label: '邀请码'},
    {prop: 'author', label: '创建人'},
    {prop: 'user', label: '被邀请人'},
    {prop: 'createTime', label: '创建时间'},
    {prop: 'useTime', label: '使用时间'},
]

const giOperMenus = [
   {
       iconType: 'edit',
       handler(){
           console.log('edit----')
       }
   },
   {
       iconType: 'remove',
       handler(){
           console.log('remove----')
       }
   },
   {
       iconType: 'edit',
       handler(){
           console.log('edit----')
       }
   }
]

const iState = reactive({
    gridDataSource: {
        total: 60,
        data: [
            {id: 1, code: nanoid().substring(0, 6), author: '果一梨', user: '凡峰', createTime: '2022-05-22 12:22', useTime: '2022-05-23 21:20'},
            {id: 1, code: nanoid().substring(0, 6), author: '果一梨', user: '凡峰', createTime: '2022-05-22 12:22', useTime: '2022-05-23 21:20'},
            {id: 1, code: nanoid().substring(0, 6), author: '果一梨', user: '凡峰', createTime: '2022-05-22 12:22', useTime: '2022-05-23 21:20'},
            {id: 1, code: nanoid().substring(0, 6), author: '果一梨', user: '凡峰', createTime: '2022-05-22 12:22', useTime: '2022-05-23 21:20'},
            {id: 1, code: nanoid().substring(0, 6), author: '果一梨', user: '凡峰', createTime: '2022-05-22 12:22', useTime: '2022-05-23 21:20'},
            {id: 1, code: nanoid().substring(0, 6), author: '果一梨', user: '凡峰', createTime: '2022-05-22 12:22', useTime: '2022-05-23 21:20'},
            {id: 1, code: nanoid().substring(0, 6), author: '果一梨', user: '凡峰', createTime: '2022-05-22 12:22', useTime: '2022-05-23 21:20'},
            {id: 1, code: nanoid().substring(0, 6), author: '果一梨', user: '凡峰', createTime: '2022-05-22 12:22', useTime: '2022-05-23 21:20'},
        ],
    }
})

//==============================================================================
//== 初始化


//==============================================================================
//== 事件处理
const onAddInviteCode = () => {
    console.log('--onAddInviteCode--')
}

</script>

<template>
    <div class="invite-code">
        <div class="list">
            <base-grid 
                :tbar="[
                    {
                        text: '创建',
                        iconType: 'add',
                        handler: onAddInviteCode
                    }
                ]"
                :enableBatchRemove="true"
                :columns="giColums"
                :operMenus="giOperMenus"
                :dataSource="iState.gridDataSource"
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.invite-code{
    .list{
        margin-top: $g-tbar-cnt-space;
    }
}
</style>