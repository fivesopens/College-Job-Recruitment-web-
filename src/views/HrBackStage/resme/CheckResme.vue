<template>
    <div>
        <div class="showEmpty" v-if="isShowEmpty">
            <el-empty description="暂时还没有人投递简历~">
            </el-empty>
        </div>

        <div class="show_resme" v-else>
           
                    <el-table  ref="tableRef"  :data="deliveryInfo" style="width: 100%;" header-align="center" >
                        <el-table-column label="姓名"   align="center" prop="name" />
                        <el-table-column label="性别"   align="center" prop="gender" width="60px"/>
                        <el-table-column label="籍贯"   align="center" prop="place" width="80px"/>
                        <el-table-column label="毕业院校"   align="center" prop="grad_col" width="170px" />
                        <el-table-column label="学历"   align="center" prop="edu"/>
                        <el-table-column label="毕业时间"   align="center" prop="star_date"/>
                        <el-table-column label="入学时间"   align="center" prop="stop_date"/>
                        <el-table-column label="意向岗位"   align="center" prop="postion"/>
                        <el-table-column label="实习经历"   align="center" prop="exp" width="200px"/>
                        <el-table-column
                        
                            prop="job"
                            label="面试岗位"
                            width="130"
                            :filters="filters"
                            :filter-method="filterTag"
                            filter-placement="bottom-end"
                            >
                        </el-table-column>
                        <el-table-column label="状态"   align="center" prop="is_check" width="90px">
                            <template  v-slot="scope">
                                <el-tag class="ml-2" :type="scope.row.is_check=='false'?'warning':'success'">{{scope.row.is_check=='false'?'拒绝':'已通知'}}</el-tag>
                            </template> 
                        </el-table-column>
                       
                        <el-table-column label="操作"   align="center">
                            <template  v-slot="scope">
                                <el-button type="success" @click="changeHandle(scope.row)">预约面试</el-button>
                            </template> 
                        </el-table-column>
                    </el-table>

        </div>

        <el-dialog
            v-model="dialogVisible"
            title="选择时间地址"
            width="30%"
        >
                <el-date-picker
                    v-model="interviewInfo.date"
                    type="datetime"
                    placeholder="请选择面试时间"
                 />
                 <el-input v-model="interviewInfo.address" placeholder="请输入面试地址" />
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">
                确定
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import {showThisInfo,addInterview} from '../../../network/compangHandle/interview'
import {timeFormatConvert} from '../../../utils/changDate'
const state = reactive({
    isShowEmpty:true,
    search:'',
    deliveryInfo:[],
    filters:[],
    dialogVisible:false,
    value1:'',
    input:'',
    interviewInfo:{
        interviewName:'',
        interviewCompany:'',
        interviewJob:'',
        date:'',
        address:'',
    }
})

const tableRef = ref()

const {isShowEmpty,deliveryInfo,filters,dialogVisible,interviewInfo} = toRefs(state)

const resetDateFilter = () => {
  tableRef.value.clearFilter(['date'])
}

const clearFilter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  tableRef.value.clearFilter()
}



const filterTag = (value, row) => {
  return row.job === value
}


const changeHandle =  (row)=>{
    state.dialogVisible = true
    let companyName = localStorage.getItem('regCompany')
    state.interviewInfo.interviewName = row.name
    state.interviewInfo.interviewCompany = companyName
    state.interviewInfo.interviewJob = row.job

  
    
}

const submit = async ()=>{
    state.dialogVisible = false
    if(state.interviewInfo.date=='' || state.interviewInfo.address==''){
        ElMessage.error('请选择面试时间和地址')
    }else{
        state.interviewInfo.date = timeFormatConvert(state.interviewInfo.date)
        await addInterview(state.interviewInfo).then(res=>{
            if(res.code==200){
                ElMessage({
                    message: res.data,
                    type: 'success',
                })
            }
        })
    }
   
}

const init = async ()=>{
    let companyName = localStorage.getItem('regCompany')
    await showThisInfo(companyName).then(res=>{
        if(res.code==200){

            state.deliveryInfo = res.data 
            res.data.map((item,index)=>{
                let obj= { text: item.job, value: item.job }
                state.filters[index] = obj
            })
            state.isShowEmpty = false

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
::v-deep .el-dialog__body {
    display: flex;
    flex-direction: column;
   .el-input{
    margin-top: 20px;
   }
}

</style>