import { 
    SERVICE_LIST_REQUEST, 
    SERVICE_LIST_SUCCESS, 
    SERVICE_LIST_FAIL } from "../constants/serviceConstant";


const initialState={
    serviceList:[],
    error:null ,
    loading:false,
    
}

const serviceListReducer=(state=initialState,action)=>{

    switch(action.type){
        case SERVICE_LIST_REQUEST:
            return {...state,loading:true}
        case SERVICE_LIST_SUCCESS:
            return {...state,loading:false,serviceList:action.payload.services}
        case SERVICE_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}

export default serviceListReducer