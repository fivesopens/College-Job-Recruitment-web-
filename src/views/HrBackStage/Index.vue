<template>
    <div class="main">
        <div class="common-layout">
            <el-container>
                <el-aside width="200px" ><NavBar :hrName="hrName"/></el-aside>
                <el-container>
                    <el-header>
                        <div class="header_box">
                            <div class="left">欢迎！<span>{{hrName}}</span></div>
                            <div class="right">  <el-button type="danger" @click="loginout">退出登录</el-button></div>
                        </div>
                    </el-header>
                    <el-main>
                        <RouterView/>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRefs } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { RouterView,useRouter,useRoute } from 'vue-router';
import NavBar from '../../components/HrBackNav/NavBar.vue';
const router = useRouter()
const route  = useRoute()

const state = reactive({
    hrName:''
})

const {hrName}  = toRefs(state)
onMounted(()=>{
   state.hrName = route.query.hrName
  
})

const loginout = ()=>{
    localStorage.removeItem('companyName')
    router.push({path:'/login'})
}

</script>

<style lang="scss" scoped>
.main{
    .common-layout{
        .el-header{
            border-bottom: 1px solid #ccc;
        }
        .header_box{
            margin-top: 1%;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .el-main{
            background-color:#f4f6f9;
            height: 92vh;
        }
    }
}
</style>