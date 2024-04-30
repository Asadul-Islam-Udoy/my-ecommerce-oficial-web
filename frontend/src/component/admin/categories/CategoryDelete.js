import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CategoryDeleteAction, CategoryReset } from '../../../actions/CategoryAction';
import { useAlert } from 'react-alert';
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
function CategoryDelete({categoryId,name}) {
    const alert = useAlert()
    const {lodding,error,isDelete} = useSelector(state=>state.categoryStore)
    const [open, setOpen] =useState(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const categoryDELETEHandler = (id)=>{
     dispatch(CategoryDeleteAction(id))
    }
    useEffect(()=>{
        if(error){
            alert.error(error)
        }
        if(isDelete){
           alert.success('delete successfully')
        }
        dispatch(CategoryReset())
    },[alert,error,isDelete])
    return (
        <div>
          <Modal
          style={{
            boxShadow:'0 0 5px black',
          }}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography style={{textAlign:'center'}} id="modal-modal-title" variant="h6" component="h2">
                Delete To The Product
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <p 
                style={{fontSize:'12px',fontStyle:'italic',marginLeft:'10px'}}
                >{name}</p>
                 <div className='delete__box'
                  style={{
                    margin:'10px',
                    padding:'5px'
                  }}
                  >
                    <button
                        style={{
                            margin:'10px',
                            padding:'5px 25px',
                            fontWeight:'bold',
                            backgroundColor:'tomato',
                            border:'none',
                            borderRadius:'2px',
                            color:'white',
                            cursor:'pointer'
                          }}
                        onClick={()=>setOpen(false)}  
                    >No</button>
                    <button
                      style={{
                        margin:'10px',
                        padding:'5px 25px',
                        fontWeight:'bold',
                        backgroundColor:'green',
                        border:'none',
                        borderRadius:'2px',
                        color:'white',
                        cursor:'pointer'
                      }}
                      onClick={()=>categoryDELETEHandler(categoryId)}
                    >Yes</button>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      );
}

export default CategoryDelete
