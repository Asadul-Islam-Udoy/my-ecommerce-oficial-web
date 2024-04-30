import React, { useEffect, useState } from 'react'
import './Register.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAlert } from 'react-alert';
import {useDispatch, useSelector} from 'react-redux'
import { UserRegistrationAction, UserRegistrationOtpAction, register_login_ResetAction } from '../../actions/UsersAction';
import { useNavigate } from 'react-router-dom';
function Register() {
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const{error,isRegister,isRegisterOtp} = useSelector(state=>state.userRegisterReducer)
    const[username,setUserName] = useState("")
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState("")
    const[confirmPassword,setConfirmPassword] = useState("")
    const[avatar,setAvatar] = useState("")
    const[otp,setOtp] = useState('')
    const[otpshow,setOtpshow] = useState(false)

    const registerHandler =(e)=>{
    e.preventDefault();
    if(password !==confirmPassword){
      alert.error('password is not match!')
    }
    else{
    const myFrom = new FormData()
    myFrom.set('username',username) 
    myFrom.set('email',email)
    myFrom.set('password',password)
    myFrom.set('avatar',avatar)
    console.log(myFrom)
    dispatch(UserRegistrationAction(myFrom))
    }
    }
    
    const otpSubmitHandler=(e)=>{
        e.preventDefault()
        const myFrom = new FormData()
        myFrom.set('otp',otp)  
        dispatch(UserRegistrationOtpAction(myFrom))
    }
    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(register_login_ResetAction())
        }
     if(isRegister){
        alert.success('send otp your email address')
        setOtpshow(true)
        dispatch(register_login_ResetAction())
     }
     if(isRegisterOtp){
        alert.success('Email validated is success! please login now ')
        dispatch(register_login_ResetAction())
        navigate('/login')
     }
    },[dispatch,error,alert,isRegister,isRegisterOtp,navigate])
  return (
    <>
      <div className='register__container'>
         <div className='register__box'>
          <img src='https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/11e0719e75e67bbeafcfce50b1b0ceb4.svg' alt='im'/>
           {otpshow ? 
           <form className='register__from' onSubmit={otpSubmitHandler}>
             <div>
                <label>your otp</label>
                 <div>
                  <AccountCircleIcon className='register__icon'/>
                  <input type='text' value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='userotp...'/>
                 </div>
             </div>
             <button type='submit'>Submit Now</button>
           </form>
           :    <form className='register__from' onSubmit={registerHandler}>
           <div>
              <label>username</label>
               <div>
                <AccountCircleIcon className='register__icon'/>
                <input type='text' value={username} onChange={(e)=>setUserName(e.target.value)} placeholder='username...'/>
               </div>
           </div>
           <div>
              <label>email</label>
              <div>
                <EmailIcon className='register__icon' />
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email...'/>
              </div>
           </div>
           <div>
              <label>password</label>
              <div>
                <EnhancedEncryptionIcon className='register__icon' />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password...'/>
              </div>
           </div>
           <div>
              <label>confirm password</label>
              <div>
                <LockOpenIcon className='register__icon' />
                <input value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} type='password' placeholder='confrim password...'/>
              </div>
           </div>
           <div>
              <label>Avatar</label>
               <input type='file' onChange={(e)=>setAvatar(e.target.files[0])} />
           </div>
           <button type='submit'>Register</button>
         </form>
            }
         </div>
      </div>
    </>
  )
}

export default Register
