import axios from "axios";
import {base_url} from '../../utils/constant'
import { SERVICE_CATEGORIES_REQUEST, SERVICE_CATEGORIES_SUCCESS, SERVICE_CATEGORIES_FAIL } from "../constants/serviceCategoriesConstant";


const service_categories_url=`${base_url}/service_categories`

export const serviceCategories=()=>{
    return async (dispatch)=>{
        
        dispatch({type:SERVICE_CATEGORIES_REQUEST})
        try{
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(service_categories_url,config)
            const {servicecategories}=response.data.data
            
           
            //console.log(servicecategories)
            dispatch({type:SERVICE_CATEGORIES_SUCCESS,payload:{servicecategories}})
        }catch(error){
            dispatch({type:SERVICE_CATEGORIES_FAIL,payload:error.message})
        }
    }
}


