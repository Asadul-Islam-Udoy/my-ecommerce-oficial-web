import React, { useEffect } from 'react'
import'./Admin_Product.css'
import { DataGrid } from '@mui/x-data-grid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { GettingAdminProductAction } from '../../../actions/ProductAction';
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
function Admin_Product({setUpdateProduct,setDeleteProduct,setProductId}) {
  const dispatch = useDispatch()
  const alert = useAlert()
  const{lodding,error,products} = useSelector(state=>state.ProductCreateReducer)

  const updateHandler =(id)=>{
        setUpdateProduct((pre)=>!pre)
        setProductId(id)
    }

    const deleteHandler =(id)=>{
        setDeleteProduct((pre)=>!pre)
        setProductId(id)
    }
   useEffect(()=>{
    if(error){
     alert.error(error)
    }
   },[alert,error])
    const columns = [
        { field: 'id', headerName: 'ID', width: 70,flex:3 },
        { field: 'name', headerName: 'Product Name', width: 130,flex:3 },
        { field: 'description', headerName: 'Description', width: 180,flex:4 },
        {
          field: 'price',
          headerName: 'Price',
          type: 'number',
          width: 90,
          flex:2
        },
        {
           field: 'oldPrice',
            headerName: 'Old Price',
            type: 'number',
            width: 90,
          },
          {
            field: 'priceOffer',
            headerName: 'Price Offer %',
            type: 'number',
            width: 90,
          },
        {
           field: 'color',
            headerName: 'Color',
            width: 90,
          },
          {
            field: 'width',
            headerName: 'Width',
            width: 90,
          },
          {
            field: 'height',
            headerName: 'Height',
            width: 90,
          },
          {
            field: 'image',
            headerName: 'Image',
            width: 90,
            renderCell:(params)=>{
             return(
              <>
                <div><img src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${params.row.image}`}/></div>
              </>
             )
              
             
            }
          },
          {
            field: 'stock',
            headerName: 'Stock',
            type:'number',
            width: 90,
          },
          {
            field: 'rating',
            headerName: 'Rating',
            width: 90,
            type:'number'
          },
          {
            field: 'size',
            headerName: 'Size',
            width: 90,
            type:'number'
          },
          {
            field: 'action',
            headerName: 'Action',
            width: 90,
            renderCell:(props)=>{
            return(
               <>
                <div title='edit' style={{margin:'10px',cursor:'pointer',color:'yellow'}}>
                    <BorderColorIcon onClick={()=>updateHandler(props.row.id)}/>
                </div>
                <div title='delete' style={{margin:'10px',cursor:'pointer',color:'red'}}>
                  <RestoreFromTrashIcon onClick={()=>deleteHandler(props.row.id)}/>  
                </div>
               </>
            )
            }
          },
       
      ];
      
      const rows = []
      products?.map(item => {
        rows.push({
         id:item._id,
         name:item.name,
         height:item.height,
         width:item.width,
         priceOffer:item.offer,
         color:item.colors,
         stock:item.stock,
         description:item.description,
         size:item.sizes,
         oldPrice:item.oldPrice,
         rating:item.ratings,
         price:item.price,
         image:item.productImages[0]?.image
        })
      });
      useEffect(()=>{
        dispatch(GettingAdminProductAction())
    },[])
  return (
    
    <>
    <div className='user__table__section'>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        style={{height:'400px',backgroundColor:'gray',marginTop:'-20px'}}
      />
    </div>
    </>
  )
}

export default Admin_Product
