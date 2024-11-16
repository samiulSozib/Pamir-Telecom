import { 
    SUB_RESELLER_LIST_REQUEST, 
    SUB_RESELLER_LIST_SUCCESS, 
    SUB_RESELLER_LIST_FAIL,
    ADD_SUB_RESELLER_REQUEST,
    ADD_SUB_RESELLER_SUCCESS,
    ADD_SUB_RESELLER_FAIL,
    SET_SUB_RESELLER_PASSWORD_REQUEST,
    SET_SUB_RESELLER_PASSWORD_SUCCESS,
    SET_SUB_RESELLER_PASSWORD_FAIL,
    CHANGE_BALANCE_REQUEST,
    CHANGE_BALANCE_SUCCESS,
    CHANGE_BALANCE_FAIL,
    CHANGE_SUB_RESELLER_STATUS_REQUEST,
    CHANGE_SUB_RESELLER_STATUS_SUCCESS,
    CHANGE_SUB_RESELLER_STATUS_FAIL,
    DELETE_SUB_RESELLER_REQUEST,
    DELETE_SUB_RESELLER_SUCCESS,
    DELETE_SUB_RESELLER_FAIL,
    SINGLE_SUB_RESELLER_REQUEST,
    SINGLE_SUB_RESELLER_SUCCESS,
    SINGLE_SUB_RESELLER_FAIL,
    CLEAR
} from "../constants/subResellerConstant";


const initialState={
    subResellerList:[],
    error:null ,
    loading:false,
    total_items:0,
    message:null,
    singleSubReseller: null,
}

const subResellerListReducer=(state=initialState,action)=>{

    switch(action.type){
        case SUB_RESELLER_LIST_REQUEST:
            return {...state,loading:true}
        case SUB_RESELLER_LIST_SUCCESS:
            return {...state,loading:false,subResellerList:action.payload.resellers,total_items:action.payload.total_items}
        case SUB_RESELLER_LIST_FAIL:
            return {...state,loading:false,error:action.payload}

        case ADD_SUB_RESELLER_REQUEST:
            return {...state,loading:true}
        case ADD_SUB_RESELLER_SUCCESS:
            return {...state,loading:false,subResellerList:[...state.subResellerList,action.payload.reseller],message:action.payload.message}
        case ADD_SUB_RESELLER_FAIL:
            return {...state,loading:false,error:action.payload}

        case SET_SUB_RESELLER_PASSWORD_REQUEST:
            return { ...state, loading: true, message: null }; 
        case SET_SUB_RESELLER_PASSWORD_SUCCESS:
            return { ...state, loading: false, message: action.payload };
        case SET_SUB_RESELLER_PASSWORD_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CHANGE_BALANCE_REQUEST:
            return { ...state, loading: true, message: null }; 
        case CHANGE_BALANCE_SUCCESS:
            return { ...state, loading: false, message: action.payload };
        case CHANGE_BALANCE_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CHANGE_SUB_RESELLER_STATUS_REQUEST:
            return { ...state, loading: true, message: null }; 
        case CHANGE_SUB_RESELLER_STATUS_SUCCESS:
            return { ...state, loading: false, message: action.payload.message,subResellers: state.subResellerList.map((subReseller) =>
                subReseller.id === action.payload.sub_reseller_id 
                  ? { ...subReseller, status: subReseller.status === 0 ? 1 : 0 } 
                  : subReseller
              ) };
        case CHANGE_SUB_RESELLER_STATUS_FAIL:
            return { ...state, loading: false, error: action.payload };

        case DELETE_SUB_RESELLER_REQUEST:
            return { ...state, loading: true };
        case DELETE_SUB_RESELLER_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                message: action.payload.message,
                subResellerList: state.subResellerList.filter(subReseller => subReseller.id !== action.payload.sub_reseller_id) 
            };
        case DELETE_SUB_RESELLER_FAIL:
            return { ...state, loading: false, error: action.payload };

        case SINGLE_SUB_RESELLER_REQUEST:
            return { ...state, loading: true, error: null, singleSubReseller: null };
        case SINGLE_SUB_RESELLER_SUCCESS:
            return { ...state, loading: false, singleSubReseller: action.payload.reseller };
        case SINGLE_SUB_RESELLER_FAIL:
            return { ...state, loading: false, error: action.payload };

        case CLEAR:
                return {
                  ...state,
                  error: null,
                  message: null,
                  loading:false
                };
        default:
            return state

    }
}

export default subResellerListReducer