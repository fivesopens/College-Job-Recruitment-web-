<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-table :data="filterTableData" style="width: 100%;" header-align="center" >
                    <el-table-column label="ID" align="center" prop="recruit_id" />
                    <el-table-column label="招聘公司" align="center" prop="company_name" />
                    <el-table-column label="招聘职位" align="center" prop="job" />
                    <el-table-column label="岗位要求"   align="center" prop="job_req"  width="300">
                        <template  v-slot="scope">
                         <p v-html="scope.row.job_req"></p>
                        </template> 
                    </el-table-column>
                    <el-table-column label="招聘职位"   align="center" prop="recruit_num"/>
                    <el-table-column label="岗位薪资"   align="center" prop="job_price"/>
                    <el-table-column label="开始时间"   align="center" prop="start_time" />
                    <el-table-column label="结束时间"   align="center" prop="stop_time"/>
                    <el-table-column label="状态"   align="center" prop="is_check">
                        <template  v-slot="scope">
                            <el-tag class="ml-2" :type="scope.row.is_check=='false'?'warning':'success'">{{scope.row.is_check=='false'?'未通过':'通过'}}</el-tag>
                        </template> 
                    </el-table-column>

                    <el-table-column label="操作"   align="center">
                        <template  v-slot="scope">
                            <el-button type="success" @click="changeHandle(scope.row)">通过审核</el-button>
                        </template> 
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { onMounted, reactive } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import {showRecruitinfo,updateRecruitCheck} from '../../../network/adminHandle/companyInfoMang'
const router = useRouter()

const state = reactive({
    search:'',
    tableData:[],
    
})


const {search,tableData} = toRefs(state)

const filterTableData = computed(() =>
  state.tableData.filter( (data) =>!state.search || data.name.toLowerCase().includes(state.search.toLowerCase()))
)

const changeHandle =(row)=>{

    updateRecruitCheck({recruit_id:row.recruit_id}).then(res=>{
        if(res.code==200){
            ElMessage({
                type: 'success',
                message: res.data,
            })
            
            setTimeout(()=>{
                router.go(0)
            },1500)
        }else{
            ElMessage({
                type: 'error',
                message: res.data,
            })
        }
    })

}



const init = ()=>{

    showRecruitinfo().then(res=>{
       if(res.code == 200){
            state.tableData = res.data
       }
    })
}

onMounted(()=>{
    init()
})

</script>

<style lang="scss" scoped>
.el_pag{
    margin-top: 20px;
}
</style>