<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="16" :offset="4">
                <el-table :data="filterTableData" style="width: 100%;" header-align="center" >
                    <el-table-column label="用户名" align="center" prop="stuName" />
                    <el-table-column label="密码"   align="center" prop="passwrod" />
                    <el-table-column label="头像"   align="center" prop="imgUrl">
                        <template  v-slot="scope">
                            <el-image style="width: 100px; height: 100px" :src="scope.row.imgUrl?scope.row.imgUrl:state.squareUrl" fit="cover" />
                        </template> 
                    </el-table-column>
                    <el-table-column label="账号状态"   align="center" prop="isDel">
                        <template  v-slot="scope">
                            <el-tag class="ml-2" :type="scope.row.isDel=='false'?'success':'warning'">{{scope.row.isDel=='false'?'在线':'已删除'}}</el-tag>
                        </template> 
                    </el-table-column>
                    <el-table-column align="center" label="身份" prop="id" />
                    <el-table-column align="right" width="200px">
                    <template #header>
                        <el-input  v-model="search" size="small" placeholder="输入用户名收索" />
                    </template>
                    <template #default="scope">
                        <el-button  type="success" size="large" @click="handleEdit(scope.$index, scope.row)"
                        >恢复用户</el-button
                        >
                        <el-button
                        size="large"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                        >
                    </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
      
       
    </div>
</template>

<script setup>
import { onMounted, reactive, ref ,computed, toRefs} from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import {showStuinfo,delStuInfo,recStuInfo} from '../../../network/adminHandle/stuInfoMang'
const router = useRouter()
const state = reactive({
    search:'',
    squareUrl:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
    currentPage:1,
    total:20,
    pageSize:4,
    tableData:[],
    imgData:[],
})


const {search,tableData} = toRefs(state)

const filterTableData = computed(() =>
  state.tableData.filter( (data) =>!state.search || data.stuName.toLowerCase().includes(state.search.toLowerCase()))
)
const handleEdit = (index,row) => {
  recStuInfo({stuName:row.stuName}).then(res=>{
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
const handleDelete = (index, row) => {
    ElMessageBox.confirm(
    '您确定要删除用户吗?',
    '删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {

        delStuInfo({stuName:row.stuName}).then(res=>{
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
      
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
 
}

const init= ()=>{
    showStuinfo().then(res=>{
        if(res.code ===200){
            state.tableData = res.data
            for(var i=0;i<=res.imgUrl.length;i++){
                for(var j =0;state.tableData.length;j++){
                    if(res.imgUrl[i].stuName==state.tableData[j].stuName){
                        state.tableData[j]['imgUrl']='data:image/jpeg;base64,'+ res.imgUrl[i].avatarUrl
                        break;
                    }
                }
            }
            
        }else{
            
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