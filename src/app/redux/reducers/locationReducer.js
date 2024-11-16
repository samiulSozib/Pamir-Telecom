import { 
    COUNTRY_LIST_REQUEST, 
    COUNTRY_LIST_SUCCESS, 
    COUNTRY_LIST_FAIL,
    DISTRICT_LIST_REQUEST,
    DISTRICT_LIST_SUCCESS,
    DISTRICT_LIST_FAIL,
    PROVINCE_LIST_REQUEST,
    PROVINCE_LIST_SUCCESS,
    PROVINCE_LIST_FAIL,
    LANGUAGE_LIST_REQUEST,
    LANGUAGE_LIST_SUCCESS,
    LANGUAGE_LIST_FAIL
} from "../constants/locationConstant";


const initialState={
    countries:[],
    districts:[],
    provinces:[],
    languages:[],
    error:null ,
    loading:false
}

const locationReducer=(state=initialState,action)=>{

    switch(action.type){
        case COUNTRY_LIST_REQUEST:
            return {...state,loading:true}
        case COUNTRY_LIST_SUCCESS:
            return {...state,loading:false,countries:action.payload.countries}
        case COUNTRY_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        case DISTRICT_LIST_REQUEST:
            return {...state,loading:true}
        case DISTRICT_LIST_SUCCESS:
            return {...state,loading:false,districts:action.payload.districts}
        case DISTRICT_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        case PROVINCE_LIST_REQUEST:
            return {...state,loading:true}
        case PROVINCE_LIST_SUCCESS:
            return {...state,loading:false,provinces:action.payload.provinces}
        case PROVINCE_LIST_FAIL:
            return {...state,loading:false,error:action.payload}

        case LANGUAGE_LIST_REQUEST:
            return {...state,loading:true}
        case LANGUAGE_LIST_SUCCESS:
            return {...state,loading:false,languages:action.payload.languages}
        case LANGUAGE_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}

export default locationReducer