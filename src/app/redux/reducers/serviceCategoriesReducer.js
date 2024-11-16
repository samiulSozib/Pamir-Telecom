import { SERVICE_CATEGORIES_REQUEST, SERVICE_CATEGORIES_SUCCESS, SERVICE_CATEGORIES_FAIL } from "../constants/serviceCategoriesConstant";

const initialState={
    serviceCategoryList:[],
    error:null ,
    loading:false,
    
}

const serviceCategoriesReducer=(state=initialState,action)=>{

    switch(action.type){
        case SERVICE_CATEGORIES_REQUEST:
            return {...state,loading:true}
        case SERVICE_CATEGORIES_SUCCESS:
            return {...state,loading:false,serviceCategoryList:action.payload.servicecategories}
        case SERVICE_CATEGORIES_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}

export default serviceCategoriesReducer