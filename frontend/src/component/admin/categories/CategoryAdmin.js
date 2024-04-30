import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { useDispatch, useSelector } from 'react-redux';
function CategoryAdmin({setCategoryDelete,setCategoryId,setName}) {
  const dispatch = useDispatch();
  const {lodding,error,categories} = useSelector(state=>state.categoryStore)
    const updateHandler =(id)=>{
        // setUpdateProduct((pre)=>!pre)
        // setProductId(id)
    }

    const deleteHandler =(id,name)=>{
      setCategoryId(id)
      setName(name)
      setCategoryDelete(true)
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 120 ,flex:2},
        { field: 'name', headerName: 'Category Name', width: 130, flex:3},
        { field: 'parentName', headerName: 'parent Name', width: 180,flex:3 },
        {
          field: 'slug',
          headerName: 'Slug',
          width: 120,
          flex:2
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 120,
            flex:1,
            renderCell:(props)=>{
            return(
               <>
                <div title='edit' style={{margin:'10px',cursor:'pointer',color:'yellow'}}>
                    <BorderColorIcon onClick={()=>updateHandler(props.row.id)}/>
                </div>
                <div title='delete' style={{margin:'10px',cursor:'pointer',color:'red'}}>
                  <RestoreFromTrashIcon onClick={()=>deleteHandler(props.row.id,props.row.name)}/>  
                </div>
               </>
            )
            }
          },
       
      ];
      
       const rows = []
       categories?.map((item)=>{
        rows.push({
          id:item._id,
          name:item.name,
          slug:item.slug,
          parentName:item.parentName
        })
       })
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

export default CategoryAdmin
