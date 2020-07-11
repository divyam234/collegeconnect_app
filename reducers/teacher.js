import {createReducer} from 'redux-starter-kit'
let initial={
    profileDetails:{},
    deptlist:{},
    courselist:{'loading':false,list:[]},
    attendancelist:{'loading':false,list:[]},
    scheduleDatelist:{'loading':false,list:[]},
    absenteeslist:{list:[]},
    noticelist:{loading:true,list:[]}
}
const teacherReducer = createReducer(initial, {
    'LOAD_DETAILS_TEACHER' : (state, action) => {
        state.profileDetails=action.payload.data;
    },
    'LOAD_COURSES_START' : (state, action) => {
        state.courselist.loading=true;
    },
    'LOAD_COURSES' : (state, action) => {
        state.courselist.list=action.payload.data;
    },
    'LOAD_COURSES_END' : (state, action) => {
        state.courselist.loading=false;
    },
    'LOAD_ATTEND_START' : (state, action) => {
        state.attendancelist.loading=true;
    },
    'LOAD_ATTEND' : (state, action) => {
        state.attendancelist.list=action.payload.data;
    },
    'LOAD_ATTEND_END' : (state, action) => {
        state.attendancelist.loading=false;
    },
    'LOAD_SCHEDULED_START' : (state, action) => {
        state.scheduleDatelist.loading=true;
    },
    'LOAD_SCHEDULED' : (state, action) => {
        state.scheduleDatelist.list=action.payload.data;
    },
    'LOAD_SCHEDULED_END' : (state, action) => {
        state.scheduleDatelist.loading=false;
    },
    'LOAD_ABSENTEES' : (state, action) => {
        state.absenteeslist.list=action.payload.data;
    },
    'LOAD_NOTICEDATAT' : (state, action) => {
        state.noticelist.list=action.payload.data;
    },
    'LOAD_NOTICEDATAT_END' : (state, action) => {
        state.noticelist.loading=false;
    }

})
export default teacherReducer;