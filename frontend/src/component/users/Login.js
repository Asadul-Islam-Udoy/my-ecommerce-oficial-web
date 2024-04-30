import React, { useEffect, useState } from 'react'
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserLoginAction, register_login_ResetAction } from '../../actions/UsersAction';
import { useAlert } from 'react-alert';
function Login() {
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {error,isLogin} = useSelector(state=>state.UserLoginReducer)
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[showForgetEmail,setshowForgetEmail] = useState(false)
    const[otp,setOtp] = useState("")
    const[showOtp,setShowOtp] = useState(false)

     const loginHandler=(e)=>{
     e.preventDefault();
     const myFrom = new FormData()
     myFrom.set('email',email)
     myFrom.set('password',password)
     dispatch(UserLoginAction(myFrom))
    }

    const forgetEmailHandler=(e)=>{
    
    }
    useEffect(()=>{
        if(error){
            alert.error(error)
        }
        if(isLogin){
            alert.success('login is successfully!')
            navigate('/')
        }
        dispatch(register_login_ResetAction())
    },[dispatch,navigate,error,alert,isLogin])
    return (
        <>
          <div className='register__container'>
             <div className='register__box'>
              <img src='https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/11e0719e75e67bbeafcfce50b1b0ceb4.svg' alt='im'/> 
              {showOtp?
                   <form className='register__from' onSubmit={forgetEmailHandler}>
                   <div>
                      <label>otp</label>
                      <div>
                        <EmailIcon className='register__icon' />
                        <input type='text' value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder='otp...'/>
                      </div>
                   </div>
                   <button type='submit'>Submit</button>
                 </form>:
                showForgetEmail ?
                <form className='register__from' onSubmit={forgetEmailHandler}>
                <div>
                   <label>old email</label>
                   <div>
                     <EmailIcon className='register__icon' />
                     <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email...'/>
                   </div>
                </div>
                <button type='submit'>Submit</button>
              </form>:
               <form className='register__from' onSubmit={loginHandler}>
                 <div>
                    <label>email</label>
                    <div>
                      <EmailIcon className='register__icon' />
                      <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email...'/>
                    </div>
                 </div>
                 <div>
                    <label>password</label>
                    <div>
                      <EnhancedEncryptionIcon className='register__icon' />
                      <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password...'/>
                    </div>
                 </div>
                 <p  className='forget__section'><KeyIcon  className='forget__key'/><Link onClick={()=>setshowForgetEmail((pre)=>!pre)}>forget password</Link></p>
                 <button type='submit'>Login</button>
               </form>
               
            }
             </div>
          </div>
        </>
      )
}

export default Login
