<template>
<div>
    <router-link :to="{name: 'articleList'}">{{lpk('blog.Article.Title')}}</router-link><br/>
    <cust-router-view :keepAlive="true"></cust-router-view>
</div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>

</style>