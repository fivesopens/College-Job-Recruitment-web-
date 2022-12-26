<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-table :data="filterTableData" style="width: 100%;" header-align="center" >
                    <el-table-column label="公司注册号" align="center" prop="company_id" />
                    <el-table-column label="公司名称"   align="center" prop="company_name"  width="150px" />
                    <el-table-column label="注册时间"   align="center" prop="reg_date"/>
                    <el-table-column label="法人代表"   align="center" prop="legal_name"/>
                    <el-table-column label="注册资金"   align="center" prop="reg_cap" />
                    <el-table-column label="公司人数"   align="center" prop="company_num"/>
                    <el-table-column label="公司地址"   align="center" prop="company_address"/>
                    <el-table-column label="公司简介"   align="center" prop="company_include" width="300px"/>
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
import {showCompanyinfo,updateCompanyCheck} from '../../../network/adminHandle/companyInfoMang'
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

    updateCompanyCheck({company_id:row.company_id}).then(res=>{
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

    showCompanyinfo().then(res=>{
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