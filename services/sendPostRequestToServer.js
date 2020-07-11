import {config} from '../constants/server'
const gurl=`https://${config['host']}:${config['port']}/`
export async function sendPostRequestToServer(details,url){
    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fullurl=`${gurl}${url}`
    let res=await fetch(fullurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:formBody
      })
     let data=await res.json()
     return data
}
export async function sendPostRequestToServer1(details,url){
    fullurl=`${gurl}${url}`
    let res=await fetch(fullurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(details)
      })
     let data=await res.json()
     return data
}
