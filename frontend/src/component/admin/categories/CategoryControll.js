import React, { useEffect, useState } from 'react'
import './CategoryControll.css';
import Checkbox from '@mui/material/Checkbox';
import Admin_Sidebar from '../homes/Admin_Sidebar'
import Admin_Headers from '../homes/Admin_Headers';
import { useDispatch, useSelector } from 'react-redux';
import Lodder from '../../lodder/Lodder';
import { CategoryGetAction, CategoryReset, homeCategoryCreateAction } from '../../../actions/CategoryAction';
import { useAlert } from 'react-alert';
import ProfileUpdate from '../profiles/ProfileUpdate';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
function CategoryControll() {
  const[profileShow ,setProfileShow] = useState(false)
  const alert = useAlert()
  const[sidebar,setSideBar] = useState(false);
  const dispatch = useDispatch()
  const {lodding,categories,error,isHomeCategory} = useSelector(state=>state.categoryStore)
  useEffect(()=>{
    if(error){
        alert.error (error)
    }
    if(isHomeCategory){
        alert.success('successfully');
        dispatch(CategoryReset()) 
    }
    dispatch(CategoryGetAction())
  },[dispatch,alert,error,isHomeCategory])

  const categoryHandler=(categoryId)=>{
    dispatch(homeCategoryCreateAction(categoryId))
  }
  return (
    <>
    {profileShow && <div><ProfileUpdate/></div>}
    <div style={{minHeight:'90vh'}}>
    <div>
       <Admin_Headers setSideBar={setSideBar} setProfileShow={setProfileShow}/>
     </div>
     <div className='controll__side__box'>
        <div style={{marginTop:'60px',position:'absolute'}}>
         <Admin_Sidebar sidebar={sidebar}/>
        </div>

         <div className='category__controller__container'>
           <div>
              <h3>Home Categoy</h3>
           </div>
           <div>
              <h3>Home Categoy</h3>
           </div>
           <div>
              <h3>Home Categoy</h3>
              {lodding && <Lodder/>}
              {categories?.map((item)=>(
                <div>
                   <Checkbox {...label} onClick={()=>categoryHandler(item._id)} defaultChecked={item.homeCategry===true} style={{color:'#d134b8'}}/>
                   <p>{item.name} </p>
                </div> 
              ))}
           </div>
        </div>
      </div>
</div>
</>
  )
}

export default CategoryControll
