<template>
<div>
    Blog Index
    <router-link :to="{name: 'articleList'}">{{lpk('blog.article.Title')}}</router-link><br/>
    <cust-router-view></cust-router-view>
</div>
</template>

<script setup lang="ts">
import { onActivated } from 'vue';

onActivated(() => {
    console.log('actived')
})
</script>

<style lang="scss" scoped>

</style>