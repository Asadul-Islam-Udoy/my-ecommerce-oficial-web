import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { ProductReviewCreateAction, ResetProductAction } from '../../actions/ProductAction';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 50,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius:'4px'
  };
function ReviewCreate({productId}) {
    const alert = useAlert()
    const dispatch = useDispatch()
    const{error,isReviewCreate} = useSelector(state=>state.singleProduct)
    const[rating,setRatting] = useState(0);
    const[comment,setComment] = useState('')
    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false);
    };
    const handlerSubmit=(e)=>{
        e.preventDefault();
        const myFrom = new FormData();
        myFrom.set('rating',rating);
        myFrom.set('comment',comment);
        dispatch(ProductReviewCreateAction(productId,myFrom))
    }

    useEffect(()=>{
     if(error){
       alert.error(error);
     }
     if(isReviewCreate){
        alert.success('review upload successfully!');
        dispatch(ResetProductAction())
        setOpen(false)
     }
    },[alert,error,isReviewCreate])
    return (
        <React.Fragment>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 200 }}>
               <div>
                <form onSubmit={handlerSubmit}>
                    <div style={{padding:'3px'}}>
                      <span><Rating size='large'  name="read-only" value={rating} onChange={(e)=>setRatting(e.target.value)}/></span>
                    </div>
                    <div style={{padding:'3px'}}>
                        <input required value={comment} onChange={(e)=>setComment(e.target.value)}
                        style={{
                            padding:'3px',
                            border:'none',
                            borderBottom:'1px solid black',
                            fontStyle:'italic'
    
                        }}
                        placeholder='enter the comment..'
                        className='rating__create'
                        />
                    </div>
                    <div style={{padding:'5px'}}><button 
                    style={{
                        padding:' 6px 60px',
                        backgroundColor:'tomato',
                        border:'none',
                        fontSize:'12px',
                        fontWeight:'bold',
                        color:'white',
                        borderRadius:'2px',
                        cursor:'pointer'
                    }}
                    >Submit</button></div>
                </form>
               </div>
            </Box>
          </Modal>
        </React.Fragment>
      );
}

export default ReviewCreate
