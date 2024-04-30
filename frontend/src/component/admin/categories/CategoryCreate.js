import React, { useEffect, useState } from 'react'
import './CategoryCreate.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert} from 'react-alert'
import { CategoryCreateAction, CategoryReset } from '../../../actions/CategoryAction';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function CategoryCreate({setCategoryCreate}) {
  const alert = useAlert()
  const dispatch = useDispatch()
  const[name,setName] = useState('');
  const[parentId,setParentId]  = useState('');
  const {lodding,error,categories,isCreate} = useSelector(state=>state.categoryStore)
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const createHandler=(e)=>{
    e.preventDefault();
    const myFrom = new FormData();
    myFrom.set('name',name);
    myFrom.set('parentId',parentId)
    dispatch(CategoryCreateAction(myFrom))
  }

  useEffect(()=>{
   if(error){
    alert.error(error)
   }
   if(isCreate){
    alert.success('category create successfully!')
    setCategoryCreate(false)
   }
   dispatch(CategoryReset())
  },[dispatch,error,alert,isCreate])
    return (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className='modal__boxs' sx={style}>
              <Typography style={{textAlign:'center'}} id="modal-modal-title" variant="h6" component="h2">
                Add To The Category
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className='category__container'>
                 <div>
                    <form onSubmit={createHandler}>
                        <div style={{
                            padding:'5px'
                        }} >
                            <label>Category Name</label>
                            <input style={{
                                padding:'5px 4px',
                                width:'90%'
                            }} type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='enter the category name..'/>
                        </div>
                        <div  style={{
                            padding:'5px',
                            display:'flex',
                            flexDirection:'column'
                        }}>
                            <label>Select Parent Category</label>
                            <select value={parentId} onChange={(e)=>setParentId(e.target.value)} style={{
                                padding:'5px 6px',
                                width:'95%' }}>
                                <option>select parent Category</option>
                              {
                                categories?.map((item)=>(
                                  <option value={item._id}>
                                    {item.name}
                                  </option>
                                ))
                              }
                            </select>
                        </div>
                        <div
                         style={{
                            padding:'5px',
                            display:'flex',
                            justifyContent:'flex-end',
                            marginRight:'18px'
                        }}
                        >
                            <button style={{
                                width:'50%',
                                padding:'5px',
                                fontWeight:'400',

                            }}>Add</button>
                        </div>
                    </form>
                </div>
              </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      );
}

export default CategoryCreate
