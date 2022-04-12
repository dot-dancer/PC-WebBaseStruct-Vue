<template>
    <div>
        <input />
        Article List
        <div @click="onAddBlogCount">修改blog.store中的状态 -> {{blogCount}}</div>
        <ul>
            <li><router-link to="/blog/article/list/tab1">tab1</router-link></li>
            <li><router-link :to="{name: 'article_list_tab2'}">tab2-update</router-link></li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { get } from 'lodash'
import sysCfg from '../../config/syscfg'

const store = useStore()

const onAddBlogCount = () => {
    store.dispatch(`${sysCfg.module}/asyncAddBlogCount`, {count: 100})
}

// const blogCount = computed(() => store.state[sysCfg.module].blogCount)
const blogCount = computed(() => get(store, `state.${sysCfg.module}.blogCount`))

const user = reactive({
    name: 'zs'
})

onMounted(() => {
    console.log('Article List onMounted')
})

setTimeout(() => {
    user.name = 'update-zs'
}, 5000)
</script>

<style lang="scss" scoped>

</style>