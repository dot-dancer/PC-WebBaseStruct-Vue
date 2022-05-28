<script setup lang="ts">
/*! @file
********************************************************************************
<PRE>
文件实现功能   : 用户管理
作者           : dotdancer
版本           : 1.0
--------------------------------------------------------------------------------
备注           : -
--------------------------------------------------------------------------------
修改记录 :
日  期       版本    修改人     修改内容
2022/05/19   1.0     dotdancer  创建
</PRE>
*******************************************************************************/
import UserList from './UserList.vue'
import InviteCode from './InviteCode.vue'

defineOptions({name: 'UserManage'})


//==============================================================================
//== 类型定义


//==============================================================================
//== 初始化


//==============================================================================
//== 事件处理

</script>

<template>
    <div class="user-manage">
        <el-tabs>
            <el-tab-pane label="用户" class="user-list">
                <user-list></user-list>
            </el-tab-pane>
            <el-tab-pane label="邀请码">
                <invite-code></invite-code>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style lang="scss" scoped>
.user-manage{
    position: relative;
    padding: 10px 20px;
}
</style>