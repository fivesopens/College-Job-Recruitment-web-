<template>
    <div class="main">
        <div class="common-layout">
            <el-container>
                <el-aside width="200px"><NavBar/></el-aside>
                <el-container>
                    <el-header>
                        <div class="header_box">
                            <div class="left">欢迎！<span>{{adminName}}</span></div>
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
import { reactive, ref, toRefs } from '@vue/reactivity';
import { RouterView,useRouter,useRoute } from 'vue-router';
import NavBar from '../../components/AdminBackNav/NavBar.vue';
const router = useRouter()
const route = useRoute()

const state = reactive({
    adminName:''
})

const {adminName} = toRefs(state)


const loginout = ()=>{
    router.push({path:'/login'})
}


onMounted(() => {
    state.adminName  =route.query.adminName      
})

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