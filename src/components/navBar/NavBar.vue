<template>
    <div>
        <el-affix :offset="0">
            <el-menu
                :default-active="activeIndex"
                
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
                background-color="#3636CD"
                @select="handleSelect"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <h3>高校求职招聘</h3>
                <div class="flex-grow" />
                <el-menu-item index="1" >首页</el-menu-item>
                <el-menu-item index="3">上传简历</el-menu-item>
                <el-menu-item index="4">个人中心</el-menu-item>
                <el-menu-item index="5" class="last">后台系统</el-menu-item>
                <div class="profile">
                    <el-dropdown trigger="click"  @command="handleCommand">
                        <span class="el-dropdown-link">
                            欢迎，{{name}}<el-icon class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                        <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item  command="message"><el-icon><Bell /></el-icon>我的消息</el-dropdown-item>
                            <el-dropdown-item  command="logout"><el-icon><Close /></el-icon>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-menu>
        </el-affix>
    </div>
</template>

<script setup>
import { ref ,} from "@vue/reactivity";
import { getCurrentInstance, onMounted } from "@vue/runtime-core";
import { useRouter } from "vue-router";
const {proxy} =getCurrentInstance()
const router = useRouter()
const props= defineProps({
    name:String,
})
const activeIndex = ref('1')


const handleCommand = (command) => {
    if(command =='logout'){
        router.push({path:'/login'})
    }else if(command =='message'){
        proxy.mittBus.emit('drawer',{drawer:true})
    }


   
} 

const handleSelect = (key, keyPath) => {  
   
    switch(key){
        case '1': router.push({path:'/homepage',query:{userName:props.name}}); break;
        case '3': router.push({path:'/uploadresum',query:{userName:props.name}});break;
        case '4': router.push({path:'/proflie',query:{userName:props.name}});break;
        case '5': router.push({path:'/login'});break;
    }

}


</script>

<style lang="scss" scoped>
 .flex-grow {
        flex-grow: 1;
    }
    .el-menu{
        h3{
            color: #fff;
            font-weight: 500;
            margin-left: 5%;
            
        }

        .el-menu-item{
            font-size: 25px;
        }
        .last{
            margin-right: 150px;
        }
       
        .profile{
            width: 120px;
            height: 40px;
            border-radius: 50px;
            margin-right: 50px;
            background-color: #fff;
            .el-dropdown{
                line-height: 40px;
                .el-dropdown-link{
                    font-size: 10px;
                }
            }
        }
    }

    .el-menu--horizontal{
        border: 0;
        align-items: center;
    }
</style>