<template>
    <div class="theme">
        <div>
            <ul class="g-flex-rsc change-theme-ul">
                <li class="blue-theme" @click="() => {onChangeTheme('blue')}">蓝色主题</li>
                <li class="black-theme" @click="() => {onChangeTheme('black')}">黑色主题</li>
            </ul>
        </div>
        <div class="title">标题</div>
    </div>
</template>

<script setup lang="ts">

const onChangeTheme = (stTheme: string) => {
    app.getAppCtl().changeTheme(stTheme)
}

</script>

<style lang="scss" scoped>
.theme{
    .change-theme-ul{
        li{
            margin: 10px;
            cursor: pointer;

            &.blue-theme{
                @include color('active-color');
            }

            &.black-theme{
                @include color();
            }
        }
    }
}
</style>