const initialAuthState={
    loading:false,
    isAuthenticated:!!localStorage.getItem("token"),
    user_info:JSON.parse(localStorage.getItem("user_info"))||null,
    error:"",
    signUpSuccess:false,
    token:localStorage.getItem("token")||""
}

const authReducer=(state=initialAuthState,action)=>{
    switch(action.type){
        
        case "SIGN_IN_REQUEST":
            return {...state,loading:true}

        case "SIGN_IN_SUCCESS":
            localStorage.setItem("user_info",JSON.stringify(action.payload.user_info))
            localStorage.setItem("token",action.payload.api_token)
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user_info:action.payload.user_info,
                token:action.payload.token,
                error:''
            }

        case "SIGN_IN_FAIL":
            return {
                ...state,
                loading:false,
                isAuthenticated:false,
                user_info:null,
                error:action.payload
            }
        case "LOGOUT":
            return{
                ...state,
                isAuthenticated:false,
                user_info:null,
                token:''
            }
        default:
            return state
    }
}

export default authReducer;