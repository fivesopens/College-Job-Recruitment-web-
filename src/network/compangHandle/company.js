import {https} from '../request'

//查询企业信息
export function showCompanyInfo(params){
    return https({
        url:'/api/companyinfo?hrName='+params,
        method:'get'
    })
}


//添加企业信息
export function addCompanyInfo(data){
    return https({
        url:'/api/addcompany',
        method:'post',
        data
    })
}

export function updateCompanyInfo(data){
    return https({
        url:'/api/updatecompany',
        method:'post',
        data
    })
}

export function delCompanyInfo(params){
    return https({
        url:'/api/delcompany?id='+params,
        
    })
}


