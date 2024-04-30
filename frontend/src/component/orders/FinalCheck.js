import React from 'react'
import'./FinalCheck.css'
import Navber from '../home/Navber'
import CheckHeader from './CheckHeader'
import Footer from '../home/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function FinalCheck() {
    const navigate = useNavigate()
    const{cartItems,shippingItems} = useSelector(state=>state.card)
    let itemPrice = 0 ;
    let taxtPrice = 0;
    cartItems.forEach(element => {
       itemPrice+=element.price*element.quantity 
    });
    let shippingPrice = itemPrice*0.18;
    let totalPrice = taxtPrice+itemPrice+shippingPrice;

    const confirmHandler=()=>{
        const data={
            shippingPrice,
            taxtPrice,
            totalPrice
        }
        sessionStorage.setItem('priceInfo',JSON.stringify(data));
        navigate('/payment')  
    }
    return (
        <>
        <div style={{marginTop:'-10px'}}>
         <Navber/>
         </div>
          <div  className='checkout__container'>
            <div>
              <CheckHeader activeState={2}/>
            <div>
            
            <div className='checkout__box__1'>
             <div className='address__section' style={{backgroundColor:'skyblue',display:'flex',justifyContent:'space-around'}}>
               <div style={{marginLeft:'0px'}}>
                  <span><b>Name</b></span>
                  <span>:</span>
                  <span>{shippingItems?.name}</span>
               </div>
               <div>
                <span><b>Mobile</b></span>
                <span>:</span>
                <span>++{shippingItems?.mobile}</span>
               </div>
               <div>
                <span><b>Address</b></span>
                <span>:</span>
                <span>{shippingItems?.city}/{shippingItems?.state}/{shippingItems?.country}</span>
               </div>
             </div>
             {cartItems?.map((item)=>(
              <div>
              <div>
                  <img src={`https://my-ecommerce-oficial-web.onrender.com/images/products/${item.productImage}`} alt={item.product}/>
                   <p>{item.name}</p>
                  <span>{item.quantity}</span>
                  <span>x</span>
                  <span>{item.price}</span>
                  <span>=</span>
                  <span><b>${item.price*item.quantity}</b></span>
               </div>
               <div className='size__width'>
             <div>
             <div>
             <span><b>width</b></span>
             <span style={{display:'none'}}>:</span>
             <span>{item.width} ft</span>
             </div>
             <div>
             <span><b>height</b></span>
             <span style={{display:'none'}}>:</span>
             <span>{item.height} ft</span>
             </div>
             <div>
             <span><b>colors</b></span>
             <span style={{display:'none'}}>:</span>
             {item.colors.map((i)=>(
               <span>{i},</span>
             ))}
           
             </div>
             <div>
             <span><b>sizes</b></span>
             <span style={{display:'none'}}>:</span>
             {item.sizes.map((i)=>(
               <span>{i},</span>
             ))}
             </div>
             </div>
             </div>
              </div>
              ))}
             </div>
             <div className='price__box__2'>
              <div>
                <div>
                 <span>Item</span>
                 <br/>
                 <span>{cartItems.length}</span>
                </div>
                <div>
                 <span>Items Price</span>
                 <br/>
                 <span>$ {itemPrice}</span>
                </div>
              </div>
              <hr/>
              <div className='price__category'>
              <div>
                  <span><b>Shippin Price</b></span>
                  <span>:</span>
                  <span>${shippingPrice}</span>
               </div>
               <div>
                <span><b>Tax</b></span>
                <span>:</span>
                <span>${taxtPrice}</span>
               </div>
               <hr/>
               <div>
                <span style={{color:'skyblue'}}><b>Total Price</b></span>
                <span>:</span>
                <span style={{color:'tomato'}}> $ {totalPrice} </span>
               </div>
              </div>
               <div>
                 <button onClick={confirmHandler}>Confirm</button>
              </div>
             </div>
            </div>
          </div>
         </div> 
         <div className='footer__class'>
            <Footer/>
         </div>
        </>
      )
}

export default FinalCheck
