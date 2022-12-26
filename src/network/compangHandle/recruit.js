import {https} from '../request'

export function showRecruitInfo(params){
    return https({
        url:'/api/recruitinfo?companyName='+params,
        method:'get'
    })
}


export function addRecruitInfo(data){
    return https({
        url:'/api/addrecruitinfo',
        method:'post',
        data
    })
}

export function showThisInfo(params){
    return https({
        url:'/api/showthis?recruitId='+ params,
    })
}

export function updataInfo(data){
    return https({
        url:'/api/updaterecruit',
        method:'post',
        data
    })
}

export function delInfo(params){
    return https({
        url:'/api/delrecruit?recruitId='+ params,
    })
}