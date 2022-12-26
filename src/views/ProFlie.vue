<template>
    <div class="pro_box">
        <el-col :span="24" >
            <NavBar :name="state.userName" />
        </el-col>


        <div class="pro_body">
            <div class="body_header">
                <el-image style="width: 100px; height: 100px" :src="state.avatar" />
              
                <div class="context">
                   <h3> <span v-if="showInput" >{{state.userName}}</span>
                    <el-input v-else v-model="state.newName" placeholder="请输入用户名" style="width: 50%;"  @change="updateName"/>
                    </h3>
                   
                        <el-button link type="success" @click="editInfo">编辑简历</el-button>  <el-divider direction="vertical" />
                        <el-button link type="success" @click="editPro">编辑个人信息</el-button> <el-divider direction="vertical" />  
                        <el-button link type="success" @click="showInput = !showInput">点击修改用户名</el-button>
                 
                  
                </div>  
               
                <div class="Not_Message">

                    <div class="Message">
                        <div class="Message_num">320</div>
                        <div class="Message_info">看过</div>
                    </div>
                    <div class="Message">
                        <div class="Message_num">0</div>
                        <div class="Message_info">面试</div>
                    </div>
                    <div class="Message">
                        <div class="Message_num">0</div>
                        <div class="Message_info">拒绝</div>
                    </div>
                </div>
                
            </div>
          
        </div>

        <div class="edit_info" v-show="state.showEditInfo">
                    <el-form :model="resumFrom" 
                        label-width="120px"
                        ref="ruleFormRef"
                        :rules="rules"
                        status-icon
                        >
                        <el-form-item label="姓名" prop="name">
                           <el-input v-model="resumFrom.name" placeholder="请输入姓名" />
                        </el-form-item>
                        <el-form-item label="性别" prop="gender">
                            <el-radio-group v-model="resumFrom.gender">
                                <el-radio label="男" />
                                <el-radio label="女" />
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="籍贯" prop="place">
                            <el-cascader size="large" :options="state.options" v-model="state.provinces" @change="onChange" placeholder="请选择户籍地"></el-cascader>
                        </el-form-item>
                        <el-form-item label="毕业院校" prop="graduation">
                           <el-input v-model="resumFrom.graduation" placeholder="请输入毕业院校"  />
                        </el-form-item>
                        <el-form-item label="学历" prop="education">
                            <el-select v-model="resumFrom.education" placeholder="请选择学历">
                                <el-option label="高中" value="高中" />
                                <el-option label="中专" value="中专" />
                                <el-option label="大专" value="大专" />
                                <el-option label="本科" value="本科" />
                                <el-option label="研究生" value="研究生" />
                                <el-option label="博士" value="博士" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="毕业时间" prop="date1">
                            <el-col :span="4">
                                <el-date-picker
                                v-model="resumFrom.date1"
                                type="date"
                                placeholder="入学时间"
                                style="width: 100%"
                                />
                            </el-col>
                            <el-col :span="1" class="text-center">
                                <span class="text-gray-500">-</span>
                            </el-col>
                            <el-col :span="4">
                                <el-date-picker
                                v-model="resumFrom.date2"
                                type="date"
                                placeholder="毕业时间"
                                style="width: 100%"
                                />
                            </el-col>
                        </el-form-item>
                        <el-form-item label="意向职位" prop="position">
                           <el-input v-model="resumFrom.position"  placeholder="请输入意向职位"  />
                        </el-form-item>
                        <el-form-item label="实习经历" prop="experience">
                             <el-input v-model="resumFrom.experience" type="textarea" placeholder="请输入实习经历"  />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm(ruleFormRef)">修改</el-button>
                            <el-button   @click="resetForm(ruleFormRef)">清空</el-button>
                        </el-form-item>
                    </el-form>
            </div>
       
        <div class="edit_info" v-show="state.showEditPro">
            <el-form :model="InfoForm"
                     ref="ruleFormInfoRef"
                     :rules="Inforules"
                     status-icon
                    label-width="120px"
                >
                <el-form-item label="上传头像">
                    <el-upload
                        class="avatar-uploader"
                        action="http://127.0.0.1:5000/api/upavatar"
                        :data="[state.userName]"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"                       
                    >
                        <img v-if="state.imageUrl" :src="state.imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
                
                <el-form-item label="密码" prop="password">
                     <el-input v-model="InfoForm.password" type="password" show-password placeholder="请输入要修改的密码" />
                </el-form-item>

                <el-form-item label="确认密码" prop="checkpwd">
                     <el-input v-model="InfoForm.checkpwd" type="password" show-password placeholder="请确认密码" />
                </el-form-item> 

                <el-form-item>
                    <el-button type="primary" @click="submitInfoForm(ruleFormInfoRef)">修改</el-button>
                    <el-button   @click="resetForm(ruleFormInfoRef)">清空</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script setup>
import NavBar from "../components/navBar/NavBar.vue"
import { useRoute, useRouter } from "vue-router";
import {showResumeInfo,updateResumeInfo} from '../network/stuHandle/resume'
import {showBaseInfo,updateBaseInfo} from '../network/stuHandle/baseInfo'
import { onBeforeMount, onMounted, reactive, ref, toRefs } from "@vue/runtime-core";
import { CodeToText,provinceAndCityData } from "element-china-area-data"
import {cHangeDate} from '../utils/changDate'
const route = useRoute()
const router =  useRouter()
const state = reactive({
    userName:'',
    showEditInfo:false,
    showEditPro:true,
    options: provinceAndCityData,//选择格式
    provinces: [],
    imageUrl:'',
    avatar:'',
    showInput:true,
    newName:"",
    resumFrom:{
        id:'',
        name: '',
        gender: '',
        place: '',
        graduation: '',
        education: '',
        date1:'',
        date2:'',
        position: '',
        experience:''
    },
    InfoForm:{
        name: '',
        password: '',
        checkpwd:'',
    }
})


const {resumFrom,InfoForm,showInput} = toRefs(state)


const editInfo=()=>{
    state.showEditPro=false
    state.showEditInfo = !state.showEditInfo

    showResumeInfo(state.userName).then(res=>{
        if(res.code ==200){

           state.resumFrom.id = res.data[0].resume_id
           state.resumFrom.name = res.data[0].name
           state.resumFrom.gender = res.data[0].gender
           state.resumFrom.place = res.data[0].place
           state.resumFrom.graduation = res.data[0].grad_col
           state.resumFrom.education = res.data[0].edu
           state.resumFrom.date1 = res.data[0].star_date
           state.resumFrom.date2 = res.data[0].stop_date
           state.resumFrom.position = res.data[0].postion
           state.resumFrom.experience = res.data[0].exp

        }else{

            ElMessage.error(res.data)

        }
    })
   
}

const editPro=()=>{
    state.showEditInfo=false
    state.showEditPro = !state.showEditPro


    

}


const ruleFormRef = ref()
const rules = reactive({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
    place: [{ required: true, message: '请选择户籍', trigger: 'change' }],
    graduation: [{ required: true, message: '请输入毕业院校', trigger: 'blur' }],
    education: [{ required: true, message: '请选择学历', trigger: 'change' }],
    date1: [{ required: true, message: '请选择入学时间', trigger: 'change' }],
    nadate2me: [{ required: true, message: '请选择毕业时间', trigger: 'change' }],
    position: [{ required: true, message: '请输入意向岗位', trigger: 'blur' }],
    experience: [{ required: true, message: '请填写实习经历', trigger: 'blur' }],
})


const validatePass2  = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请确认密码'))
    } else if (value !== state.InfoForm.password) {
        callback(new Error("两次密码输入不一样"))
    } else {
        callback()
    }
}


const ruleFormInfoRef = ref()
const Inforules = reactive({
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入要修改的密码', trigger: 'blur' }],
    checkpwd: [{ validator: validatePass2, trigger: 'blur' }]
})


const uploadRef = ref()


const handleAvatarSuccess = (response,uploadFile) => {
    state.imageUrl = URL.createObjectURL(uploadFile.raw)

    if(response.code==200){
        ElMessage({
            message: response.data,
            type: 'success',
        })

        setTimeout(()=>{
            router.go(0)
        },1500)

    }else{
        ElMessage.error('头像修改失败')
    }
}

const beforeAvatarUpload= (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
   
    ElMessage.error('只能上传jpg格式的图像')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图片大小不能超过2MB!')
    return false
  }
  return true
}




const onChange = (e) => {

    let address = CodeToText[e[0]] +'-' +  CodeToText[e[1]] 
    state.resumFrom.place  = address
    
}

const updateName =()=>{
    
    let name = {
        newStuName:state.newName,
        oldStuName:state.userName
    }

    updateBaseInfo(name).then(res=>{
        if(res.code ==200){
            ElMessage({
                message: res.data,
                type: 'success',
            })
            setTimeout(()=>{
                router.push({'path':'/login'})
            },1500)

          
        }else{

            ElMessage.error(res.data)

        }

        
    })

}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
        if (valid) {
            
           
            state.resumFrom.date1 = cHangeDate(state.resumFrom.date1)
            state.resumFrom.date2 = cHangeDate(state.resumFrom.date2)


            updateResumeInfo(state.resumFrom).then(res=>{
                if(res.code==200){
                    ElMessage({
                        message: res.data,
                        type: 'success',
                    })
                    
                    setTimeout(()=>{
                        router.go(0)
                    },1500)
            
                }else{

                    ElMessage.error(res.data)

                }
            })

        } else {
            console.log('error submit!', fields)
        }
    })
}


const submitInfoForm = async (formEl)=>{
    if(!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
        
            state.InfoForm.name = state.userName
            updateBaseInfo(state.InfoForm).then(res=>{
              
                if(res.code ==200){
                    ElMessage({
                        message: res.data,
                        type: 'success',
                    })

                    setTimeout(()=>{
                        router.go(0)
                    },1500)
                }else{
                    ElMessage.error(res.data)
                }

               
            })

        } else {
            console.log('error submit!', fields)
        }
    })
}


const resetForm = (formEl) => {
     if (!formEl) return
     formEl.resetFields()
}

const init = ()=>{
    showBaseInfo(state.userName).then(res=>{
        if(res.code ==200){
            
            if(res.data[0].avatar){
                state.avatar = 'data:image/jpeg;base64,'+res.data[0].avatar
                state.imageUrl ='data:image/jpeg;base64,'+res.data[0].avatar
            }else{
                state.avatar =''
            }
          
        }else{
            ElMessage.error(res.data)
        }
    })
}



onMounted(()=>{
    init()
})

onBeforeMount(()=>{
    state.userName = route.query.userName
})
</script>

<style lang="scss" scoped>
.pro_box{
    width: 100%;
    height: 100%;
    background: url('../assets/images/个人中心背景1.png');
    background-size: 100% 100%;
    background-attachment: fixed;
    .pro_body{
        
        width: 75%;
        margin: 50px auto;
       
        .body_header{
            display: flex;
            position: relative;
            border-radius: 20px;
            background-color:rgb(233,246,248);
            align-items: center;
            .el-button{

            }
            .el-image{
                border-radius: 50%;
                margin: 20px;
            }
            .context{
                text-align: left;
            }
            .Not_Message{
                display: flex;
                width: 20%;
                justify-content: space-around;
                position: absolute;
                left: 40%;
                top: 50%;
                .Message{
                    
                    .Message_num{
                        font-size: 18px;
                    }
                   .Message_info{
                      font-size: 20px;
                      font-weight: bold;
                   }
                }
                
            }
        }

      
    }
    .edit_info{
        width: 75%;
        margin: -35px auto;
        border-radius: 20px;
        padding: 10px 20px 0px 0px;
        background-color:rgb(233,246,248);
    }
}

.avatar-uploader {
    border: 1px dashed #333;
    border-radius: 50%;
    img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
}
.avatar-uploader .el-upload {
 
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>