import {signIn} from '../services/auth'
import {sendPostRequestToServer1} from '../services/sendPostRequestToServer'
import {AsyncStorage} from 'react-native'
import {linkBatch} from '../constants/DeptMap'
export const performSignIn=(payload,type)=>{
  return  (dispatch)=>{
    return new Promise(async (resolve,reject)=>{
      let url=''
      if (type==='student')
      url='student/login'
      if(type==='teacher')
      url='professor/login'
      let token=await signIn(payload,url)
      if(token.token){
      await AsyncStorage.setItem('userToken',token.token);
      await AsyncStorage.setItem('userId',token.user);
      await AsyncStorage.setItem('mode',type);
       resolve()
      }
       else{
        reject(new Error(token.message))
       }
    })
  }  
}
export const loadDept=(deptName)=>{
  return (dispatch)=>{
    return new Promise(async (resolve,reject)=>{
    let data=await sendPostRequestToServer1({deptName:deptName},'professor/get_professor_list')
    dispatch({type:'LOAD_DEPT',payload:{key:deptName,data}})
    resolve()
   })
  }
}
export const loadAuthDetails=()=>{
    return (dispatch)=>{
      return new Promise(async (resolve,reject)=>{
       let token=await AsyncStorage.getItem('userToken');
       let id=await AsyncStorage.getItem('userId');
       let type=await AsyncStorage.getItem('mode');
       dispatch({type:'LOAD_AUTHDETAILS',payload:{token,type,id}})
       resolve()
    })
  }
}
export const loadcourses=(professorId)=>{
  return (dispatch)=>{
    return new Promise(async (resolve,reject)=>{
     dispatch({type:'LOAD_COURSES_START'})
     let data=await sendPostRequestToServer1({professorId},'professor/getcourses')
     dispatch({type:'LOAD_COURSES',payload:{data}})
     dispatch({type:'LOAD_COURSES_END'})
     resolve()
   })
  }
}
export const loadattendance=(batchid)=>{
  return (dispatch)=>{
    return new Promise(async (resolve,reject)=>{
     dispatch({type:'LOAD_ATTEND_START'})
     let data=await sendPostRequestToServer1({batchid},'professor/getstudentbybatchid')
     dispatch({type:'LOAD_ATTEND',payload:{data}})
     dispatch({type:'LOAD_ATTEND_END'})
     resolve()
   })
  }
}
export const loadscheduledclasses=(payload)=>{
   return (dispatch)=>{
    return new Promise(async (resolve,reject)=>{
     dispatch({type:'LOAD_SCHEDULED_START'})
     let data=await sendPostRequestToServer1(payload,'professor/fetchScheduledClass')
     console.log(data)
     dispatch({type:'LOAD_SCHEDULED',payload:{data}})
     dispatch({type:'LOAD_SCHEDULED_END'})
     resolve()
   })
  }
}
export const loadabsentees=(payload)=>{
  return (dispatch)=>{
   return new Promise(async (resolve,reject)=>{
    let data=await sendPostRequestToServer1(payload,'professor/fetchsabsentees')
    dispatch({type:'LOAD_ABSENTEES',payload:{data}})
    resolve()
  })
 }
}

export const loadstudentcourses=(batchId)=>{
  return (dispatch)=>{
    return new Promise(async (resolve,reject)=>{
     dispatch({type:'LOAD_STUDENT_COURSES_START'})
     let data=await sendPostRequestToServer1({batchId},'student/fetchcourses')
     dispatch({type:'LOAD_STUDENT_COURSES',payload:{data}})
     dispatch({type:'LOAD_STUDENT_COURSES_END'})
     resolve()
   })
  }
}
export const loadcoursedetails=(batchId)=>{
  return (dispatch)=>{
    return new Promise(async (resolve,reject)=>{
     dispatch({type:'LOAD_STUDENT_COURSES_START'})
     let data=await sendPostRequestToServer1({batchId},'student/fetchcourses')
     dispatch({type:'LOAD_STUDENT_COURSES',payload:{data}})
     dispatch({type:'LOAD_STUDENT_COURSES_END'})
     resolve()
   })
  }
}
export const loadprofiledetails=(id,type)=>{
  return (dispatch)=>{
    return new Promise(async (resolve,reject)=>{
     if(type=='student'){
      let data=await sendPostRequestToServer1({regNo:id},'student/fetch')
      dispatch({type:'LOAD_DETAILS_STUDENT',payload:{data}})
      resolve()
     }
     if(type=='teacher'){
      let data=await sendPostRequestToServer1({email:id},'professor/fetch')
      dispatch({type:'LOAD_DETAILS_TEACHER',payload:{data}})
      resolve()
     }
   })
  }
}
export const loadprofile=(data,type)=>{
  return (dispatch)=>{
    return new Promise(async (resolve,reject)=>{
     if(type=='student'){
      dispatch({type:'LOAD_DETAILS_STUDENT',payload:{data}})
      resolve()
     }
     if(type=='teacher'){
      dispatch({type:'LOAD_DETAILS_TEACHER',payload:{data}})
      resolve()
     }
   })
  }
}
export const loadnoticedata=(type,payload)=>{
  return (dispatch)=>{
    return new Promise(async (resolve,reject)=>{
     if(type==='student'){
      let yearmap={1:'First',2:'Second',3:'Third',4:'Final'}
      let {batchid,hostel,course,semester}=payload
      let year=yearmap[Math.ceil(semester/2)]
      let dept=linkBatch[batchid]
      let data=await sendPostRequestToServer1({course,dept,year,hostel},'student/fetchnotice')
      dispatch({type:'LOAD_NOTICEDATAS',payload:{data}})
      dispatch({type:'LOAD_NOTICEDATAS_END'})
      resolve()
     }
     if(type==='teacher'){
      let data=await sendPostRequestToServer1({dept:payload.dept},'professor/fetchnotice')
      dispatch({type:'LOAD_NOTICEDATAT',payload:{data}})
      dispatch({type:'LOAD_NOTICEDATAT_END'})
      resolve()
     }
   })
  }
}