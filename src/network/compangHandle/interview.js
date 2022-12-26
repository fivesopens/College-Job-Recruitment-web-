import {https} from '../request'

export function showThisInfo(params){
    return https({
        url:'/api/showthiscompany?companyName='+params,
    })
}


export function addInterview(data){
    return https({
        url:'/api/addinterview',
        method:'post',
        data
    })
}


export function showInterviewInfo(params){
    return https({
        url:'/api/showinterview?companyName='+params,
    })
}

export function employment(params){
    return https({
        url:'/api/employment?interviewId='+params,
    })
}