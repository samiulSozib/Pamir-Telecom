import axios from "axios";
import {base_url} from '../../utils/constant'
import { 
    BUNDLE_LIST_REQUEST, 
    BUNDLE_LIST_SUCCESS, 
    BUNDLE_LIST_FAIL } from "../constants/bundleConstant";




export const getBundles=(page,items_per_page,country_id,validity_type,company_id,service_category_id,search_tag)=>{
    return async (dispatch)=>{
        
        dispatch({type:BUNDLE_LIST_REQUEST})
        try{
            
            // console.log('country_id'+ country_id)
            // console.log('company_id'+ company_id)
            // console.log('service_category_id'+ service_category_id)

            const token = localStorage.getItem('token');

            const bundle_url=`${base_url}/bundles?page=${page}&items_per_page=${items_per_page}&country_id=${country_id}&
            validity_type=${validity_type}&company_id=${company_id}&service_category_id=${service_category_id}&search_tag=${search_tag}`            
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            
            const response=await axios.get(bundle_url,config)
            const {bundles}=response.data.data
            const total_items=response.data.payload.pagination.total_items
            //console.log(bundles)
            
            dispatch({type:BUNDLE_LIST_SUCCESS,payload:{bundles,total_items}})
        }catch(error){
            dispatch({type:BUNDLE_LIST_FAIL,payload:error.message})
        }
    }
}


