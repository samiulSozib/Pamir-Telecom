import axios from "axios";
import { base_url } from '../../utils/constant';
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

export const confirmPin = (pin, bundle_id,rechargeble_account) => {
    return async (dispatch) => {
        dispatch({ type: CONFIRM_PIN_REQUEST });

        try {
            const token = localStorage.getItem('token');
            const confirm_pin_url = `${base_url}/confirm_pin?pin=${pin}`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.get(confirm_pin_url, config);
            const message = response.data.message;

            console.log(response)
            dispatch({ type: CONFIRM_PIN_SUCCESS, payload: message });
            

            dispatch(placeOrder(bundle_id, rechargeble_account));

        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : "An error occurred";
            dispatch({ type: CONFIRM_PIN_FAIL, payload: errorMessage });
        }
    };
};

export const placeOrder = (bundle_id, rechargeble_account) => {
    return async (dispatch) => {
        dispatch({ type: PLACE_ORDER_REQUEST });

        try {
            const token = localStorage.getItem('token');
            const place_order_url = `${base_url}/place_order`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const body = {
                bundle_id: bundle_id,
                rechargeble_account: rechargeble_account
            };
            const response = await axios.post(place_order_url, body, config);
            const message = response.data.message;
            console.log(response)

            dispatch({ type: PLACE_ORDER_SUCCESS, payload: message });

            

        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : "An error occurred";
            dispatch({ type: PLACE_ORDER_FAIL, payload: errorMessage });
            
        }
    };
};



export const clearMessages = () => ({
    type: CLEAR,
  });