<template>
    <div>
        <div class="showEmpty" v-if="isShowEmpty">
            <el-empty description="暂时还没有面试预约~">
            </el-empty>
        </div>

        <div class="showInfo" v-else>
            <el-table  ref="tableRef"  :data="interviewInfo" style="width: 100%;" header-align="center" >
                        <el-table-column label="ID"   align="center" prop="interviewId" />
                        <el-table-column label="面试者"   align="center" prop="interviewName"/>
                        <el-table-column label="面试岗位"   align="center" prop="interviewJob" />
                        <el-table-column label="面试时间"   align="center" prop="interviewDate"  />
                        <el-table-column label="面试地点"   align="center" prop="interviewAddress"/>
                        <el-table-column label="结果"   align="center" prop="isCheck">
                            <template  v-slot="scope">
                                <el-tag class="ml-2" :type="scope.row.isCheck=='false'?'warning':'success'">{{scope.row.isCheck=='false'?'未通过':'通过'}}</el-tag>
                            </template> 
                        </el-table-column>
                        <el-table-column label="操作"   align="center">
                            <template  v-slot="scope" >
                                <el-button type="success" @click="changeHandle(scope.row)">录用</el-button>
                            </template> 
                        </el-table-column>
                </el-table>
        </div>  
    </div>
</template>

<script setup>
import { reactive, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import {showInterviewInfo,employment} from '../../../network/compangHandle/interview'
const router =  useRouter()
const state = reactive({
    isShowEmpty:true,
    interviewInfo:[],
})


const {isShowEmpty,interviewInfo} = toRefs(state)


const changeHandle = async (row)=>{
    await employment(row.interviewId).then(res=>{
       if(res.code==200){
            ElMessage({
                message: res.data,
                type: 'success',
            })

            setTimeout(()=>{
                router.go(0)
            },1500)
       }
    })
}

const init = async () =>{

    let companyName = localStorage.getItem('regCompany')
    await showInterviewInfo(companyName).then(res=>{
            if(res.code==200){
                state.isShowEmpty = false
                state.interviewInfo = res.data
                console.log(state.interviewInfo)
            }else{
                state.isShowEmpty = true
            }
    })

}


onMounted(()=>{
    init()
})


</script>

<style lang="scss" scoped>

</style>