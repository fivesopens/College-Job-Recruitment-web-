<template>
    <div class="box">
        <el-row>
            <el-col :span="24" >
                <NavBar :name="userName" />
            </el-col>
            
            <el-col class="serach_col" :span="16" :offset="4">
                <div class="search">
                    <el-input v-model="state.input" placeholder="收索职位"  :prefix-icon="Search"></el-input>
                    <el-button color="#626aef" @click="searchBtn">搜索</el-button>
                </div>
            </el-col>
        </el-row>

        <div class="contain">
                <el-carousel :interval="4000" type="card" height="400px">
                    <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                        <img :src="item" alt="">
                    </el-carousel-item>
                 </el-carousel>
        </div>    
    </div>
    <div class="pos_rec" >
        <h1>热门职位推荐</h1>
        <div class="context">
            <el-card class="box-card" 
            :body-style="{padding:'10px',width:'100%'}" 
            shadow="hover" 
            v-for="(item,index) in jobInfo" 
            :key="index"
            @click="gotoPostion(item)">
               <div class="header">
                 <div class="job_name"><h4>{{item.job}}</h4></div>
                 <div class="job_price">{{(item.job_price>=1000)?(item.job_price/1000):item.job_price}}K·{{(index/2==0)?'13':'14'}}薪</div>
               </div>
               <div class="job_demo">
                    <el-tag type="warning">上海</el-tag>
                    <el-tag type="warning">{{random(1,5)}}年</el-tag>
                    <el-tag type="warning">本科</el-tag>
                </div>
               <div class="bottom">
                    <div class="job_img">
                        <span>{{item.company_name}}</span>
                    </div>
                    <div class="job_tag">
                       结束时间 | {{item.stop_time}}
                    </div>
               </div>
            </el-card>
        </div>

        <div class="footer">
            <div class="footer_content_one">
                <ul>
                    <li v-for="(item,index) in footerCtx1" :key="index" @click="footer">{{item}}</li>
                </ul>
            </div>
            <div class="footer_content_one">
                <ul>
                    <li v-for="(item,index) in footerCtx2" :key="index"  @click="footer">{{item}}</li>
                </ul>
            </div>
            <div class="footer_content_one">
                <ul>
                    <li v-for="(item,index) in footerCtx3" :key="index"  @click="footer">{{item}}</li>
                </ul>
            </div>
        </div>

        <el-drawer
            v-model="state.drawer"
            title="消息通知"
            direction="ttb"
            size="50%"
            close-on-press-escape
        >
            <el-table  ref="tableRef"  :data="interviewRes" style="width: 100%;" header-align="center" >
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
            </el-table>
        </el-drawer>

    </div> 
</template>

<script setup>
import { reactive, ref, toRefs } from "@vue/reactivity"
import { useRoute,useRouter } from "vue-router";
import NavBar from "../components/navBar/NavBar.vue"
import {  Search } from '@element-plus/icons-vue'
import {showRecruitinfo} from '../network/adminHandle/companyInfoMang'
import {showInteviewRes,} from '../network/stuHandle/showInfo'
import {showResumeInfo} from '../network/stuHandle/resume'
import { onMounted,onBeforeMount,getCurrentInstance, onUnmounted } from "@vue/runtime-core";
import { random } from "lodash";


const route = useRoute()
const router = useRouter()
let userName = ref('')
const state = reactive({
    input:'',
    drawer:false,
    jobInfo:[],
    interviewRes:[],
    bannerList:[
        '/src/assets/images/主页图片.jpg',
        '/src/assets/images/主页图片1.png',
        '/src/assets/images/主页图片3.png',
        '/src/assets/images/主页图片2.jpg',
        '/src/assets/images/主页图片5.png'
    ],
    footerCtx1:['企业服务','职位收索','新闻资讯','投资者关系'],
    footerCtx2:['协议与规则','隐私政策','防骗指南','使用帮助'],
    footerCtx3:['工作日 8:00 - 22:00','休息日 9:30 - 18:30',' 网上有害信息举报专区','Copyright © 2022 高校求职招聘'],
})

const {jobInfo,footerCtx1,footerCtx2,footerCtx3,bannerList,interviewRes} = toRefs(state)
const {proxy} = getCurrentInstance()



const gotoPostion = (row)=>{
   router.push(
        {path:'/workpostion'
        ,query:{id:row.recruit_id,
                userName:userName,
                companyName:row.company_name
        }
    })
}

const searchBtn = ()=>{
    setTimeout(()=>{
        router.push({path:'/showsearch',query:{
            searchKey:state.input,
            userName:userName
        }})
    },1000)
}


const footer = ()=>{
    ElMessage.error('此功能暂未开发')
}


const msgBox = async () => {
  
  let resumeName = state.interviewRes[0].interviewName
  await showResumeInfo(resumeName).then(res=>{
      
        if(state.interviewRes[0].isCheck=='false'){
            ElNotification({
                title: '消息通知',
                message: `以为您推荐岗位${res.data[0].postion}`,
                type: 'success',
            })
        }
  })

  
}

const showRes = async ()=>{
    proxy.mittBus.on('drawer',(data) =>{
        state.drawer = data.drawer
       
        if(state.drawer==true){
          
            msgBox()
        }
    })

     await  showInteviewRes(userName).then(res=>{
        if(res.code==200){
            state.interviewRes = res.data
            
        }
    })
}

const init = ()=>{
    let newArr =[]
    showRecruitinfo().then(res=>{
        if(res.code==200){
   
            res.data.map((item,index)=>{
                if(item.is_check=='true' && item.is_show =='true'){
               
                  
                    if(state.jobInfo.length<=8){
                        newArr=state.jobInfo.push(item)
                    }else{
                        return
                    }
                    
                }
            })
            
        }
    })
}


onMounted(()=>{
    init()
    showRes()
})

onUnmounted(()=>{
    proxy.mittBus.off('drawer')
})
onBeforeMount(()=>{
    userName = route.query.userName
})

</script>

<style lang="scss" scoped>

.box{
    width: 100%;
    height: 100%;
    background: url('../assets/images/背景图4.png');
    background-size: 100% 100%;
    background-attachment: fixed;
    
    .serach_col{
        margin-top: 50px;
        .search{
            width: 100%;
            height: 100%;
            .el-input{
                width: 60%;
                height: 60px;
                border: 4px solid rgba(116,47,225);
            }
            .el-button{
                width: 15%;
                height: 55px;
                font-size: 20px;
                color: #fff;
            }
        }
    }
  
    .contain{
        width: 90%;
        height: 450px;
        margin: 50px auto;
        .el-carousel__container{
            margin-top: 25px;
        }
       
        .el-carousel{
            width: 100%;
            height: 100%;
           
           
            img{
                width: 100%;
                height: 100%;
            }
        }


            .el-carousel__item h3 {
                color: #475669;
                opacity: 0.75;
                line-height: 200px;
                margin: 0;
                text-align: center;
            }

            .el-carousel__item:nth-child(2n) {
                 background-color: #99a9bf;
            }

            .el-carousel__item:nth-child(2n + 1) {
                 background-color: #d3dce6;
            }
    }

   
}
  
.el-carousel__button{
    background-color: #fff;
}

.pos_rec{
    
        position: relative;
        width: 100%;
        height: 100%;
        margin-top: -20px;
        background: url('../assets/images/主页3背景.png');
        background-size: 100% 100%;

        h1{
            line-height: 90px;
        }
        .context{
            display: flex;
            flex-wrap: wrap;
            position: absolute;
            justify-content: space-around;
            align-content: space-between;
            width: 86%;
            height:60%;
            left: 7%;
            top: 95px;
            .box-card{
                display: flex;
                width: 30%;
                height: 30%;
                
                .header{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    height:33%;
                    margin-bottom: 5px;
                    .job_price{
                        color: rgba(254,87,74);
                    }
                }
                .job_demo{
                    width: 100%;
                    height: 33%;
                    margin-left: -100px; 
                    margin-bottom: 5px;
                    .el-tag{
                        margin: 5px;
                    }
                }

                .bottom{
                    width: 100%;
                    height: 33%;
                    background-color: rgba(75, 75, 75, 0.007);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .job_img{
                        display: flex;
                        align-items: center;
                        width: 50%;
                        height: 100%;
                        span{
                            margin-left: 10px;
                            font-size: 14px;
                            color: rgb(109, 108, 108);
                        }
                        img{
                            
                            height: 100%;
                            width: 25%;
                            border-radius: 50%;
                        }
                    }
                    .job_tag{

                        font-size: 14px;
                    }
                }
            }
        }

        .footer{
            display: flex;
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 150px;
            background-color: #333;
            .footer_content_one{
                width: 30%;
                height: 100%;
                ul{
                    li{
                        cursor: pointer;
                        list-style: none;
                        color: #fff;
                        padding:5px;
                    }
                    li:hover{
                        color:rgb(0,190,189) ;
                    }
                }
            }
        }
}

</style>