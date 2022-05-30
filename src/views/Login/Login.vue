<template>
    <div class="g-flex-ccc login">
        <div class="g-flex-ccc form">
            <div class="logo">
                <div class="icon-wrap"><icon-font icon="icon-gift"/></div>
                <div class="letters" ref="refLetters"></div>
            </div>
            <div class="title">{{lpk('page.login.Title')}}</div>
            
            <el-form
                :model="formData"
                :rules="formRules"
            >
                <el-form-item class="g-flex-rsc radius-icon-txt fixed-width-260 name" prop="name">
                    <el-input v-model="formData.name" :placeholder="lpk('page.login.Account')" clearable>
                        <template #prefix>
                            <icon-font icon="icon-user-circle"/>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item class="g-flex-rsc radius-icon-txt fixed-width-260 passwd" prop="passwd">
                    <el-input class="g-flex-rsc" :type="refPasswdType" v-model="formData.passwd" :placeholder="lpk('Password')" clearable>
                        <template #prefix>
                            <icon-font icon="icon-lock"/>
                        </template>
                        <template #suffix>
                            <icon-font @click="onEyeClickHandler" cls="eye" :icon="refPasswdType == iPasswordType.PASS ? 'icon-eye-hide' : 'icon-eye-show'"/>
                        </template>
                    </el-input>
                </el-form-item>
                
                <div class="radius-btn">{{ lpk('page.login.Login') }}</div>
            </el-form>
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

<script setup lang="ts">
import { ref, reactive, Ref, onMounted } from 'vue'
import anime from 'animejs'
import { MOBILE_PATTERN, EMAIL_PATTERN } from '@/utils/Constants'

defineOptions({name: 'login'})

// =============================================================================
// = 定义本页中将要使用到的父组合传递过来的属性
const props = defineProps<{
    generateLetters: (refDom: Ref<HTMLElement | null>, str: string) => void;
    onAnimeComplete: () => void;
    goRegist: () => void;
}>()
const { generateLetters, onAnimeComplete } = props

// =============================================================================
// = 定义当前页面中要使用到的变量
const iPasswordType = { // 密码类型
    PASS: 'password',
    TXT: 'text',
}

const refLetters = ref<HTMLElement | null>(null) // 单词动画dom节点
const refPasswdType = ref<string>(iPasswordType.PASS) // 密码文本框的类型
const formData = reactive({ // 表单数据
    name: '',
    passwd: '',
})

const formRules = { // 表单验证规则
    name: [
        { required: true, message: lpk('page.login.Account.Empty') },
        { validator: (rule: any, value: any, callback: any) => {
            if (!MOBILE_PATTERN.test(value) && !EMAIL_PATTERN.test(value)){
                return false
            }

            return true
        }, message: lpk('page.login.Account.Invalid') }
    ],
    passwd: { required: true, message: lpk('page.login.Password.Empty') },
}

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
        margin-bottom: 20px;
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
    }

    .tools{
        color: var(--light-color);
        width: 100%;
        margin-top: 20px;
        .left, .right{
            padding: 0px 6px;
        }

        a{
            color: var(--text-reverse-color);
        }
    }
}
</style>