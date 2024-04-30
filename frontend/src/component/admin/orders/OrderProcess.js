import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
function OrderProcess() {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);
    return (
        <>
        <Modal
             open={open}
                 onClose={handleClose}
                 aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description"
               >
                 <Box className='modal__box' sx={style}>
                   <Typography style={{textAlign:'center'}} id="modal-modal-title" variant="h6" component="h2">
                     Order To The Process
                   </Typography>
                   <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className='orders__container'>
                     
                   </div>
                   </Typography>
                 </Box>
               </Modal>
        </>
       )
}

export default OrderProcess