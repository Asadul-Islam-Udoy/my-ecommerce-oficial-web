import React from 'react';
import './Success.css';
import CheckIcon from '@mui/icons-material/Check';
function Success() {
  return (
    <>
     <div className='payment__seccess__container'>
         <div>
          <CheckIcon className='success__icon'/>
          <h3>Payment is Successfull</h3>
        </div>
    </div> 
    </>
  )
}

export default Success
