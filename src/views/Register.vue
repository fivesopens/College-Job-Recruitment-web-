<template>
    <div class="box_reg">
        <div class="left">
            <h1>注册</h1>
            
            <div class="body">
                <el-form
                    ref="ruleFormReg"
                    :rules="rules"
                    label-position="right"
                    label-width="100px"
                    :model="formLabelReg"
                    style="max-width: 460px"
                    status-icon
                >
                    <el-form-item label="用户名：" prop="userId">
                        <el-input v-model="formLabelReg.userId"  clearable />
                    </el-form-item>
                    <el-form-item label="密码：" prop="password">
                        <el-input v-model="formLabelReg.password"   type="password" show-password  />
                    </el-form-item>
                    <el-form-item label="公司名称：" prop="companyName" v-if="formLabelReg.identity=='HR'">
                        <el-input v-model="formLabelReg.companyName"  clearable  />
                    </el-form-item>
                    <el-form-item label="身份：">
                        <el-radio-group v-model="formLabelReg.identity">
                            <el-radio label="学生" />
                            <el-radio label="HR" />
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormReg)">注册</el-button>
                        <span @click="gotoLogin">已有账号？去登陆</span>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import {useRouter,useRoute} from 'vue-router'
import { reactive, ref } from '@vue/reactivity'
import {register,registerHr} from '../network/user'


const router = useRouter()
const formLabelReg = reactive({
  userId: '',
  password: '',
  identity: '学生',
  companyName:'',
})
const ruleFormReg = ref(null)
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
  companyName: [{ required: true, message: '请输入公司名称', trigger: 'blur' },],
})

const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
    if (valid) {

        if(formLabelReg.identity=='学生'){
            register(formLabelReg).then(res=>{
           
          
                if(res.code==200){
                    
                    ElMessage({
                        message: res.data,
                        type: 'success',
                    })

                    setTimeout(()=>{
                        router.push({path:'/login'})
                    },1500)

                }else{
                    ElMessage.error(res.data)
                }
           
            })
        }else{  
            registerHr(formLabelReg).then(res=>{
                localStorage.setItem('regCompany',formLabelReg.companyName)
                if(res.code==200){
                    
                    ElMessage({
                        message: res.data,
                        type: 'success',
                    })

                    setTimeout(()=>{
                        router.push({path:'/login'})
                    },1500)

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

const gotoLogin =()=>{
    router.push({path:'/login'})
}
</script>

<style lang="scss" scoped>
.box_reg{
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../assets/images/背景1.png');
    background-size: 100% 100%;
    background-attachment: fixed;
    .left{
        position: absolute;
        width: 500px;
        height: 400px;
        left: 6%;
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
               width: 100%;
               text-align: center;
            }
            span{
                margin-top: 10px;
                cursor: pointer;
            }
        }
    }
}
</style>