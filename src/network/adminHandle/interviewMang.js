import {https} from  '../request'

export function showInterviewInfo(){
    return https({
        url:'/api/showdeliveryinfo_admin',
    })
}