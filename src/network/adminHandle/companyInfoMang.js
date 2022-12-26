import {https} from '../request' 

//查看公司信息
export function showCompanyinfo(){
    return https({
        url:'/api/showcompany_admin',
    })
}


//修改审核状态
export function updateCompanyCheck(data){
    return https({
        url:'/api/updatecompanycheck',
        method:'post',
        data
    })
}


//查看招聘信息
export function showRecruitinfo(){
    return https({
        url:'/api/showrrecruitinfo_admin',
    })
}


//修改招聘审核状态
export function updateRecruitCheck(data){
    return https({
        url:'/api/updaterecruitcheck',
        method:'post',
        data
    })
}