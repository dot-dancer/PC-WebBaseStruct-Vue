<template>
    <div class="g-flex-rsbc dashboard">
        <div class="left">
            <keep-alive>
                <input type="text"/>
            </keep-alive>
            <div><router-link to="/blog">Blog</router-link></div>
            <div>left--{{lpk('OK')}}</div>
            <div @click="onStoreAdd">点击增加: {{count}}</div>
        </div>
        <div class="center">
            <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex';
import User from '@/view/User/Index.vue'
const store = useStore()
console.log(store)
const onStoreAdd = () => {
    store.commit('add')
}

const count = computed(() => store.state.base.count)

</script>
<style lang="scss" scoped>
.dashboard{
    .left{ 
        width: 30%;
        height: 150px;
        background: #F00;
    }  

    .center{
        flex: 1;
    }
}
</style>