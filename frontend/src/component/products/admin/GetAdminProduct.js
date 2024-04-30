import React, { useState } from 'react'
import Admin_Product from '../../admin/products/Admin_Product'
import Admin_Sidebar from '../../admin/homes/Admin_Sidebar'
import Admin_Headers from '../../admin/homes/Admin_Headers'
import Product_Create from '../../admin/products/Product_Create'
import Product_Update from '../../admin/products/Product_Update'
import Product_Delete from '../../admin/products/Product_Delete'
import Admin_Product_Banner from '../../admin/products/Admin_Product_Banner'
import ProfileUpdate from '../../admin/profiles/ProfileUpdate'

function GetAdminProduct() {
    const[profileShow, setProfileShow] = useState(false)
    const[sidebar,setSideBar] = useState(false);
    const[createBanner,setCreateBannerProduct] = useState(false)
    const[createProduct,setCreateProduct]  = useState(false)
    const[updateProduct,setUpdateProduct] = useState(false)
    const[deleteProduct,setDeleteProduct] = useState(false)
    const[productId,setProductId] = useState('')
   const styles ={
    width:'90%',
    marginTop:'70px',
    display:'flex',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    position:'fixed',
    marginTop:'100px'
   }
  return (
   <>
   {profileShow && <div><ProfileUpdate/></div>}
  {createProduct &&  <Product_Create setCreateProduct={setCreateProduct}/>}
  {updateProduct && <Product_Update productId={productId} setUpdateProduct={setUpdateProduct} />}
  {deleteProduct && <Product_Delete productId={productId} setDeleteProduct={setDeleteProduct}/>}
  {createBanner && <Admin_Product_Banner setCreateBannerProduct={setCreateBannerProduct} />}
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
                    padding:'8px 30px',
                    fontWeight:'bold',
                  
                   }}
                   onClick={()=>setCreateBannerProduct((pre)=>!pre)}
                   >
                    Banner</button>
                    <button
                    style={{
                    padding:'8px 30px',
                    fontWeight:'bold',
                  
                   }}
                   onClick={()=>setCreateProduct((pre)=>!pre)}
                   >
                    Add</button>
                 </div>
               <div style={{marginTop:'-100px'}}><Admin_Product setUpdateProduct={setUpdateProduct} setDeleteProduct={setDeleteProduct} setProductId={setProductId}/></div>
            </div>
          </div>
        </div>
     </>
  )
}

export default GetAdminProduct
