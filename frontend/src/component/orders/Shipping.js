import React, { useState } from 'react';
import './Shipping.css';
import Navber from '../home/Navber';
import CheckHeader from './CheckHeader';
import { useNavigate } from 'react-router-dom'
import Footer from '../home/Footer';
import { Country, State, City }  from 'country-state-city';
import { useDispatch } from 'react-redux';
import { ShippingCartItemAction } from '../../actions/OrderAction';
function Shipping() {
    const dispatch  = useDispatch()
    const [name,setName] = useState('')
    const[address,setAddress] = useState('')
    const[city,setCity] = useState('')
    const[state,setState] = useState('')
    const[country,setCountry] = useState('')
    const[mobile,setMobile] = useState()
    const navigate = useNavigate()
    const shappingHandler=(e)=>{
      e.preventDefault();
      dispatch(ShippingCartItemAction({name,address,city,state,country,mobile}))
      navigate('/finalcheck')
    }
  return (
    <>
    <div><Navber/></div>
    <div style={{paddingTop:'70px'}}><CheckHeader activeState={1}/></div>
      <div className='shipping__container'>
         <div className='shipping__box'>
            <form className='shipping__from' onSubmit={shappingHandler}>
                <div>
                    <div>
                        <label>Name</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder='enter the name...'/>
                    </div>
                    <div>
                        <label>Address</label>
                        <input value={address} onChange={(e)=>setAddress(e.target.value)} type='text' placeholder='enter the address...'/>
                    </div>
                </div>
                <div>
                   <div>
                        <label>City</label>
                        <input value={city} onChange={(e)=>setCity(e.target.value)} type='text' placeholder='enter the city...'/>
                    </div>
                    <div>
                        <label>Mobile</label>
                        <input value={mobile} onChange={(e)=>setMobile(e.target.value)} type='number' placeholder='enter the mobile'/>
                    </div>
                    
                </div>
                <div>
                    <div>
                        <label>Country</label>
                       <select value={country} onChange={(e)=>setCountry(e.target.value)}>
                          <option>select country</option>
                          {Country.getAllCountries().map((i)=>(
                            <option key={i.isoCode} value={i.isoCode}>{i.name}</option>
                          ))}
                       </select>
                    </div>
                    <div>
                        <label>State</label>
                        <select value={state} onChange={(e)=>setState(e.target.value)}>
                          <option>select state</option>
                          {State.getStatesOfCountry(country).map((i)=>(
                             <option key={i.isoCode} value={i.name}>{i.name}</option>
                          ))}
                       </select>
                    </div>
                   
                </div>
                <div>
                    <button type='submit'>Shipping</button>
                </div>
            </form>
         </div>
      </div>
      <div className='footer__class'>
            <Footer/>
     </div>
    </>
  )
}

export default Shipping
