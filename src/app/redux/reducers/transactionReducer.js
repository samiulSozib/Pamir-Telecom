import { 
    TRANSACTION_LIST_REQUEST, 
    TRANSACTION_LIST_SUCCESS, 
    TRANSACTION_LIST_FAIL } from "../constants/transactionConstant";


const initialState={
    transactionList:[],
    error:null ,
    loading:false,
    total_items:0
    
}

const transactionListReducer=(state=initialState,action)=>{

    switch(action.type){
        case TRANSACTION_LIST_REQUEST:
            return {...state,loading:true}
        case TRANSACTION_LIST_SUCCESS:
            return {...state,loading:false,transactionList:action.payload.reseller_balance_transactions,total_items:action.payload.total_items}
        case TRANSACTION_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}

export default transactionListReducer