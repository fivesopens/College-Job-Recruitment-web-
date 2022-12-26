import axios from "axios";

import router from '../router'
import qs from 'qs'
export function https(config){
    const  instance = axios.create({
        baseURL:'http://127.0.0.1:5000',
        timeout:5000
    })


    //请求拦截
    instance.interceptors.request.use(config=>{

        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.data = qs.stringify(config.data)
       
        return config

    },err=>{
        
    })


    //响应拦截
    instance.interceptors.response.use(res=>{

        return res.data

    },err=>{
       
    })

    return instance(config)

}