import React, { useEffect, useState } from 'react'
import './Navber.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogoutAction } from '../../actions/UsersAction';
import { CategoryHomeGetAction } from '../../actions/CategoryAction';
function Navber() {
    const[keyword,setKeyword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state=>state.UserLoginReducer)
    const{lodding,error,homeCategories} = useSelector(state=>state.homeCategoryStore)
    const[categoriBox,setCategoriBox] = useState(false)
    
    const loginHandler=()=>{
       navigate('/login')
    }
   const logoutHandler=()=>{
     dispatch(UserLogoutAction())
   }

 function navberColor(len){
   var text = '';
   var charset = 'ABCDEF1234567890'
   for(let i=0; i<len; i++)
    text += charset.charAt(Math.floor(Math.random()*charset.length))
   return text
 }
 useEffect(()=>{
    const timers = setInterval(()=>{
        navberColor(6)
     },1000)
 },[navberColor])

 useEffect(()=>{
  dispatch(CategoryHomeGetAction())
 },[dispatch])
 const homeCategory=(Categories)=>{
  let categoryList=[]
for(let element of Categories){
 categoryList.push(
  <li className='category__list' key={element.name}>
  {element.parentId ?<Link to={`/category/${element.slug}/${element._id}`}>{element.name}</Link>:
  <span>{element.name}<ArrowRightIcon style={{
    fontSize:'18px'
  }}/>
  </span>
  }
  {element.children.length > 0? (<ul>{homeCategory(element.children)}</ul>):''}
</li>
 )
 };
 return categoryList
}
 const searchHandler=()=>{
  if(keyword.trim){
    navigate(`/search/products/${keyword}`)
  }
 }
 const contackHandler=()=>{
  navigate('/home/contact')
 }
  return (
    // style={{backgroundColor:`#${navberColor(6)}`}} 
    <>
     <div className='navbar__cantainer'>
       <div className='left__navbar'>
        <Link to='/'><img src='https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/11e0719e75e67bbeafcfce50b1b0ceb4.svg' alt='im'/></Link>
       </div>
       <div className='center__navbar'>
         <p className='all__icons' onClick={()=>setCategoriBox((pre)=>!pre)}><span  className='all__icon'/>All</p>
         {categoriBox ?
         <div class="category__section">
            <div class="category__section__box">
              <div style={{
                width:'100%',
                textAlign:'center',
                padding:'5px',
                backgroundColor:'black',
                color:'white',
                borderRadius:'2px',
                fontWeight:'500'
                }}>
                <Link style={{color:'white'}} to='/all/products'>All Products</Link>
              </div>
             {homeCategories.length > 0 && <ul>{homeCategory(homeCategories)}</ul>}
             </div>
         </div>:''
         }
         <input type='text' onChange={(e)=>setKeyword(e.target.value)} placeholder='Search...'/>
         <p><TroubleshootIcon onClick={searchHandler} className='search__icon'/></p>
       </div>
        <div className='right__navbar'>
            <div className='right__left__navbar dropdown'>
              <div className='border__box'>
              <span> sign in &</span>
               <br/>
               <span>Accounts Lists</span>
              </div>
             <div class="">
                 <div class="dropdown-content">
                  <div  className='dropdown-content__top'>
                    {userInfo !== null?
                   <button onClick={logoutHandler}>logout now</button>
                    :
                    <button onClick={loginHandler}>Sign In</button>
                     }
                    <p>New customer?<Link to='/register'>Start here</Link></p>
                    <p><Link to='/admin/home'>Dashboard</Link></p>
                  </div>
              </div>
            </div>
          </div>
           <div onClick={contackHandler} className='right__center__navbar'>
               <span>Returns &</span>
               <br/>
               <span>Contact</span>
            </div>
            <div className='right__right__navbar'>
             <Link to='/checkout/product/items'>
               <span><ShoppingCartIcon className='card__icon'/><span className='light__icon'>0</span></span>
                 <br/>
                 <span>Card</span>
             </Link>
            </div>
       </div>
     </div> 
    </>
  )
}

export default Navber
