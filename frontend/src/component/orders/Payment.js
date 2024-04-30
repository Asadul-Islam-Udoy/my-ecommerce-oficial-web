import React, { useState } from 'react'
import './Payment.css';
import PaymentIcon from '@mui/icons-material/Payment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Navber from '../home/Navber';
import Footer from '../home/Footer';
import {CardNumberElement,CardCvcElement,CardExpiryElement,useElements,useStripe} from '@stripe/react-stripe-js';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { OrderCreateAction } from '../../actions/OrderAction';
function Payment() {
    const [button,setButton] = useState(false)
    const alert = useAlert()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const elements = useElements();
    const stripe = useStripe('');
    const {userInfo} = useSelector(state=>state.UserLoginReducer)
    const priceInfo = JSON.parse(sessionStorage.getItem('priceInfo'));
    const{cartItems,shippingItems} = useSelector(state=>state.card)
    const order ={
        shippingInfo:shippingItems,
        itemInfo:cartItems,
        shippingPrice:priceInfo.shippingPrice,
        taxPrice:priceInfo.taxPrice,
        totalPrice:priceInfo.totalPrice
      }
      const paymentObj={
        amount:Math.round(priceInfo.totalPrice*100)
      }
    const paymentHandler=async(e)=>{
        e.preventDefault();
      setButton(true)
      try{
       const config = {headers:{'Content-Type':'application/json'}}
       const {data} = await axios.post('/api/v1/orders/payment/create',paymentObj,config)
        const client_secret = data.clientSecret
        if(!stripe || !elements) return;
        const result = await stripe.confirmCardPayment(client_secret,{
         payment_method:{
            card:elements.getElement(CardNumberElement),
            billing_details:{
                name:shippingItems.name,
                email:userInfo.user.email,
                address:{
                    line1:shippingItems.address,
                    city:shippingItems.city,
                    state:shippingItems.state,
                    country:shippingItems.country,
                    postal_code:'8737'
                  
                }
            }
         }
        })
        if(result.error){
            setButton(false);
            alert.error('payment online fail',result.error)
        }
        else{
            if(result.paymentIntent.status === 'succeeded'){
                order.orderInfo={
                 _id:result.paymentIntent.id,
                 status:result.paymentIntent.status
                }
              dispatch(OrderCreateAction(order))  
              navigate('/payment/success')
            }
            else{
                alert.error('payment fail')
            }
          
        }
      }
      catch(error){
        setButton(false)
        alert.error('somthing is wrongs!')
      }
    }
  return (
   <>
    <div><Navber/></div>
    <div className='payment__container'>
      <div className='payment__box'>
        <h3 style={{textAlign:'center'}}>Card Payment</h3>
            <form onSubmit={(e)=>paymentHandler(e)}>
            <div>
               <PaymentIcon className='payment__icon'/>
               <CardNumberElement className='payment__input'/>
            </div>
            <div>
              <CalendarMonthIcon className='payment__icon'/>
              <CardExpiryElement className='payment__input'/>
             
            </div>
            <div>
              <ExitToAppIcon className='payment__icon'/>
              <CardCvcElement className='payment__input'/>
            </div>
           
             <button disabled={button} type='submit'>${priceInfo.totalPrice}Payment</button> 
          </form>
      </div>
   </div>
   <div><Footer/></div>
   </>
  )
}

export default Payment
