import axios from "axios";
import { 
    ORDER_LIST_REQUEST, 
    ORDER_LIST_SUCCESS, 
    ORDER_LIST_FAIL } from "../constants/orderConstant";




export const getOrders=(page,items_per_page,filterStatus,order_type)=>{
    return async (dispatch)=>{
        
        dispatch({type:ORDER_LIST_REQUEST})
        try{
            const token = localStorage.getItem('token');
            const orders_url = `${process.env.REACT_APP_BASE_URL}/orders?page=${page}&items_per_page=${items_per_page}` +
  (filterStatus ? `&order_status=${filterStatus}` : '') +
  (order_type ? `&order_type=${order_type}`: ``);





           
            const config = {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            };
            const response=await axios.get(orders_url,config)
            const {orders}=response.data.data
            const total_items=response.data.payload.pagination.total_items
            
           
            //console.log(orders)
            dispatch({type:ORDER_LIST_SUCCESS,payload:{orders,total_items}})
        }catch(error){
            dispatch({type:ORDER_LIST_FAIL,payload:error.message})
        }
    }
}


