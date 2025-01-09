import axios from "axios";
import {base_url} from '../../utils/constant'
import { LOGOUT, SIGN_IN_FAIL, SIGN_IN_REQUEST, SIGN_IN_SUCCESS } from "../constants/authConstant";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


const login_url=`${process.env.REACT_APP_BASE_URL}/login`

export const signIn=(singInInfo)=>{
    return async (dispatch)=>{
        
        dispatch({type:SIGN_IN_REQUEST})
        try{
            const response=await axios.post(login_url,singInInfo)
            console.log(response)
            const {api_token,user_info}=response.data.data
            //console.log(api_token)
            
            dispatch({type:SIGN_IN_SUCCESS,payload:{api_token,user_info}})
            Swal.fire({
                title: "Good job!",
                text: "Login Success",
                icon: "success"
              });
            
        }catch(error){
            console.log(error)
            const errorMessage=error.response.data.errors
           
            dispatch({type:SIGN_IN_FAIL,payload:errorMessage})
            Swal.fire({
                icon: "error",
                title: "Login Fail",
                text: errorMessage,
              });
            
        }
    }
}

export const logout = () => {
    return (dispatch) => {
      localStorage.removeItem('user_info');
      localStorage.removeItem('token');
      dispatch({ type: LOGOUT });
      Swal.fire({
        title: "Good job!",
        text: "Logout Success",
        icon: "success"
      });
    };
  };