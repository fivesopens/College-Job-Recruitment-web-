<template>
    <div>
        <div class="show_empty" v-if="showEmpty">
            <el-empty description="暂时没有企业信息，快去添加~">
            </el-empty>
        </div>



        <div class="show_box" v-if="showBox" v-for="(item,index) in showData" :key="index">
           
            <el-card class="box-card">
                <el-descriptions
                    class="margin-top"
                    title="公司信息"
                    :column="1"
                    size="large"
                    border
                >
                    <template #extra>
                        <el-button type="warning" round @click="(drawer = true)">修改信息</el-button>
                        <el-popconfirm title="您确定要删除吗？"
                            @confirm="delInfo"
                        >
                            <template #reference>
                                <el-button type="danger" round>删除信息</el-button>
                            </template>
                        </el-popconfirm>
                       
                    </template>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <InfoFilled />
                                </el-icon>
                                 公司注册号
                            </div>
                        </template>
                        {{item.company_id}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                  <HelpFilled />
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
                                   <Histogram />
                                </el-icon>
                               注册时间
                            </div>
                        </template>
                        <el-tag class="ml-2" type="info">{{item.reg_date}}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <Avatar />
                                </el-icon>
                                法人代表
                            </div>
                        </template>
                        {{item.legal_name}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                   <Stamp />
                                </el-icon>
                                注册资金
                            </div>
                        </template>
                        <el-tag class="ml-2" type="warning">{{item.reg_cap}}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <office-building />
                                </el-icon>
                                    公司人数
                            </div>
                        </template>
                        {{item.company_num}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                   <LocationFilled />
                                </el-icon>
                                    公司地址
                            </div>
                        </template>
                        {{item.company_address}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <Management />
                                </el-icon>
                                    公司简介
                            </div>
                        </template>
                        <p v-html="item.company_include"></p>
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
                            <el-tag class="ml-2" :type="type"> {{item.is_check=='false'?'未审核':'已审核'}}</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </el-card>
        </div>

        <el-drawer v-model="drawer" title="I am the title" :with-header="false">
             <span>修改公司信息</span>
             <el-divider />
             <el-form :model="companyForm" label-width="120px"  :rules="rules"  ref="ruleFormRef"  status-icon>
                    <el-form-item label="公司注册号" prop="id" >
                        <el-input v-model="companyForm.id" />
                    </el-form-item>
                    <el-form-item label="公司名称"  prop="name">
                        <el-input v-model="companyForm.name" />
                    </el-form-item>
                    <el-form-item label="注册时间"  prop="date">
                    <el-col :span="11">
                        <el-date-picker
                        v-model="companyForm.date"
                        type="date"
                        placeholder="请选择时间"
                        style="width: 100%"
                        />
                    </el-col>
                    </el-form-item>
                    <el-form-item label="法人代表" prop="legalName">
                        <el-input v-model="companyForm.legalName" />
                    </el-form-item>
                    <el-form-item label="注册资金" prop="regCap">
                        <el-input v-model.number="companyForm.regCap" />
                    </el-form-item>
                    <el-form-item label="公司人数" prop="num">
                        <el-input-number v-model="companyForm.num" :min="1" :max="9999" />
                    </el-form-item>
                
                    <el-form-item label="公司地址" prop="options" >
                        <el-cascader size="large" :options="state.options" v-model="state.provinces" @change="onChange" placeholder="请选择省市区"></el-cascader>
                    </el-form-item>
                    <el-form-item label="公司简介" prop="include">
                        <el-input v-model="companyForm.include" type="textarea" placeholder="请输入公司简介"  rows="5" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
                        <el-button @click="cancle">取消</el-button>
                    </el-form-item>
                </el-form>
        </el-drawer>

    </div>
</template>

<script setup>
import { reactive, toRefs,computed } from "@vue/reactivity";
import { onMounted,getCurrentInstance } from "@vue/runtime-core";
import {showCompanyInfo,updateCompanyInfo,delCompanyInfo} from '../../../network/compangHandle/company'
import { regionData ,CodeToText } from "element-china-area-data"
import { useRouter,useRoute } from "vue-router";
const router = useRouter()
const route = useRoute()
const state = reactive({
    showEmpty:true,
    showBox:false,
    showData:'',
    size :'',
    drawer:false,
    options: regionData,//选择格式
    provinces: [],
    hrName:'',
    companyForm:{
        id: '',
        name: '',
        date: '',
        legalName: '',
        regCap: '',
        num: 1,
        address:'',
        include:'',
    }
})

const {showEmpty,showBox,showData,drawer,companyForm} = toRefs(state)

const init=async ()=>{
    await showCompanyInfo(state.hrName).then(res=>{
        if(res.data.length>=1){
            state.showEmpty = false
            state.showBox =true

            state.showData = res.data

            state.companyForm.id = res.data[0].company_id
            state.companyForm.name = res.data[0].company_name
            state.companyForm.date =res.data[0].reg_date
            state.companyForm.legalName = res.data[0].legal_name
            state.companyForm.regCap = res.data[0].reg_cap
            state.companyForm.num = res.data[0].company_num
            state.companyForm.address = res.data[0].company_address
            state.companyForm.include = res.data[0].company_include
        }
    })

    localStorage.setItem('companyName', state.companyForm.name)
}


const ruleFormRef = ref(null)
const rules = reactive({
    id: [{ required: true, message: '请输入公司注册号', trigger: 'blur' },],
    name: [{required: true, message: '请输入公司名称',trigger: 'blur'},],
    data:[{required: true, message: '请选择日期', trigger: 'blur' }],
    legalName:[{required: true, message: '请输入法人名字', trigger: 'blur' }],
    regCap:[{required: true, message: '请输入注册资金', trigger: 'blur' }],
    address:[{required: true, message: '请选择地址', trigger: 'blur' }],
    include:[{required: true, message: '请输入公司简介', trigger: 'blur' }],
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

const type = computed(()=>{
    for(let i = 0 ;i<state.showData.length;i++){
        if (state.showData[i].is_check=='false'){
            return 'danger'
        }else{
            return 'success'
        }
    }
  
   
})



const changeDate=(date)=>{
    const d = new Date(date)
    const resDate = d.getFullYear() + '-' + p((d.getMonth() + 1)) + '-' + p(d.getDate())
    return resDate
}

const p = (s)=>{
    return s < 10 ? '0' + s : s
}


const onChange = (e) => {
    let address = CodeToText[e[0]] +'-' +  CodeToText[e[1]] +'-'+ CodeToText[e[2]] 

    state.companyForm.address  = address
}

const submitForm = async (formEl) => {
  
  if (!formEl) return

  await formEl.validate((valid, fields) => {

      if (valid) {

          let newDate =changeDate(state.companyForm.date)
          state.companyForm.date = newDate
            updateCompanyInfo(state.companyForm).then(res=>{
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

const delInfo=async ()=>{
    await delCompanyInfo(state.companyForm.id).then(res=>{
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


const cancle= ()=>{
   state.drawer = false
}




onMounted(()=>{
    state.hrName = route.query.hrName
    init()
})


</script>

<style lang="scss" scoped>
.show_box{
    width: 80%;
    margin: 0 auto;
}
</style>