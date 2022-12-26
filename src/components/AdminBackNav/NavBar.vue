<template>
    <div>
       
        <el-menu
        default-active="/studentinfo"
        class="el-menu-vertical-demo"
        background-color="#343a40"
        text-color="#d6d8d9"
        active-text-color="#157ffb"
        @open="handleOpen"
        @close="handleClose"
        router
      >
         <h1 style="color:#d6d8d9;">求职招聘管理员后台</h1>
        <el-sub-menu index="1">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span >学生管理</span>
          </template>
             <el-menu-item index="/studentinfo">学生信息</el-menu-item>
             <el-menu-item index="/sturesmeinfo">学生简历</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Avatar /></el-icon>
            <span>企业管理</span>
          </template>
             <el-menu-item index="/companyinfo">企业信息</el-menu-item>
             <el-menu-item index="/postioninfo">招聘信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Comment /></el-icon>
            <span>面试管理</span>
          </template>
             <el-menu-item index="/interviewinfo">面试情况</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
</template>

<script setup>



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