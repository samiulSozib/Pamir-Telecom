import axios from "axios";
import {base_url} from '../../utils/constant'
import { 
    SERVICE_LIST_REQUEST, 
    SERVICE_LIST_SUCCESS, 
    SERVICE_LIST_FAIL } from "../constants/serviceConstant";




export const getServices=(service_category_id,country_id)=>{
    return async (dispatch)=>{
        
        dispatch({type:SERVICE_LIST_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const services_url=`${base_url}/services?service_category_id=${service_category_id}&country_id=${country_id}`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(services_url,config)
            const {services}=response.data.data
            
            //console.log(services)
            dispatch({type:SERVICE_LIST_SUCCESS,payload:{services}})
        }catch(error){
            dispatch({type:SERVICE_LIST_FAIL,payload:error.message})
        }
    }
}


