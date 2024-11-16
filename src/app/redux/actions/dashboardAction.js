import axios from "axios";
import {base_url} from '../../utils/constant'
import { 
    DASHBOARD_DATA_REQUEST,
    DASHBOARD_DATA_SUCCESS,
    DASHBOARD_DATA_FAIL,
    CHANGE_PIN_REQUEST,
    CHANGE_PIN_SUCCESS,
    CHANGE_PIN_FAIL
    } from "../constants/dashboardConstant";

export const dashboardData=()=>{
    return async (dispatch)=>{
        dispatch({type:DASHBOARD_DATA_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const dashboard_data_url=`${base_url}/dashboard`

            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(dashboard_data_url,config)
            const {advertisement_sliders}=response.data.data
            const information=response.data.data
            //console.log(information)
            dispatch({type:DASHBOARD_DATA_SUCCESS,payload:{advertisement_sliders,information}})
        }catch(error){
            dispatch({type:DASHBOARD_DATA_FAIL,payload:error.message})
        }
    }
}

export const changePIN=(current_pin,new_pin)=>{
    return async (dispatch)=>{
        
        dispatch({type:CHANGE_PIN_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const change_pin_url=`${base_url}/change_pin`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'application/json'
                }
            };
            const body={
                current_pin:current_pin,
                new_pin:new_pin
            }
            const response=await axios.post(change_pin_url,body,config)
            const {message}=response.data
            // console.log(message)
            // console.log(response)
            dispatch({type:CHANGE_PIN_SUCCESS,payload:message})
        }catch(error){
            // console.log(error)
            const errorMessage=error.response.data.message
            dispatch({type:CHANGE_PIN_FAIL,payload:errorMessage})
        }
    }
}