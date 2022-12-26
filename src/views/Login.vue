<template>
    <div class="box" ref="Area">
        <div class="box_right">

            <h1>登录</h1>
            
            <div class="body">
                <el-form
                    ref="ruleFormRef"
                    :rules="rules"
                    label-position="right"
                    label-width="100px"
                    :model="formLabelAlign"
                    style="max-width: 460px"
                    status-icon
                >
                    <el-form-item label="账号：" prop="userId">
                        <el-input v-model="formLabelAlign.userId"  clearable />
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input v-model="formLabelAlign.password"   type="password" show-password  />
                    </el-form-item>
                    <el-form-item label="身份：">
                        <el-radio-group v-model="formLabelAlign.identity">
                            <el-radio label="学生" />
                            <el-radio label="管理员" />
                            <el-radio label="HR" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
                        <el-button @click="resetForm()">注册</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
    </div>
</template>

<script setup>
import * as THREE from 'three'
import Clouds from 'vanta/src/vanta.clouds'
import { reactive, ref } from '@vue/reactivity'
import {login,hrLogin} from '../network/user'
import {useRouter,useRoute} from 'vue-router'
import { onMounted } from '@vue/runtime-core'

const router = useRouter()
const Area=ref(null)
let vantaEffect=null;



const formLabelAlign = reactive({
  userId: '',
  password: '',
  identity: '学生',
})


const ruleFormRef = ref(null)
const rules = reactive({
    userId: [{ required: true, message: '请输入账号', trigger: 'blur' },],
    password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
    { min: 5, max: 8, message: '密码长度应该在5-8位', trigger: 'blur' },
  ],
 
})

const submitForm = async (formEl) => {

  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        
        if(formLabelAlign.identity=='HR'){
         
                hrLogin(formLabelAlign).then(res=>{
                    if(res.code==200){
                        ElMessage({
                            message: res.data,
                            type: 'success',
                        })

                            setTimeout(()=>{
                                router.push({path:'/hrindex',query:{hrName:formLabelAlign.userId}})
                            },1500)

                    }else{
                        ElMessage.error(res.data)
                    }
                })
            
        }else{
            login(formLabelAlign).then(res=>{
                if(res.code==200){
                    ElMessage({
                        message: res.data,
                        type: 'success',
                    })

                    if(formLabelAlign.identity=='学生'){
                    
                        setTimeout(()=>{
                            router.push({path:'/homepage',query:{userName:formLabelAlign.userId}})
                        },1500)

                    }else{
                    
                        setTimeout(()=>{
                            router.push({path:'/admindex',query:{adminName:formLabelAlign.userId}})
                        },1500)
                    }

                }else{
                    ElMessage.error(res.data)
                }
            })
        }
                   

       

    } else {
      console.log(fields)
    }
  })
}

const resetForm = () => {
    router.push({path:'/register'})
}


// onMounted(()=>{
//     vantaEffect=Clouds({
//         el:Area.value,
//         THREE:THREE,
//         //如果需要改变样式，要写在这里
//         //因为这里vantaEffect是没有setOptions这个方法的
//         color: 0x16212a,
//     })
// })

// onBeforeUnmount(()=>{
//     if(vantaEffect){
//         vantaEffect.destroy()
//     }
// })

// const handeler = ()=>{

//     test('福州').then(res=>{
//         console.log(res)
//     })
// }


// const  handelerPost = ()=>{
//     //  let data = qs.stringify({'counrty':'厦门'})
//     let data = {counrty:'厦门'}
//     test1(data).then(res=>{
//         console.log(res)
//     })
// }
</script>

<style lang="scss" scoped>
.box{
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../assets/images/背景.png');
    background-size: 100% 100%;
    background-attachment: fixed;
    .box_right{
        position: absolute;
        width: 500px;
        height: 400px;
        right: 6%;
        top: 20%;
        border-radius: 15px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        .body{
            width: 80%;
            height: 66%;
            margin: 0 auto;
            .el-form-item{
                margin-bottom: 30px;
            }
            .el-button{
               width: 48%;
               text-align: center;
            }
        }
    }    

}
</style>