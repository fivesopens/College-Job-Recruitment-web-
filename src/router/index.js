import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:pathMatch(.*)",
      redirect: "/login"
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('../views/Login.vue')
    },
    {
      path:'/homepage',
      name:'homePage',
      component:()=>import('../views/HomePage.vue'),
    },
    {
      path:'/register',
      name:'Register',
      component:()=>import('../views/Register.vue'),
     
    },
    {
      path:'/workpostion',
      name:'WorkPostion',
      component:()=>import('../views/WorkPostion.vue')
    },
    {
      path:'/uploadresum',
      name:'UploadResum',
      component:()=>import('../views/UploadResum.vue')

    },
    {
      path:'/proflie',
      name:'ProFlie',
      component:()=>import('../views/ProFlie.vue')
    },

    {
      path:'/showsearch',
      name:'ShowSearch',
      component:()=>import('../views/ShowSearch.vue')
    },

    //管理员路由
    {
      path:'/admindex',
      component:()=>import('../views/AdminBackStage/Index.vue'),
      children:[
        {
          path:'',
          component:()=>import('../views/AdminBackStage/studentMan/StuInfoMan.vue')
        },
        {
          path:'/studentinfo',
          component:()=>import('../views/AdminBackStage/studentMan/StuInfoMan.vue')
        },
        {
          path:'/sturesmeinfo',
          component:()=>import('../views/AdminBackStage/studentMan/StuResmeMan.vue')
        },
        {
          path:'/companyinfo',
          component:()=>import('../views/AdminBackStage/companyMan/CompanyInfoMan.vue')
        },
        {
          path:'/postioninfo',
          component:()=>import('../views/AdminBackStage/companyMan/PostionInfoMan.vue')
        },
        {
          path:'/interviewinfo',
          component:()=>import('../views/AdminBackStage/interviewMan/InterviewInfo.vue')
        },  
      ]
    },

    //HR路由
    {
      path:'/hrindex',
      component:()=>import('../views/HrBackStage/Index.vue'),
      children:[
        {
          path:"",
          component:()=>import('../views/HrBackStage/recruit/AddRecruit.vue')
        },
        {
          path:'/addrecruitinfo',
          component:()=>import('../views/HrBackStage/recruit/AddRecruit.vue')
        },

        {
          path:'/updaterecruitinfo',
          component:()=>import('../views/HrBackStage/recruit/UpdateRecruit.vue')
        },

        {
          path:'/addcompanyinfo',
          component:()=>import('../views/HrBackStage/company/AddCompany.vue')
        },
        {
          path:'/updatecompany',
          component:()=>import('../views/HrBackStage/company/UpdateCompany.vue')
        },
        {
          path:'/checkresme',
          component:()=>import('../views/HrBackStage/resme/CheckResme.vue')
        },
        {
          path:'/interview',
          component:()=>import('../views/HrBackStage/resme/Interview.vue')
        }
      ]
    },

  ]
})

export default router
