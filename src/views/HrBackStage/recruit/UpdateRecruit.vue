<template>
    <div>

        <div class="showEmpty" v-if="isShowEmpty">
            <el-empty description="暂时还没有招聘信息，快去添加~">
            </el-empty>
        </div>


        <div class="show_box" v-if="isShowInfo" v-for="(item,index) in showData" :key="index">
            <el-card class="box-card">
                    <el-descriptions
                        class="margin-top"
                        title="招聘信息"
                        :column="1"
                        size="large"
                        border
                    >
                    <template #extra>
                        <el-button type="warning" @click="updateInfo(item)" round>修改招聘信息</el-button>
                        <el-popconfirm title="您确定要删除吗？"
                            @confirm="close(item)"
                        >
                            <template #reference>
                                <el-button type="danger" disabled round v-if="item.is_show =='false'?true:false">该岗位已关闭</el-button>
                                <el-button type="danger" round v-else>关闭该岗位</el-button>
                            </template>
                        </el-popconfirm>
                       
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

            <el-drawer v-model="drawer" title="修改招聘信息" :with-header="false" size="50%">
                    <h3>修改招聘信息</h3>
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
                            <el-button @click="cancle">清空</el-button>
                        </el-form-item>
                    </el-form>
            </el-drawer>
    </div>
</template>

<script setup>
import { reactive,ref, toRefs,computed } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import {showRecruitInfo,showThisInfo,updataInfo,delInfo} from '../../../network/compangHandle/recruit'
import {cHangeDate} from '../../../utils/changDate'
const router =  useRouter()
const state = reactive({
    isShowEmpty:true,
    isShowInfo:false,
    companyName:'',
    showData:'',
    size :'',
    drawer:false,
    id:[],
    recruitForm:{
        id:'',
        companyName:'',
        job:'',
        jobReq:'',
        recruitNum:1,
        jobPrice:1,
        stratTime:'',
        stopTime:'',
    },
})

const {isShowEmpty,isShowInfo,recruitForm,showData,drawer} = toRefs(state)

const ruleFormRef = ref(null)
const rules = reactive({
    companyName: [{required: true, message: '请输入公司名称',trigger: 'blur'},],
    job:[{required: true, message: '请输入要招聘的岗位', trigger: 'blur' }],
    jobReq:[{required: true, message: '前输入要招聘的岗位需求', trigger: 'blur' }],
})


const submitForm = async (formEl) => {
  if (!formEl) return

  await formEl.validate((valid, fields) => {
        if (valid) {
            
           state.recruitForm.stratTime =  cHangeDate(state.recruitForm.stratTime)
           state.recruitForm.stopTime = cHangeDate(state.recruitForm.stopTime)
            
           updataInfo(state.recruitForm).then(res=>{
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


const updateInfo = (item)=>{
    state.drawer = true
    showThisInfo(item.recruit_id).then(res=>{
        

        if(res.code ==200){
            state.recruitForm.id = res.data[0].recruit_id
            state.recruitForm.companyName = res.data[0].company_name
            state.recruitForm.job = res.data[0].job
            state.recruitForm.jobReq = res.data[0].job_req
            state.recruitForm.recruitNum = res.data[0].recruit_num
            state.recruitForm.jobPrice = res.data[0].job_price
            state.recruitForm.stratTime = res.data[0].start_time
            state.recruitForm.stopTime = res.data[0].start_time
        }else{
            ElMessage.error(res.data)
        }
      

       
    })
}   

const close = (row)=>{
    delInfo(row.recruit_id).then(res=>{
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
}

const cancle = ()=>{
    state.recruitForm = ''
}

const init = ()=>{
    
   
    showRecruitInfo(state.companyName).then(res=>{
        
        if(res.code ==200){
            state.isShowEmpty = false
            state.isShowInfo = true

            for(let i = 0 ;i<res.data.length;i++){
                state.id[i] = state.id.push(res.data[i].recruit_id)
            }

            state.showData = res.data   
            console.log(state.showData)
        }else{

            ElMessage.error('暂无招聘信息')

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
.show_box{
    width: 80%;
    margin: 0 auto;
    margin-bottom: 50px;
}
</style>