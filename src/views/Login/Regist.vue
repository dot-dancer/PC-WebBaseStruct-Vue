<template>
    <div class="g-flex-ccc regist">
        <div class="g-flex-ccc form">
            <div class="title">{{lpk('page.regist.Title')}}</div>
            
            <ul>
                <li>
                    <div class="g-flex-rsc txt txt-icon name">
                        <icon-font icon="icon-user-circle"/>
                        <input type="text" :placeholder="lpk('Account')"/>
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
            <div class="btn submit">{{ lpk('page.regist.Regist') }}</div>
            <div class="tools">
                <span class="exist-account">{{lpk('page.regist.ExistAccount')}}</span>
                <a href="javascript:void(0)" @click="goLogin">{{lpk('page.login.Login')}}</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue'

interface PropType{
    onBack: () => void;
    goLogin: () => void;
}

defineOptions({name: 'regist'})

const props = defineProps<PropType>()

const iPasswordType = { // 密码类型
    PASS: 'password',
    TXT: 'text'
}

const refPasswdType = ref<string>(iPasswordType.PASS) // 密码文本框的类型

// =============================================================================
// = 渲染完成回调处理
onMounted(() => {
})

//! 定义密码可见性处理
const onEyeClickHandler = () => {
    if (iPasswordType.PASS == refPasswdType.value){
        refPasswdType.value = iPasswordType.TXT
        return
    }

    refPasswdType.value = iPasswordType.PASS
}

</script>

<style lang="scss" scoped>
$height: 40px;
.regist{
    position: relative;
    height: calc(100vh);
    overflow: hidden;

    .title{
        font-size: 20px;
    }

    .form{
        border-radius: var(--radius5px);
        width: 260px; 
        height: 500px;
        margin: 10px 20px;
        margin-top: 20px;
        background: url("@/assets/imgs/regist.jpg") no-repeat;
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
        text-align: center;
        
        .exist-account{
            padding-right: 10px;
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
        color: var(--text-reverse-color);
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