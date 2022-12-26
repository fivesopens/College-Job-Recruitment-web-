import {https} from './request'


//注册
export function register(data){
    return https({
        url:'/api/reg',
        method:'post',
        data
    })
}

//hr注册
export function registerHr(data){
    return https({
        url:'/api/reqhr',
        method:'post',
        data
    })
}


//登录

export function login(data){
    return https({
        url:'/api/login',
        method:'post',
        data
    })
}


//hr登录
export function hrLogin(data){
    return https({
        url:'/api/hrlogin',
        method:'post',
        data
    })
}
