import React, { useEffect, useState } from 'react'
import './GetAdminCategory.css'
import Admin_Sidebar from '../../admin/homes/Admin_Sidebar'
import Admin_Headers from '../../admin/homes/Admin_Headers'
import CategoryAdmin from '../../admin/categories/CategoryAdmin'
import CategoryCreate from '../../admin/categories/CategoryCreate';
import {useDispatch} from 'react-redux'
import { CategoryGetAction } from '../../../actions/CategoryAction'
import CategoryDelete from '../../admin/categories/CategoryDelete'
import { useNavigate } from 'react-router-dom'
import ProfileUpdate from '../../admin/profiles/ProfileUpdate'
function GetAdminCategory() {
    const[profileShow,setProfileShow] = useState(false)
    const dispatch = useDispatch()
    const[sidebar,setSideBar] = useState(false)
    const[categoryCreate,setCategoryCreate] = useState(false);
    const[categoryDelete,setCategoryDelete] = useState(false);
    const[categoryId,setCategoryId] = useState('')
    const[name,setName] = useState('')
    const navigate = useNavigate()
    const styles ={
        width:'90%',
        marginTop:'70px',
        display:'flex',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        position:'fixed',
        marginTop:'100px'
       }
    useEffect(()=>{
      dispatch(CategoryGetAction())
    },[])
    const categoryControllerHandler=()=>{
     navigate('/admin/categories/controller')
    }
    return (
    <>
     {profileShow && <div><ProfileUpdate/></div>}
    {categoryCreate && <CategoryCreate setCategoryCreate={setCategoryCreate}/>}
    {categoryDelete && <CategoryDelete categoryId={categoryId} name={name}/>}
    <div style={{minHeight:'90vh'}}>
        <div>
           <Admin_Headers setSideBar={setSideBar} setProfileShow={setProfileShow}/>
         </div>
         <div className='controll__side__box'>
            <div style={{marginTop:'60px',position:'absolute'}}>
             <Admin_Sidebar sidebar={sidebar}/>
            </div>
            <div>
              
                <div style={styles}>
                   <button
                   style={{
                    padding:'6px 30px',
                    fontWeight:'bold'
                   }}
                   onClick={categoryControllerHandler}
                   >
                    Controll</button>
                    <button
                   style={{
                    padding:'6px 30px',
                    fontWeight:'bold',
                    marginLeft:'10px'
                   }}
                   onClick={()=>setCategoryCreate((pre)=>!pre)}
                   >
                    Add</button>
                 </div>
               <div style={{marginTop:'-50px'}}>
                <CategoryAdmin setCategoryDelete={setCategoryDelete} setCategoryId={setCategoryId} setName={setName}/>
              </div>
            </div>
          </div>
    </div>
    </>
  )
}

export default GetAdminCategory
