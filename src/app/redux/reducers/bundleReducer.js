import { 
    BUNDLE_LIST_REQUEST, 
    BUNDLE_LIST_SUCCESS, 
    BUNDLE_LIST_FAIL } from "../constants/bundleConstant";


const initialState={
    bundleList:[],
    error:null ,
    loading:false,
    total_items:0
}

const bundleListReducer=(state=initialState,action)=>{

    switch(action.type){
        case BUNDLE_LIST_REQUEST:
            return {...state,loading:true}
        case BUNDLE_LIST_SUCCESS:
            return {...state,loading:false,bundleList:action.payload.bundles,total_items:action.payload.total_items}
        case BUNDLE_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}

export default bundleListReducer