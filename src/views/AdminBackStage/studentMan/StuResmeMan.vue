<template>
    <div>
        <el-row :gutter="24">
            <el-col :span="24">
                <el-table :data="filterTableData" style="width: 100%;" header-align="center" >
                    <el-table-column label="ID" align="center" prop="resume_id" />
                    <el-table-column label="姓名"   align="center" prop="name" />
                    <el-table-column label="性别"   align="center" prop="gender" width="60px"/>
                    <el-table-column label="籍贯"   align="center" prop="place" width="80px"/>
                    <el-table-column label="毕业院校"   align="center" prop="grad_col" width="170px" />
                    <el-table-column label="学历"   align="center" prop="edu"/>
                    <el-table-column label="毕业时间"   align="center" prop="star_date"/>
                    <el-table-column label="入学时间"   align="center" prop="stop_date"/>
                    <el-table-column label="意向岗位"   align="center" prop="postion"/>
                    <el-table-column label="实习经历"   align="center" prop="exp" width="200px"/>
                    <el-table-column label="状态"   align="center" prop="is_check" width="90px">
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
import {showResumeinfo,updateCheck} from '../../../network/adminHandle/stuInfoMang'
const router = useRouter()

const state = reactive({
    search:'',
    tableData:[],
})


const {search,tableData,currentPage,total,pageSize} = toRefs(state)

const filterTableData = computed(() =>
  state.tableData.filter( (data) =>!state.search || data.name.toLowerCase().includes(state.search.toLowerCase()))
)

const changeHandle =(row)=>{

    updateCheck({resume_id:row.resume_id}).then(res=>{
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

    showResumeinfo().then(res=>{
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