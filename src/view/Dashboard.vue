<template>
    <div class="dashboard">
        <div class="left">left--{{lpk('OK')}}</div>
        <div class="center">test</div>
    </div>
    <User/>
</template>

<script setup lang="ts">
import User from '@/view/User/Index.vue'
</script>
<style lang="scss" scoped>
.dashboard{
    .left{ 
        width: 30%;
        height: 150px;
        background: #F00;
    }  

    .center{
        transition: all .3s;
        transform: rotate(-180deg);
    }
}
</style>