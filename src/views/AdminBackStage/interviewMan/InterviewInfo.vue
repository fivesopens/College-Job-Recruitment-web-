<template>
    <div>
        <div class="showEmpty" v-if="showEmpty">
            <el-empty  description="无数据"/>
        </div>
        
        <div class="showInfo" v-else>
            <el-table  ref="tableRef"  :data="interviewInfo" style="width: 100%;" header-align="center" >
                <el-table-column label="ID"   align="center" prop="interviewId" />
                <el-table-column label="面试者"   align="center" prop="interviewName"/>
                <el-table-column label="面试岗位"   align="center" prop="interviewJob" />
                <el-table-column label="面试公司"   align="center" prop="interviewCompany"/>
                <el-table-column label="面试时间"   align="center" prop="interviewDate"  />
                <el-table-column label="面试地点"   align="center" prop="interviewAddress"/>
                <el-table-column label="结果"   align="center" prop="isCheck">
                    <template  v-slot="scope">
                        <el-tag class="ml-2" :type="scope.row.isCheck=='false'?'warning':'success'">{{scope.row.isCheck=='false'?'未通过':'通过'}}</el-tag>
                    </template> 
                </el-table-column>
                <el-table-column label="操作"   align="center">
                    <template  v-slot="scope">
                        <el-button type="success" @click="changeHandle(scope.row)" v-show="scope.row.isCheck=='true'?false:true">推荐岗位</el-button>
                    </template> 
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import {showInterviewInfo} from '../../../network/adminHandle/interviewMang'
import {showResumeInfo} from '../../../network/stuHandle/resume'
const state = reactive({
    showEmpty:true,
    interviewInfo:[],
})

const {showEmpty,interviewInfo} = toRefs(state)


const changeHandle= (row)=>{
    
    showResumeInfo(row.interviewName).then(res=>{
        console.log(res)
        ElMessage({
            message: `已给${row.interviewName},推荐他的意向岗位${res.data[0].postion}`,
            type: 'success',
        })
    })

}

const init = async ()=>{
    await showInterviewInfo().then(res=>{
       if(res.code==200){
            state.showEmpty=false
            state.interviewInfo = res.data
       }else{
            state.showEmpty=true
       }
    })
}

onMounted(()=>{
    init()
})
</script>

<style lang="scss" scoped>

</style>