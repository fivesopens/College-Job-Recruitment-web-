<template>
    <div class="work_box">
        <el-row>
            <el-col :span="24"  >
                <NavBar :name='state.userName' />
            </el-col>
            <div class="work_body" v-for="(item,index) in companyInfo" :key="index" >
              
                <div class="body_container" >
                    <div class="left_img">
                        <!-- <img src="https://img.bosszhipin.com/beijin/mcs/chatphoto/20190130/2e2eac8225a3b4c33f845b676b71366bcc7a34b52ce04ea28b476c9c33f51f7a.jpg?x-oss-process=image/resize,w_120,limit_0" alt=""> -->
                        <div class="left_include">
                            <h1>{{item.company_name}}</h1>
                            <span>公司地址：{{item.company_address}}</span>
                            <span>成立日期:{{item.reg_date}}</span>
                        </div>
                    </div>
                    <div class="right_include">
                        <h3>{{recruitInfo.length}}在招职位</h3>
                        <h3>{{item.company_num}}人</h3>
                    </div>
                </div>

                <div class="work_include">
                    <div class="include_header"><el-divider content-position="left">公司简介</el-divider></div>
                    <div class="include_body">
                        {{item.company_include}}
                    </div>
                </div>

               

            </div>
            <div class="hot_work">
                <el-card class="box-card" shadow="hover" v-for="(item,index) in recruitInfo" :key="index" >
                    <div class="top">
                        <h1>{{item.job}}</h1> <h1>{{(item.job_price>=1000)?(item.job_price/1000):item.job_price}}K·{{(index/2==0)?'13':'14'}}薪</h1>
                        <el-button type="warning" round @click="submit(item)" >投递简历</el-button>
                    </div>
                    <div class="bottom">
                        <h3>职位描述</h3>
                        <span style="white-space: pre-wrap">{{item.job_req}}</span>
                    </div>
                </el-card>
            </div>
        </el-row>
    </div>
</template>true

<script setup>
import NavBar from "../components/navBar/NavBar.vue"
import { useRoute } from "vue-router";
import { computed, onBeforeMount, onMounted, reactive, toRefs } from "@vue/runtime-core";
import {showCompanyinfoStu,showRecruitinfoStu,delivery} from '../network/stuHandle/showInfo'
import {showResumeInfo} from '../network/stuHandle/resume'
import {changeDate} from '../utils/changDate'
import router from "../router";
const route = useRoute()
const state = reactive({
    userName:'',
    companyName:'',
    rescruitId:'',
    resumeId:'',
    companyInfo:[],
    recruitInfo:[],
})


const {companyInfo,recruitInfo} = toRefs(state)



const init =()=>{
    showCompanyinfoStu(state.companyName).then(res=>{
        if(res.code==200){
            state.companyInfo = res.data
        }
    })

    showRecruitinfoStu(state.rescruitId).then(res=>{
        if(res.code==200){
            state.recruitInfo = res.data
           
        }
    })

    


}

const submit = async (row)=>{
   
   await showResumeInfo(state.userName).then(res=>{
        if(res.code==200){
            state.resumeId = res.data[0].resume_id
        }else{
            ElMessage.error('暂时没有简历信息快去添加~')
        }
    })

    if (row.is_show=='false'){
        ElMessage.error('该职位已关闭~')
    }else{
        let date = changeDate()
        const data = {
            recruitId:row.recruit_id,
            userId:state.userName,
            resumeId:state.resumeId,
            date:date
        }
        await delivery(data).then(res=>{
            if(res.code ==200){
                ElMessage({
                    message: res.data,
                    type: 'success',
                })
            }else{
                ElMessage.error(res.data)
            }
        })
    }
  
    
}

onMounted(()=>{
    init()
})

onBeforeMount(()=>{
    state.userName = route.query.userName
    state.companyName = route.query.companyName
    state.rescruitId = route.query.id
})
</script>

<style lang="scss" scoped>
.work_box{
    width: 100%;
    height: 100%;
    background: url('../assets/images/主页3背景.png');
    background-size: 100% 100%;
    background-attachment: fixed;
    .work_body{
        width: 75%;
       
        margin: 50px auto;
       
        .body_container{
            display: flex;
            justify-content: space-between;
            background-color: rgb(233, 238, 240);
            border-radius: 20px;
           width: 100%;
           .left_img{
             display: flex;
             margin: 20px;
             .left_include{
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                margin-left: 10px;
                h1{
                    text-align:left;
                }
             }
           
           }
           .right_include{
                display: flex;
                align-items: center;
                h3{
                    margin-right: 25px;
                }
            }
        }

       

        .work_include{
            width: 100%;
            border-radius: 20px;
            background: #fff;
            .include_body{
                margin: 18px;
                text-align: left;
                text-indent: 30px;
            }
        }
    }

    .hot_work{
            
            width: 75%;
            margin:0 auto; 
            height: 100px;
            border-radius: 20px;
            .box-card{
                width: 100%;
               .top{
                    display: flex;
                    align-items: center;
                    
                }
                
                h1:nth-child(2) {
                    margin-left: 50px;
                    color: rgba(254,87,74);
                }
                .el-button:nth-child(3) {
                    margin-left: 50px;
                   
                }
                .bottom{
                    text-align: left;
                }
            }
        }
    
}
</style>