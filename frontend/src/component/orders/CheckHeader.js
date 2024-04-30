import React from 'react'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
function CheckHeader({activeState}) {
    const checkout = [
        {   text:'CheckOut',
            icon:<ShoppingCartCheckoutIcon/>
        },
        {   text:'Shipping',
            icon:<LocalShippingIcon/>
        },
        {   text:'Confirm',
            icon:<NoCrashIcon/>
        },
        {   text:'Payment',
            icon:<CurrencyRubleIcon/>
        },
    ]
  return (
    <>
     <div className='checkout__section'>
           {checkout.map((item,index)=>(
            <div>
                <p>{item.text}</p>
                <p style={{color:activeState >= index?'red':'gray'}}>{item.icon}</p>
            </div>
           ))}
        </div> 
    </>
  )
}

export default CheckHeader
