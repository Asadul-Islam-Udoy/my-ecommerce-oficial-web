import React, { useEffect, useState } from 'react'
import './Product_Create.css';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ProductDeleteAction, ResetProductAction } from '../../../actions/ProductAction';
import { useAlert } from 'react-alert';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
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

function Product_Delete({productId,setDeleteProduct}) {
const alert = useAlert()
const dispatch = useDispatch();
const{lodding,error,isDeleteProduct} = useSelector(state=>state.ProductCreateReducer);
const [open, setOpen] =useState(true);
const handleClose = () => setOpen(false);

const productDELETEHandler=(productId)=>{
dispatch(ProductDeleteAction(productId))
}
useEffect(()=>{
  if(error){
    alert.error(error)
  }
  if(isDeleteProduct){
    alert.success('product delete successfully')
  }
  dispatch(ResetProductAction())
},[dispatch,alert,error,isDeleteProduct])
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
                >product name isroe owei</p>
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
                      onClick={()=>productDELETEHandler(productId)}
                    >Yes</button>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      );
}

export default Product_Delete
