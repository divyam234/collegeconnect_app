import mime from 'react-native-mime-types'
import {config} from '../constants/server'
const gurl=`https://${config['host']}:${config['port']}/`
export async function signIn(details,url){
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
export const handleUploadPhoto = async (uri,id,url) => {
     let createFormData = (uri, body) => {
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        const data = new FormData();
        data.append('photo', {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
          });
      
        Object.keys(body).forEach(key => {
          data.append(key, body[key]);
        });
      
        return data;
      }
    try{
      const res=await fetch(`${gurl}${url}`, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
     },
      body: createFormData(uri,{id})
     })
     let data=await res.json()
      if(data.message==='success'){
        alert("Upload success!");
        return data.data
     } 
    }
     catch(error) {
      alert("Upload Failed");
    }
  };
  export const handleUploadAttachment =(body,url) => {
       const data = new FormData();
       body['files'].map((item,index)=>{
       let parts = item['name'].split('.');
       let ext=parts[parts.length - 1];
       data.append('attachment', {
            uri:item.uri,
            name: `.${ext}`,
            type:mime.lookup(ext)
      });
    })
    data.append('to', JSON.stringify(body['to']));
    data.append('main', JSON.stringify(body['main']));
    fetch(`${gurl}${url}`, {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data'
     },
      body:data
    })
      .then(response => response.json())
      .then(response => {
        console.log("upload succes", response);
        return response
      })
      .catch(error => {
        console.log("upload error", error);
        return error
      });
      
  };