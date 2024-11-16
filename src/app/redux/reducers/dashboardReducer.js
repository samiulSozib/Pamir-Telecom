import { 
    DASHBOARD_DATA_REQUEST,
     DASHBOARD_DATA_SUCCESS,
    DASHBOARD_DATA_FAIL,
    CHANGE_PIN_REQUEST,
    CHANGE_PIN_SUCCESS,
    CHANGE_PIN_FAIL
    } from "../constants/dashboardConstant";

const initialState={
    information:{},
    advertisement_sliders:[],
    error:null ,
    loading:false,
    changePinLoading:false,
    changePinMessage:null
}

const dashboardReducer=(state=initialState,action)=>{

    switch(action.type){
        case DASHBOARD_DATA_REQUEST:
            return {...state,loading:true}
        case DASHBOARD_DATA_SUCCESS:
            return {...state,loading:false,information:action.payload.information,advertisement_sliders:action.payload.advertisement_sliders}
        case DASHBOARD_DATA_FAIL:
            return {...state,loading:false,error:action.payload}

        case CHANGE_PIN_REQUEST:
            return {...state,changePinLoading:true}
        case CHANGE_PIN_SUCCESS:
            return {...state,changePinLoading:false,changePinMessage:action.payload}
        case CHANGE_PIN_FAIL:
            return {...state,changePinLoading:false,error:action.payload}
        default:
            return state
    }
}

export default dashboardReducer