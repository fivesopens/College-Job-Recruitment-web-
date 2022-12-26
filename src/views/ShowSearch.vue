<template>
    <div class="search_box">
        <el-row>
            <el-col :span="24"  >
                <NavBar :name='state.userName' />
            </el-col>
            <el-col :span="13" :offset="6" v-for="(item,index) in jobInfo" :key="index"  @click="gotoPostion(item)">
                <el-card class="box-card" shadow="hover">
                    <div class="left">
                        <div class="header">
                            <span>{{item.job}}</span>
                        </div>
                        <div class="job_demo">
                            <span>{{(item.job_price>=1000)?(item.job_price/1000):item.job_price}}K·{{(index/2==0)?'13':'14'}}·薪</span> 
                            <el-tag type="warning">{{item.recruit_num}}人</el-tag>
                            <el-tag type="warning">{{(random(1,5))}}年</el-tag>
                        </div>
                    </div>
                    <div class="right">
                        <div class="company_name">
                            <h2>{{item.company_name}}</h2>
                        </div>
                        <div class="job_tag">
                            结束时间：{{item.stop_time}}
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import NavBar from "../components/navBar/NavBar.vue"
import { onMounted, reactive, toRefs } from "@vue/runtime-core";
import { useRouter ,useRoute} from "vue-router";
import {searchRecruit} from '../network/stuHandle/showInfo'
import { random } from "lodash";
const router = useRouter()
const route = useRoute()

const state = reactive({
    searchKey:'',
    userName:'',
    jobInfo:[],
})

const {jobInfo} = toRefs(state)

const gotoPostion = (row)=>{
   router.push(
        {path:'/workpostion'
        ,query:{id:row.recruit_id,
                userName:state.userName,
                companyName:row.company_name
        }
    })
}


const init = ()=>{

    searchRecruit(state.searchKey).then(res=>{
        if(res.code==200){
            res.data.map((item,index)=>{
                if(item.is_check=='true'){
                    state.jobInfo[index] = item
                }
            })
        }else{
            ElMessage.error(res.data)
        }
    })
}

onMounted(()=>{
    state.searchKey=route.query.searchKey
    init()
})

onBeforeMount(()=>{
    state.userName = route.query.userName
})
</script>

<style lang="scss" scoped>
.search_box{
    width: 100%;
    height: 100%;
    background: url('../assets/images/主页3背景.png');
    background-size: 100% 100%;
    background-attachment: fixed;
    .el-col{
        margin-bottom: 50px;
       
    }

    .el-card ::v-deep .el-card__body{
        display: flex;
        align-items:center;
        justify-content:space-between;
        .left{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            .header{
                margin-bottom: 20px;
                span{
                    margin-right: 50px;
                }
            }

            .job_demo{
                span:nth-child(1){
                    color: rgba(254,87,74);
                    margin-right: 20px;
                }
                .el-tag:nth-child(2){
                    margin-right: 10px;
                    .el-tag__content{
                        color: #333;
                        margin-left: 15px;
                    }
                }
                 .el-tag:nth-child(3){
                    margin-right: 10px;
                    .el-tag__content{
                        color: #333;
                        margin-left: 15px;
                    }
                }

            }

        }
        .right{
            margin-top: -20px;
            text-align: right;
            .job_tag{
                color: rgb(82, 81, 81);
                font-size: 15px;
            }
        }
    }
    
}
</style>