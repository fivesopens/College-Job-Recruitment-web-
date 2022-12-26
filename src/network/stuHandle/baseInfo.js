import {https} from '../request'
//查看基本信息

export function showBaseInfo(params){
    return https({
        url:'/api/showbase?userName='+ params,
    })
}


//修改基本信息
export function updateBaseInfo(data){
    return https({
        url:'/api/updatebase',
        method:'post',
        data
    })
}