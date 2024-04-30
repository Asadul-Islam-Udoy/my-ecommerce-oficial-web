import {
    REGISTER_CREATE_FAIL, 
    REGISTER_CREATE_REQUEST, 
    REGISTER_CREATE_SUCCESS ,
    REGISTER_RESET,
    REGISTER_OTP_REQUEST,
    REGISTER_OTP_SUCCESS,
    REGISTER_OTP_FAIL,
    LOGHIN_CREATE_REQUEST,
    LOGHIN_CREATE_SUCCESS,
    LOGHIN_CREATE_FAIL,
    LOGHIN_RESET,
    LOGOUT_SUCCESS,
    GET_ALL_USERS_FAIL,
    GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    CREATE_PERMISSION_REQUEST,
    CREATE_PERMISSION_SUCCESS,
    CREATE_PERMISSION_FAIL,
    ADMIN_USER_RESET,
    ADMIN_PROFILE_UPDATE_REQUEST,
    ADMIN_PROFILE_UPDATE_SUCCESS,
    ADMIN_PROFILE_UPDATE_FAIL,
    ADMIN_PROFILE_RESET
} from '../constances/UsersConstances';

export const RegisterReducer=(state={userRegister:{}},action)=>{
   switch(action.type){
    case REGISTER_CREATE_REQUEST:
        return{
            lodding:true,
            isRegister:false
        }
    case REGISTER_OTP_REQUEST:
            return{
                lodding:true,
                isRegisterOtp:false
            }
    case REGISTER_CREATE_SUCCESS:
        return{
            lodding:false,
            isRegister:true,
            userRegister:action.payload,
        }
        case REGISTER_OTP_SUCCESS:
            return{
                lodding:false,
                userRegister:action.payload,
                isRegisterOtp:true
            }
    case REGISTER_CREATE_FAIL:
        case REGISTER_OTP_FAIL:
        return{
            lodding:false,
            isRegister:false,
            error:action.payload,
            isRegisterOtp:false
        }
    case REGISTER_RESET:
        return{
           isRegister:false,
           error:null,
           isRegisterOtp :false
        }
    default :
        return state
   }
}

//login reducer
export const LoginReducer =(state={userInfo:{}},action)=>{
  switch(action.type){
    case LOGHIN_CREATE_REQUEST:
        return{
            lodding:true,
            isLogin:false,
        }
    case LOGHIN_CREATE_SUCCESS:
        return{
            ...state,
            lodding:false,
            isLogin:true,
            userInfo:action.payload
        }
    case LOGHIN_CREATE_FAIL:
        return{
            ...state,
            lodding:false,
            isLogin:false,
            error:action.payload
        }
    case LOGOUT_SUCCESS:
        return{
            userInfo:null
        }
    case LOGHIN_RESET:
        return{
            ...state,
            isLogin:false,
            error:null
        }
    default :
       return state
  }
}


//login reducer
export const AllUsersReducer =(state={allUsers:[]},action)=>{
    switch(action.type){
      case GET_ALL_USERS_REQUEST:
        case CREATE_PERMISSION_REQUEST:
          return{
              lodding:true,
              isPermission:false
          }
      case GET_ALL_USERS_SUCCESS:
          return{
              ...state,
              lodding:false,
              allUsers:action.payload
          }
      case CREATE_PERMISSION_SUCCESS:
        return{
            ...state,
            lodding:false,
            allUsers:action.payload,
            isPermission:true
        }
      case GET_ALL_USERS_FAIL:
        case CREATE_PERMISSION_FAIL:
          return{
              ...state,
              lodding:false,
              error:action.payload,
              isPermission:false
          }
      case ADMIN_USER_RESET:
        return{
            ...state,
            lodding:false,
            error:null,
            isPermission:false
        }
      default :
         return state
    }
  }
  export const AdminProfileReducer =(state={Admin:{}},action)=>{
    switch(action.type){
        case ADMIN_PROFILE_UPDATE_REQUEST:
          return{
              lodding:true,
              isAdminPrifile:false
          }
      case ADMIN_PROFILE_UPDATE_SUCCESS:
          return{
              ...state,
              lodding:false,
              Admin:action.payload,
              isAdminPrifile:true
          }
        case ADMIN_PROFILE_UPDATE_FAIL:
          return{
              ...state,
              lodding:false,
              error:action.payload,
              isAdminPrifile:false
          }
          case ADMIN_PROFILE_RESET:
            return{
                ...state,
                lodding:false,
                error:null,
                isAdminPrifile:false
            }
      default :
         return state
    }
  }