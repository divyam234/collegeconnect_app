import {createReducer} from 'redux-starter-kit'
let initial={
    profileDetails:{},
    deptlist:{},
    courselist:{'loading':false,list:[]},
    noticelist:{loading:true,list:[]}
}
const studentReducer = createReducer(initial, {
    'LOAD_DETAILS_STUDENT' : (state, action) => {
        state.profileDetails=action.payload.data;
    },
    'LOAD_DEPT':(state,action)=>{
        state.deptlist[action.payload.key]=action.payload.data
    },
    'LOAD_STUDENT_COURSES_START' : (state, action) => {
        state.courselist.loading=true;
    },
    'LOAD_STUDENT_COURSES' : (state, action) => {
        state.courselist.list=action.payload.data;
    },
    'LOAD_STUDENT_COURSES_END' : (state, action) => {
        state.courselist.loading=false;
    },
    'LOAD_NOTICEDATAS' : (state, action) => {
        state.noticelist.list=action.payload.data;
    },
    'LOAD_NOTICEDATAS_END' : (state, action) => {
        state.noticelist.loading=false;
    }
})
export default studentReducer;