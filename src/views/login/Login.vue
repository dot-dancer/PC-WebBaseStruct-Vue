<template>
    <div class="g-flex-ccc login">
        <div class="g-flex-ccc form">
            <div class="logo">
                <div class="icon-wrap"><icon-font icon="icon-gift"/></div>
                <div class="letters" ref="refLetters"></div>
            </div>
            <div class="title">{{lpk('page.login.Title')}}</div>
            
            <ul>
                <li>
                    <div class="g-flex-rsc txt txt-icon name">
                        <icon-font icon="icon-yonghu-yuan"/>
                        <input type="text" :placeholder="lpk('page.login.Account')"/>
                    </div>
                </li>

                <li>
                    <div class="g-flex-rsc txt txt-icon txt-icon-right passwd">
                        <icon-font icon="icon-lock"/>
                        <input :type="refPasswdType" :placeholder="lpk('Password')"/>
                        <icon-font @click="onEyeClickHandler" cls="eye" :icon="refPasswdType == iPasswordType.PASS ? 'icon-eye-hide' : 'icon-eye-show'"/>
                    </div>
                </li>
            </ul>
            <div class="btn submit">{{ lpk('page.login.Login') }}</div>
            <div class="g-flex-rsbc tools">
                <div class="left">
                    <a href="javascript:void(0)">{{lpk('page.login.ForgotPasswd')}}</a>
                </div>
                <div class="right">
                    <a href="javascript:void(0)" @click="goRegist">{{lpk('page.login.Regist')}}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="login">
import { ref, Ref, onMounted } from 'vue'
import anime from 'animejs'

interface PropType {
    generateLetters: (refDom: Ref<HTMLElement | null>, str: string) => void;
    onAnimeComplete: () => void;
    goRegist: () => void;
}

const props = defineProps<PropType>()

/*
const props = withDefaults(defineProps<PropType>(), {
    generateLetters: () => {},
    onAnimeComplete: () => {}
})
*/

const { generateLetters, onAnimeComplete } = props

const iPasswordType = { // 密码类型
    PASS: 'password',
    TXT: 'text'
}

const refLetters = ref<HTMLElement | null>(null) // 单词动画dom节点
const refPasswdType = ref<string>(iPasswordType.PASS) // 密码文本框的类型

// =============================================================================
// = 渲染完成回调处理
onMounted(() => {
    startAnime()
})

//! 定义密码可见性处理
const onEyeClickHandler = () => {
    if (iPasswordType.PASS == refPasswdType.value){
        refPasswdType.value = iPasswordType.TXT
        return
    }

    refPasswdType.value = iPasswordType.PASS
}

//! 定义动画效果
const startAnime = () => {
    // -------------------------------------------------------------------------
    // - 定义logo下方动画字符
    generateLetters(refLetters, 'OpenSource-10-Years')

    // -------------------------------------------------------------------------
    // - 定义logo下方字符动画
    const nLogoDuration = 60
    anime.timeline({
        targets: '.letters span',
        easing: 'easeInOutExpo',
        loop: false,
    }).add({
        rotate: 180,
        translateX: 0,
        translateY: 1000,
        delay: 0,
        duration: 0,
    }).add({
        opacity: 1,
        rotate: 0,
        translateX: 0,
        translateY: 0,
        delay: anime.stagger(150),
        complete(){ // 开始logo动画
            anime.timeline({
                targets: '.logo .icon-wrap',
                easing_01: 'easeInOutExpo',
                loop: 5,
            }).add({
                rotate: '+=20',
                duration: nLogoDuration,
            }).add({
                rotate: 0,
                duration: nLogoDuration,
            }).add({
                rotate: '-=20',
                duration: nLogoDuration,
            }).add({
                rotate: 0,
                duration: nLogoDuration,
                complete(){ // 开始全局打散字符动画
                    onAnimeComplete()
                }
            })
        }
    })
}

</script>

<style lang="scss" scoped>
$height: 40px;
.login{
    position: relative;
    color: var(--light-color);
    height: calc(100vh);
    overflow: hidden;
    
    .logo{
        position: relative;
        width: 100%;
        text-align: center;
        margin-bottom: 30px;
        position: relative;

        .iconfont{
            font-size: 50px;
        }

        .letters{
            position: absolute;
            width: 100%;
            left: 0;
            bottom: -10px;
            text-align: center;
        }
    }

    .title{
        font-size: 20px;
    }

    .form{
        border-radius: var(--radius5px);
        width: 260px; 
        height: 500px;
        margin: 10px 20px;
        margin-top: 20px;
        background: url("@/assets/imgs/login.jpg") no-repeat;
        background-size: cover;
        z-index: 2;

        padding: 0 20px;
        @include shadow;

        ul{
            width: 100%;
            li{
                margin-top: 20px;

                .passwd{
                    flex: 1;
                    :deep(.eye){
                        transition: all .3s;
                        cursor: pointer;
                    }
                }
            }
        }
    }

    .tools{
        color: var(--light-color);
        width: 100%;
        margin-top: 20px;
        .left, .right{
            padding: 0px 6px;
        }
    }
}

.txt{
    height: $height;
    padding: 0px 4px;
    border-radius: 20px;
    background: rgba(0, 0, 0, .2);

    ::-webkit-input-placeholder{
        color: var(--login-placeholder-color);
    }

    input{
        width: 100%;
        height: 100%;
        border: none;
        background: none;
        color: var(--reverse-color);
    }

    &.txt-icon{
        padding-left: 10px;
        input{
            padding-left: 10px;
        }

        :deep(.iconfont){
            font-size: 20px;
            color: var(--light-color);
        }
    }

    &.txt-icon-right{
        padding-right: 10px;

        input{
            padding-right: 14px;
        }
    }
}

.btn{
    cursor: pointer;
    margin-top: 20px;
    width: 100%;
    border-radius: 20px;
    text-align: center;
    height: $height;
    line-height: $height;
    background-image: linear-gradient(to right, var(--login-btn-deep-bg) 0%, var(--login-btn-light-bg) 50%,  var(--login-btn-deep-bg) 100%);
    &:hover{
        background-image: linear-gradient(to right, var(--login-btn-light-bg) 0%, var(--login-btn-deep-bg) 50%, var(--login-btn-light-bg) 100%);
    }
}
</style>