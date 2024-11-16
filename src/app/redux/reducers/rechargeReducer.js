// reducers/rechargeReducer.js

import { 
    PLACE_ORDER_REQUEST, 
    PLACE_ORDER_SUCCESS, 
    PLACE_ORDER_FAIL,
    CONFIRM_PIN_REQUEST,
    CONFIRM_PIN_SUCCESS,
    CONFIRM_PIN_FAIL,
    RESET_RECHARGE_STATE,
    PIN_CONFIRMED,
    ORDER_PLACED,
    CLEAR
} from "../constants/rechargeConstant";

const initialState = {
    error: null,
    loading: false,
    message: null,
    pinConfirmed: false,
    orderPlaced: false,  
};

const rechargeReducer = (state = initialState, action) => {
    switch(action.type) {
        case CONFIRM_PIN_REQUEST:
        case PLACE_ORDER_REQUEST:
            return { ...state, loading: true, error: null, message: null, pinConfirmed: false, orderPlaced: false };
        
        case CONFIRM_PIN_SUCCESS:
            return { ...state, loading: false, message: action.payload, error: null, pinConfirmed: true, orderPlaced: false };
        
        case PLACE_ORDER_SUCCESS:
            return { ...state, loading: false, message: action.payload, error: null, pinConfirmed: false, orderPlaced: true };
        
        case CONFIRM_PIN_FAIL:
        case PLACE_ORDER_FAIL:
            return { ...state, loading: false, error: action.payload, message: null, pinConfirmed: false, orderPlaced: false };

        case CLEAR:
            return {
                ...state,
                error: null,
                message: null,
                loading:false,
                orderPlaced:false,
                pinConfirmed:false
            };

        default:
            return state;
    }
};

export default rechargeReducer;
