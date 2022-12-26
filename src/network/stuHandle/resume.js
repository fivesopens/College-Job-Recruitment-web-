import {https} from '../request'


//添加简历信息
export function addResumeInfo(data){
    return https({
        url:'/api/addresume',
        method:'post',
        data
    })
}


//查看个人简历
export function showResumeInfo(params){
    return https({
        url:'/api/showresuminfo?userName='+ params,
    })
}

//修改简历信息
export function updateResumeInfo(data){
    return https({
        url:'/api/updateresuminfo',
        method:'post',
        data
    })
}