import {https} from '../request'

//查看当前公司的信息
export function showCompanyinfoStu(params){
    return https({
        url:'/api/companyinfo_stu?companyName='+params,
    })
}



export function showRecruitinfoStu(params){
    return https({
        url:'/api/recruitinfo_stu?rescruitId='+params,
    })
}

//查询岗位消息
export function searchRecruit(params){
    return https({
        url:'/api/selectInfo?keyword='+params,
    })
}


//添加投递信息
export function delivery(data){
    return https({
        url:'/api/adddelivery',
        method:'post',
        data
    })
}


//查看面试结果
export function showInteviewRes(params){
    return https({
        url:'/api/showinterviewres?userName='+params,
    })
}