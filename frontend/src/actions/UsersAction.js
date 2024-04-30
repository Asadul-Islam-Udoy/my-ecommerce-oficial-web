import axios from 'axios'
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

// register create module
export const UserRegistrationAction=(fromData)=>async(dispatch)=>{
try{
    dispatch({type:REGISTER_CREATE_REQUEST})
    const{data} = await axios.post('https://my-ecommerce-oficial-web.onrender.com/api/v1/user/register/',fromData)
     dispatch({type:REGISTER_CREATE_SUCCESS,
     payload:data
    })
  }
  catch(error){
    dispatch({type:REGISTER_CREATE_FAIL,
    payload:error.response.data.message
    })
  }
}
// register otp create module
export const UserRegistrationOtpAction=(fromData)=>async(dispatch)=>{
    try{
        dispatch({type:REGISTER_OTP_REQUEST})
        const config ={headers:{'Content-Type':'application/json'}}
        const{data} = await axios.put('https://my-ecommerce-oficial-web.onrender.com/api/v1/user/is_validated/',fromData,config)
         dispatch({type:REGISTER_OTP_SUCCESS,
         payload:data
        })
      }
      catch(error){
        dispatch({type:REGISTER_OTP_FAIL,
        payload:error.response.data.message
        })
      }
    }
/// register reset module
export const register_login_ResetAction=()=>(dispatch)=>{
    dispatch({type:REGISTER_RESET})
    dispatch({type:LOGHIN_RESET})
    dispatch({type:ADMIN_PROFILE_RESET})
}

/// admin user reset
export const Admin_User_Reset=()=>(dispatch)=>{
  dispatch({type:ADMIN_USER_RESET})
}
// login create module
export const UserLoginAction=(fromData)=>async(dispatch)=>{
    try{
        dispatch({type:LOGHIN_CREATE_REQUEST})
        const config ={headers:{'Content-Type':'application/json'}}
        const{data} = await axios.post('https://my-ecommerce-oficial-web.onrender.com/api/v1/user/login/',fromData,config)
         dispatch({type:LOGHIN_CREATE_SUCCESS,
         payload:data
        })
       localStorage.setItem('userInfo',JSON.stringify(data))
      }
      catch(error){
        dispatch({type:LOGHIN_CREATE_FAIL,
        payload:error.response.data.message
        })
      }
    }
// logot  module
export const UserLogoutAction=()=>async(dispatch)=>{
        const config ={headers:{'Content-Type':'application/json'}}
        const{data} = await axios.get('https://my-ecommerce-oficial-web.onrender.com/api/v1/user/logout/',config)
         dispatch({type:LOGOUT_SUCCESS,
         payload:data
        })
       localStorage.removeItem('userInfo')
  }


// get all users  module
export const GetAllUsersAction=(id)=>async(dispatch)=>{
  try{
  dispatch({type:GET_ALL_USERS_REQUEST})
  const config ={headers:{'Content-Type':'application/json'}}
  const{data} = await axios.get(`https://my-ecommerce-oficial-web.onrender.com/api/v1/user/get/all/users/${id}`,config)
   dispatch({type:GET_ALL_USERS_SUCCESS,
   payload:data.users
  })
}
catch(error){
  dispatch({type:GET_ALL_USERS_FAIL,
  payload:error.response.data.message
  })
}
}

// update user permission module
export const PermissionUsersAction=(currentUser,roleUser,permission)=>async(dispatch)=>{
  try{
  dispatch({type:CREATE_PERMISSION_REQUEST})
  const config ={headers:{'Content-Type':'application/json'}}
  const{data} = await axios.put(`https://my-ecommerce-oficial-web.onrender.com/api/v1/user/role/update/${currentUser}/${roleUser}/`,permission,config)
   dispatch({type:CREATE_PERMISSION_SUCCESS,
   payload:data.users
  })
}
catch(error){
  dispatch({type:CREATE_PERMISSION_FAIL,
  payload:error.response.data.message
  })
}
}

// admin profile upadate module
export const AdminProfileUpdateAction=(id,fromData)=>async(dispatch)=>{
  try{
      dispatch({type:ADMIN_PROFILE_UPDATE_REQUEST})
       const{data} = await axios.put(`https://my-ecommerce-oficial-web.onrender.com/api/v1/user/admin/update/${id}/`,fromData)
       dispatch({type:ADMIN_PROFILE_UPDATE_SUCCESS,
       payload:data
      })
      localStorage.setItem('userInfo',JSON.stringify(data))
    }
    catch(error){
      dispatch({type:ADMIN_PROFILE_UPDATE_FAIL,
      payload:error.response.data.message
      })
    }
  }
