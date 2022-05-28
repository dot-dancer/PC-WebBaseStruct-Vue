<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 用户列表
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
import { useBaseDrawer } from '@/components/BaseDrawer'
defineOptions({name: 'UserList'})

//==============================================================================
//== 类型定义


//==============================================================================
//== 初始化
const [refShowAddUserDrawer, setAdUserDrawerVisible] = useBaseDrawer()

//==============================================================================
//== 事件处理
const onAddUser = () => {
    (setAdUserDrawerVisible as any)(true)
}

const onAddUserSubmit = () => {

}

</script>

<template>
    <div class="user-list">
        <div class="g-flex-rsbc top-tools">
            <div class="btns">
                <icon-button @click="onAddUser" iconType="add">创建</icon-button>
            </div>
            <simple-search></simple-search>
        </div>
        <ul class="g-flex-rsbc">
            <li v-for="index in 23">
                <user-item></user-item>
            </li>
            <li v-for="index in 4"></li>
        </ul>
        <el-pagination class="g-flex-rec" background layout="prev, pager, next" :total="100" />

        <base-drawer
            title="添加用户"
            :model="refShowAddUserDrawer"
            :setVisible="setAdUserDrawerVisible"
            :onSubmit="onAddUserSubmit"
        >
            abcd
        </base-drawer>
    </div>
</template>

<style lang="scss" scoped>
.user-list{
    position: relative;
    margin-top: $g-tbar-cnt-space;
    
    ul{
        flex-wrap: wrap;

        li{
            width: 20%;
            margin: 0 10px;
        }
    }
}
</style>