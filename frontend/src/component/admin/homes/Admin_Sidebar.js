import React, { useState } from 'react'
import './Admin_Sidebar.css'
import HomeIcon from '@mui/icons-material/Home';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CategoryIcon from '@mui/icons-material/Category';
import Person4Icon from '@mui/icons-material/Person4';
import GradeIcon from '@mui/icons-material/Grade';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';
function Admin_Sidebar({sidebar}) {
    const navigate = useNavigate()
    function homeHeandler(){
        navigate('/admin/home')
    }
    function productHeandlr(){
        navigate('/admin/products')
    }
    function categoryHeandlr(){
      navigate('/admin/categories')
  }
  function usersHeandlr(){
    navigate('/admin/users')
   }
   function ordersHeandlr(){
    navigate('/admin/orders')
   }
   function reviewsHeandlr(){
    navigate('/admin/reviews')
   }
   function homeHandler(){
     navigate('/')
   }
  return (
    <>
       <div className='sidebar__container'> 
         {sidebar &&
         <div className='sidebar__box'>
         <p onClick={homeHeandler}><DashboardCustomizeIcon className='dashboard__icon'/>Dashboard</p>
         <hr/>
          <div className='sidebar__list'>
             <li onClick={homeHandler}><HomeIcon/>Home</li>
             <li onClick={productHeandlr}><ProductionQuantityLimitsIcon/>Products</li>
             <li onClick={categoryHeandlr}><CategoryIcon/>Categories</li>
             <li onClick={usersHeandlr}><Person4Icon/>Users</li>
             <li onClick={ordersHeandlr}><BookmarkBorderIcon/>Orders</li>
             <li onClick={reviewsHeandlr}><GradeIcon/>Reviews</li>
         </div>
       </div>
         }
       </div>
    </>
  )
}

export default Admin_Sidebar
