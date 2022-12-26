

 export function cHangeDate(date){
    const d = new Date(date)
    const resDate = d.getFullYear() + '-' + p((d.getMonth() + 1)) + '-' + p(d.getDate())
    return resDate
}


export function changeDate(){
    const d = new Date()
    let getDate =d.getFullYear() + '-' + p((d.getMonth() + 1)) + '-' + p(d.getDate())
    return getDate
}

export function timeFormatConvert(date) {
     const d = new Date(date)
     const resDate = d.getFullYear() + '-' + p((d.getMonth() + 1)) + '-' + p(d.getDate())+'  ' + p(d.getHours()) +':'+p(d.getMinutes())
     return resDate
}

 function p (s){
    return s < 10 ? '0' + s : s
}


