import {https} from '../request'

//查看学生信息
export function showStuinfo(){
    return https({
        url:'/api/showstuinfo',
    })
}

//删除学生信息
export function delStuInfo(data){
    return https({
        url:'/api/delstuinfo',
        method:'post',
        data
    })
}


//恢复学生信息
export function recStuInfo(data){
    return https({
        url:'/api/recstuinfo',
        method:'post',
        data
    })
}

//查看学生简历
export function showResumeinfo(params){
    return https({
        url:'/api/showresumeinfo_admin',
    })
}

//修改审核状态
export function updateCheck(data){
    return https({
        url:'/api/updateresumecheck',
        method:'post',
        data
    })
}

