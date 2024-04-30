import React, { useState } from 'react'
import './Admin.css'
import Admin_Headers from '../component/admin/homes/Admin_Headers'
import Admin_Sidebar from '../component/admin/homes/Admin_Sidebar'
import Title from '../component/helper/Title'
import ProfileUpdate from '../component/admin/profiles/ProfileUpdate'
import Charts from '../component/admin/chats/Charts'
function Adimn() {
 const[sidebar,setSideBar] = useState(true);
 const[profileShow,setProfileShow] = useState(false);
  return (
    <>
   {profileShow && <div><ProfileUpdate/></div>}
    <Title title='Admin Page'/>
     <div style={{minHeight:'90vh'}}>
      <div>
        <Admin_Headers setSideBar={setSideBar} setProfileShow={setProfileShow}/>
      </div>
       <div className='controll__side__box'>
         <div style={{marginTop:'60px',position:'absolute'}}>
          <Admin_Sidebar  sidebar={sidebar}/>
         </div>
         <div className='wellcame__class'>
            <Charts/>
         </div>
       </div>
     </div>
    </>
  )
}

export default Adimn
