<template>
    <div>
       
        <el-menu
        default-active="2-1"
        class="el-menu-vertical-demo"
        background-color="#343a40"
        text-color="#d6d8d9"
        active-text-color="#157ffb"
        @open="handleOpen"
        @close="handleClose"
        router
      >
         <h1 style="color:#d6d8d9;">求职招聘HR后台</h1>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Briefcase /></el-icon>
            <span >招聘信息管理</span>
          </template>
             <el-menu-item index="/addrecruitinfo">发布招聘信息</el-menu-item>
             <el-menu-item index="/updaterecruitinfo">修改招聘信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Shop /></el-icon>
            <span>企业管理</span>
          </template>
             <el-menu-item :route="{path:'/addcompanyinfo',query:{hrName:hrName}}" index="2-1">添加企业信息</el-menu-item>
             <el-menu-item :route="{path:'/updatecompany',query:{hrName:hrName}}" index="2-2">修改企业信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Management /></el-icon>
            <span>面试管理</span>
          </template>
             <el-menu-item index="/checkresme">查看简历</el-menu-item>
             <el-menu-item index="/interview">面试管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
</template>

<script setup>

const props= defineProps({
    hrName:String,
})




const handleOpen = (key, keyPath) => {
  
}
const handleClose = (key, keyPath) => {
 
}
</script>

<style lang="scss" scoped>
.el-menu{
    position: fixed;
    height: 100%;
    width: 200px;
}
</style>