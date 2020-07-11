import {createReducer} from 'redux-starter-kit'
let initial={
    token:null,
    type:null,
    id:null
}
const authReducer = createReducer(initial, {
    'LOAD_AUTHDETAILS' : (state, action) => {
        let {token,type,id}=action.payload
        state.token=token;
        state.type=type;
        state.id=id;
    }
})
export default authReducer;