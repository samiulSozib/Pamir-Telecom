import { 
    ORDER_LIST_REQUEST, 
    ORDER_LIST_SUCCESS, 
    ORDER_LIST_FAIL } from "../constants/orderConstant";


const initialState={
    orderList:[],
    error:null ,
    loading:false,
    total_items:0
}

const orderListReducer=(state=initialState,action)=>{

    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {...state,loading:true}
        case ORDER_LIST_SUCCESS:
            return {...state,loading:false,orderList:action.payload.orders,total_items:action.payload.total_items}
        case ORDER_LIST_FAIL:
            return {...state,loading:false,error:action.payload}
        default:
            return state
    }
}

export default orderListReducer