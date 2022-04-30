<template>
    <div class="g-flex-ccc login-integration">
        <div class="scatter-letters" ref="refScatterLetters"></div>
        <div class="card-item card-login">
            <Login :generateLetters="generateLetters" 
                   :onAnimeComplete="onAnimeComplete"
                   :goRegist="goRegist"
            />
        </div>

        <div class="card-item card-regist">
            <Regist :onBack="onBack"
                    :goLogin="goLogin"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'
import anime from 'animejs'
import Login from './Login.vue'
import Regist from './Regist.vue'

//! 标签页类型
const CardTypeSelector: Record<string, string> = {
    'login': '.card-login', // 登录
    'regist': '.card-regist', // 注册
    'forgot_passwd': '.card-forgot-passwd', // 忘记密码
}
let stCurCardItemSelector = CardTypeSelector.login

const refScatterLetters = ref<HTMLElement | null>(null) // 全局打散的字符动画dom节点

//! 生成字符
const generateLetters = (refDom: Ref<HTMLElement | null>, stLetters: string) => {
    const domLetters = refDom.value as HTMLElement
    let stLettersHTML = ''
    for (let i=0; i<stLetters.length; ++i){
        stLettersHTML += `<span style="display: inline-block; opacity: 0">${stLetters.charAt(i)}</span>`
    }
    domLetters.innerHTML = stLettersHTML;
}

//! 打散全局字符动画实现(待登录动画完成后, 再执行)
const onAnimeComplete = () => {
    anime.timeline({
        targets: '.scatter-letters span',
        easing: 'easeInOutExpo',
        complete(){
            anime.timeline({
                targets: '.scatter-letters span',
                easing: 'easeInOutExpo',
                loop: 2,
                complete(){
                    anime.timeline({
                        targets: '.scatter-letters span',
                        easing: 'easeInOutExpo',
                    }).add({
                        opacity: 0,
                        translateX: 0,
                        translateY: 0,
                        duration: 2000
                    })
                }
            }).add({
                scale: () => anime.random(0, 0.8),
            }).add({
                scale: 1,
            })
        }
    }).add({
        opacity: 1,
        translateX: () => anime.random(-window.screen.availWidth, window.screen.availWidth), // 采用函数方式可以让字符随机打散
        translateY: () => anime.random(0, window.screen.availHeight),
        rotate: () => anime.random(-360, 360),
        delay: anime.stagger(20),
    })
}

//! 激活指定模块
const activeCardItem = (stNextCardItemSelector: string) => {

    // 隐藏当前激活状态的标签页
    anime({
        targets: stCurCardItemSelector,
        duration: 3000,
        easing: 'easeInOutExpo',
        height: 0,
        opacity: 0,
        rotate: [0, '-90deg'],
        translateX: ['-50%', '-1000%'],
        translateY: ['-50%', '100%'],
    });

    anime({
        targets: stNextCardItemSelector,
        duration: 1500,
        easing: 'easeInOutExpo',
        height: '100%',
        opacity: 1,
        rotate: ['90deg', 0],
        translateX: ['-100%', '-50%'],
        translateY: ['100%', '-50%'],
    });

    stCurCardItemSelector = stNextCardItemSelector
}

//! 从别的标签页退回到登录主页
const onBack = () => activeCardItem(CardTypeSelector.login)

//! 激活到登录界面
const goLogin = onBack

//! 激活注册界面
const goRegist = () => activeCardItem(CardTypeSelector.regist)

// =============================================================================
// = 挂载dom节点后回调
onMounted(() => {
    // -------------------------------------------------------------------------
    // - 定义全局打散字符
    let stScatterLetters = 'OpenSource-10-Years-abcdefghigklmnopqrstuvwxyz'
    for (let i=0; i<2; ++i){
        stScatterLetters += stScatterLetters
    }
    generateLetters(refScatterLetters, stScatterLetters)
})

</script>

<style lang="scss" scoped>

.login-integration{
    position: relative;
    width: 100%;
    height: calc(100vh);
    overflow: hidden;
    background-image: linear-gradient(to bottom right, 
                                        var(--login-light-bg) 0%, 
                                        var(--login-middle-bg) 50%, 
                                        var(--login-deep-bg) 100%);
    .scatter-letters{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: calc(100vh);
        color: var(--light-color);
        overflow: hidden;
    }  
    
    .card-item{
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-1000%, 1000%, 0);
        opacity: 0;
        z-index: 2;

        &.card-login{
            opacity: 1;
            transform: translate3d(-50%, -50%, 0);
        }
    }
}
</style>