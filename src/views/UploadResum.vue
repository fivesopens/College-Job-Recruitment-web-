<template>
    <div class="upload_box">
        <el-row>
            <el-col :span="24"  >
                <NavBar :name='state.userName' />
            </el-col>
            <div class="upload_body">
                <div class="body_header">
                    <h2>个人简历</h2>
                </div>
                <el-divider border-style="dashed" />
                <div class="body_form">
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
                            <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                            <el-button   @click="resetForm(ruleFormRef)">清空</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script setup>
import NavBar from "../components/navBar/NavBar.vue"
import {addResumeInfo} from '../network/stuHandle/resume'
import { useRoute } from "vue-router";
import { onBeforeMount, reactive,ref, toRefs } from "@vue/runtime-core";
import { CodeToText,provinceAndCityData } from "element-china-area-data"
import {cHangeDate} from '../utils/changDate'
const route = useRoute()
const state = reactive({
    userName:'',
    options: provinceAndCityData,//选择格式
    provinces: [],
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
    }
})

const {resumFrom}  = toRefs(state)

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

const onChange = (e) => {

    let address = CodeToText[e[0]] +'-' +  CodeToText[e[1]] 
    state.resumFrom.place  = address
    
}

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
        if (valid) {
            
           
            state.resumFrom.id = state.userName + state.resumFrom.name
            state.resumFrom.date1 = cHangeDate(state.resumFrom.date1)
            state.resumFrom.date2 = cHangeDate(state.resumFrom.date2)

            addResumeInfo(state.resumFrom).then(res=>{
               if(res.code ==200){
                    ElMessage({
                            message: res.data,
                            type: 'success',
                     })        

                     state.resumFrom = ''

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

onBeforeMount(()=>{
    state.userName = route.query.userName
})
</script>

<style lang="scss" scoped>
.upload_box{
    width: 100%;
    height: 100%;
    background: url('../assets/images/主页3背景.png');
    background-size: 100% 100%;
    background-attachment: fixed;
    .upload_body{
        width: 75%;
        height: auto;
        margin:50px auto;
    }
}

</style>