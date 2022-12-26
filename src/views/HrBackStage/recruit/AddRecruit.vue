<template>
    <div>
       <div class="showEmpty" v-if="isShowEmpty">
            <el-empty description="暂时还没有招聘信息，快去添加~">
                <el-button type="primary" @click="isShow">填写招聘信息</el-button>
            </el-empty>
       </div>

       <div class="add_box" v-if="isShowAdd">
            <el-card class="box-card">
                <h3>添加招聘信息</h3>
                <el-divider />
                <el-form :model="recruitForm" label-width="120px"  :rules="rules"  ref="ruleFormRef"  status-icon>
                    <el-form-item label="公司名称"  prop="companyName">
                        <el-input v-model="recruitForm.companyName" />
                    </el-form-item>
                    <el-form-item label="招聘职位"  prop="job">
                        <el-input v-model="recruitForm.job" />
                    </el-form-item>
                    <el-form-item label="招聘要求"  prop="jobReq">
                        <el-input
                            v-model="recruitForm.jobReq"
                            :rows="5"
                            type="textarea"
                            placeholder="请输入岗位要求"
                        />
                    </el-form-item>
                    <el-form-item label="招聘人数">
                        <el-input-number v-model.number="recruitForm.recruitNum" :min="1" :max="100" />
                    </el-form-item>
                    <el-form-item label="岗位薪资">
                        <el-input-number v-model.number="recruitForm.jobPrice" :min="1" :max="99999" />
                    </el-form-item>

                    <el-form-item label="开始时间" >
                        <el-col :span="6">
                            <el-date-picker
                            v-model="recruitForm.stratTime"
                            type="date"
                            placeholder="请选择开始时间"
                            style="width: 100%"
                            />
                        </el-col>
                        <el-col :span="1" class="text-center">
                            <span class="text-gray-500">-</span>
                        </el-col>
                        <el-col :span="11">
                            <el-date-picker
                            v-model="recruitForm.stopTime"
                            type="date"
                            placeholder="请选择结束时间"
                            style="width: 100%"
                            />
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button @click="cancle">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>


        <div class="show_box" v-if="showInfo" v-for="(item,index) in showData" :key="index">
            <el-card class="box-card"  v-if="item.is_show =='true'?true:false">
                <el-descriptions
                    class="margin-top"
                    title="招聘信息"
                    :column="1"
                    size="large"
                    border
                >
                <template #extra>
                    <el-button type="primary" @click="add">新增岗位</el-button>
                </template>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <InfoFilled />
                                </el-icon>
                                 公司名称
                            </div>
                        </template>
                        {{item.company_name}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                  <HelpFilled />
                                </el-icon>
                                招聘职位
                            </div>
                        </template>
                              {{item.job}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                   <Histogram />
                                </el-icon>
                              岗位需求
                            </div>
                        </template>
                        <p v-html="item.job_req"></p>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <Avatar />
                                </el-icon>
                                岗位薪资
                            </div>
                        </template>
                        {{item.job_price}}
                    </el-descriptions-item>   
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <office-building />
                                </el-icon>
                                招聘人数
                            </div>
                        </template>
                        {{item.recruit_num}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                   <Stamp />
                                </el-icon>
                                开始时间
                            </div>
                        </template>
                        <el-tag class="ml-2" type="warning">{{item.start_time}}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                   <LocationFilled />
                                </el-icon>
                                    结束时间
                            </div>
                        </template>
                        <el-tag class="ml-2" type="warning">{{item.stop_time}}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <BellFilled />
                                </el-icon>
                                    状态
                            </div>
                        </template>
                            <el-tag class="ml-2" :type="item.is_check=='false'?'danger':'success'"> {{item.is_check=='false'?'未审核':'已审核'}}</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
        </div>


      

    </div>
</template>

<script setup>
import { reactive, ref, toRefs ,computed} from "@vue/reactivity";
import {  onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import {showRecruitInfo,addRecruitInfo} from '../../../network/compangHandle/recruit'
import {cHangeDate} from '../../../utils/changDate'
const router =  useRouter()

const state = reactive({
    isShowEmpty:true,
    companyName:'',
    isShowAdd:false,
    showInfo:false,
    showData:'',
    size :'',
    recruitForm:{
        companyName: '',
        job: '',
        jobReq: '',
        recruitNum: 1,
        jobPrice: 1,
        stratTime:'',
        stopTime:'',
    }
})


const {isShowEmpty,isShowAdd,recruitForm,showInfo,showData} = toRefs(state)


const ruleFormRef = ref(null)
const rules = reactive({
    companyName: [{required: true, message: '请输入公司名称',trigger: 'blur'},],
    job:[{required: true, message: '请输入要招聘的岗位', trigger: 'blur' }],
    jobReq:[{required: true, message: '前输入要招聘的岗位需求', trigger: 'blur' }],
})

const iconStyle = computed(() => {
  const marginMap = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[state.size.value] || marginMap.default,
  }
})

const blockMargin = computed(() => {
  const marginMap = {
    large: '32px',
    default: '28px',
    small: '24px',
  }
  return {
    marginTop: marginMap[state.size.value] || marginMap.default,
  }
})



const isShow = ()=>{
    state.isShowEmpty = false
    state.isShowAdd = true
}

const add =()=>{
    state.isShowAdd = true
    state.showInfo = false
}

const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
        if (valid) {
            
           state.recruitForm.stratTime =  cHangeDate(state.recruitForm.stratTime)
           state.recruitForm.stopTime = cHangeDate(state.recruitForm.stopTime)
            addRecruitInfo(state.recruitForm).then(res=>{
               if(res.code=200){
                    ElMessage({
                            message: res.data,
                            type: 'success',
                        })
                    


                    setTimeout(()=>{
                        router.go(0)
                    },1500)

                    state.isShowAdd = false
                    state.showInfo = true
               }else{
                    ElMessage.error('添加失败')
               }
            })


        } else {
            console.log('error submit!', fields)
        }
  })
}


const cancle = ()=>{

    state.isShowAdd = false

    if(state.showData.length ==0){
        state.isShowEmpty = true
    }else{
        state.showInfo = true
    }
    
}

const init = ()=>{
    showRecruitInfo(state.companyName).then(res=>{
        if(res.code ==200){

            state.isShowEmpty = false
            state.showInfo = true
            state.showData = res.data

        }else{
            state.isShowEmpty =true
        }
    })
}

onMounted(()=>{
    state.companyName = localStorage.getItem('regCompany')
    if(state.companyName){
        init()
    }else{

        state.isShowEmpty =true
    }
    
})


</script>

<style lang="scss" scoped>
.add_box{
    width: 80%;
    margin: 0 auto;
    
}
.show_box{
    width: 80%;
    margin: 0 auto;
    margin-bottom: 50px;
}
.pagination{
    width: 80%;
    margin: 0 auto;
}
</style>