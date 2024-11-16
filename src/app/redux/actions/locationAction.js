import axios from "axios";
import {base_url} from '../../utils/constant'
import { 
    COUNTRY_LIST_REQUEST, 
    COUNTRY_LIST_SUCCESS, 
    COUNTRY_LIST_FAIL,
    DISTRICT_LIST_REQUEST,
    DISTRICT_LIST_SUCCESS,
    DISTRICT_LIST_FAIL,
    PROVINCE_LIST_REQUEST,
    PROVINCE_LIST_SUCCESS,
    PROVINCE_LIST_FAIL,
    LANGUAGE_LIST_REQUEST,
    LANGUAGE_LIST_SUCCESS,
    LANGUAGE_LIST_FAIL
} from "../constants/locationConstant";

export const getCountries=()=>{
    return async (dispatch)=>{
        
        dispatch({type:COUNTRY_LIST_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const countries_url=`${base_url}/countries`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(countries_url,config)
            const {countries}=response.data.data
            
            console.log(countries)
            dispatch({type:COUNTRY_LIST_SUCCESS,payload:{countries}})
        }catch(error){
            dispatch({type:COUNTRY_LIST_FAIL,payload:error.message})
        }
    }
}


export const getDistricts=()=>{
    return async (dispatch)=>{
        
        dispatch({type:DISTRICT_LIST_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const districts_url=`${base_url}/districts`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(districts_url,config)
            const {districts}=response.data.data
            
            //console.log(districts)
            dispatch({type:DISTRICT_LIST_SUCCESS,payload:{districts}})
        }catch(error){
            dispatch({type:DISTRICT_LIST_FAIL,payload:error.message})
        }
    }
}


export const getProvinces=()=>{
    return async (dispatch)=>{
        
        dispatch({type:PROVINCE_LIST_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const provinces_url=`${base_url}/provinces`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(provinces_url,config)
            const {provinces}=response.data.data
            
            //console.log(provinces)
            dispatch({type:PROVINCE_LIST_SUCCESS,payload:{provinces}})
        }catch(error){
            dispatch({type:PROVINCE_LIST_FAIL,payload:error.message})
        }
    }
}


export const getLanguages=()=>{
    return async (dispatch)=>{
        
        dispatch({type:LANGUAGE_LIST_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const language_url=`${base_url}/languages`
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(language_url,config)
            const {languages}=response.data.data
            
            //console.log(countries)
            dispatch({type:LANGUAGE_LIST_SUCCESS,payload:{languages}})
        }catch(error){
            dispatch({type:LANGUAGE_LIST_FAIL,payload:error.message})
        }
    }
}

