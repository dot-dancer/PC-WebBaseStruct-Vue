<template>
    <router-view></router-view>
</template>

<script setup lang="ts">
</script>

<style lang="scss">
html, body{
    @include color();
    @include bg();
}

#idApp{
    min-height: 100vh;
    min-width: 100vw;
}
</style>