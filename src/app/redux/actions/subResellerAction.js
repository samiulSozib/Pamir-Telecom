import axios from "axios";
import { toast } from 'react-toastify';
import {base_url} from '../../utils/constant'
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


export const getSubReseller=()=>{
    return async (dispatch)=>{
        
        dispatch({type:SUB_RESELLER_LIST_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const sub_reseller_url=`${base_url}/sub-resellers`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(sub_reseller_url,config)
            const {resellers}=response.data.data
            const total_items=response.data.payload.pagination.total
            
           
            //console.log(resellers)
            dispatch({type:SUB_RESELLER_LIST_SUCCESS,payload:{resellers,total_items}})
        }catch(error){
            dispatch({type:SUB_RESELLER_LIST_FAIL,payload:error.message})
        }
    }
}

export const addSubReseller=(formData)=>{
    return async (dispatch)=>{
        
        dispatch({type:ADD_SUB_RESELLER_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const sub_reseller_url=`${base_url}/sub-resellers`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'multipart/form-data'
                }
            };
            const response=await axios.post(sub_reseller_url,formData,config)
            const {reseller}=response.data.data
            const message=response.data.message
            
           
            //console.log(message)
            dispatch({type:ADD_SUB_RESELLER_SUCCESS,payload:{reseller,message}})
            //toast.success("Sub Reseller Add Success")
        }catch(error){
            //console.log(error)
            const errorMessage=error.response.data.message
            //toast.error(errorMessage)
            dispatch({type:ADD_SUB_RESELLER_FAIL,payload:errorMessage})
        }
    }
}


export const setSubResellerPassword = (sub_reseller_id, new_password,confirm_new_password) => {
    return async (dispatch) => {
        dispatch({ type: SET_SUB_RESELLER_PASSWORD_REQUEST });
        try {

            const token = localStorage.getItem('token');
            const setPasswordUrl = `${base_url}/sub-resellers/set-sub-reseller-password`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };
            const body={
                sub_reseller_id:sub_reseller_id,
                new_password:new_password,
                confirm_new_password:confirm_new_password
            }
            const response = await axios.post(setPasswordUrl, body, config);
            const { message } = response.data; 
            //console.log(message)
            
            dispatch({ type: SET_SUB_RESELLER_PASSWORD_SUCCESS, payload: message });
            //toast.success("Password Set Success")
        } catch (error) {
            const errorMessage=error.response.data.errors.confirm_new_password[0]
            //toast.error(errorMessage)
            dispatch({ type: SET_SUB_RESELLER_PASSWORD_FAIL, payload: errorMessage });
        }
    };
};


export const changeSubResellerBalance = (sub_reseller_id, newBalance,status_type) => {
    return async (dispatch) => {
        dispatch({ type: CHANGE_BALANCE_REQUEST });
        try {

            const token = localStorage.getItem('token');
            const changeBalanceUrl = `${base_url}/sub-reseller/transactions/credit-balance`;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };
            const body={
                sub_reseller_id:sub_reseller_id,
                amount:newBalance,
                status:status_type
            }
            //console.log(body)
            const response = await axios.post(changeBalanceUrl, body, config);
            const { message } = response.data; 
            //console.log(message)
            
            dispatch({ type: CHANGE_BALANCE_SUCCESS, payload: message });
            //toast.success(message)
        } catch (error) {
            //console.log(error)
            const errorMessage=error.response.data.message
            //toast.error(errorMessage)
            dispatch({ type: CHANGE_BALANCE_FAIL, payload: errorMessage });
        }
    };
};


export const changeSubResellerStatus=(sub_reseller_id)=>{
    return async (dispatch)=>{
        
        dispatch({type:CHANGE_SUB_RESELLER_STATUS_REQUEST})
        try{
            console.log("fdf")
            const token = localStorage.getItem('token');
            const change_status_url=`${base_url}/sub-resellers/change-sub-reseller-status/${sub_reseller_id}`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'application/json'
                }
            };
            const response=await axios.get(change_status_url,config)
            const {message}=response.data
            
           
            //console.log(sub_reseller_id)
            dispatch({type:CHANGE_SUB_RESELLER_STATUS_SUCCESS,payload:{message,sub_reseller_id}})
            //toast.success(message)
        }catch(error){
            //toast.error(error.message)
            dispatch({type:CHANGE_SUB_RESELLER_STATUS_FAIL,payload:error.message})
        }
    }
}


export const deleteSubReseller=(sub_reseller_id)=>{
    return async (dispatch)=>{
        
        dispatch({type:DELETE_SUB_RESELLER_REQUEST})
        try{
            console.log("fdf")
            const token = localStorage.getItem('token');
            const delete_url=`${base_url}/sub-resellers/${sub_reseller_id}`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` ,
                    'Content-Type': 'application/json'
                }
            };
            const response=await axios.delete(delete_url,config)
            const {message}=response.data
            
           
            //console.log(response)
            dispatch({type:DELETE_SUB_RESELLER_SUCCESS,payload:{message,sub_reseller_id}})
            //toast.success(message)
        }catch(error){
            //toast.error(error.message)
            dispatch({type:DELETE_SUB_RESELLER_FAIL,payload:error.message})
        }
    }
}


export const getSingleSubReseller=(sub_reseller_id)=>{
    return async (dispatch)=>{
        
        dispatch({type:SINGLE_SUB_RESELLER_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const single_sub_reseller_url=`${base_url}/sub-resellers/${sub_reseller_id}`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(single_sub_reseller_url,config)
            const reseller=response.data.data
            
           
            console.log(reseller)
            dispatch({type:SINGLE_SUB_RESELLER_SUCCESS,payload:{reseller}})
        }catch(error){
            dispatch({type:SINGLE_SUB_RESELLER_FAIL,payload:error.message})
        }
    }
}

export const clearMessages = () => ({
    type: CLEAR,
  });