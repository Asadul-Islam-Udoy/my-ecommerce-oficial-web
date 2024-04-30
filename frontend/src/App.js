import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './component/users/Register';
import Login from './component/users/Login';
import Footer from './component/home/Footer';
import SingleProduct from './component/singleProduct/SingleProduct';
import Adimn from './pages/Adimn';
import GetAdminProduct from './component/products/admin/GetAdminProduct';
import NotFound from './component/error/NotFound';
import GetAdminCategory from './component/categories/admin/GetAdminCategory';
import ProductCategory from './component/categories/home/ProductCategory';
import CheckOut from './component/orders/CheckOut';
import Shipping from './component/orders/Shipping';
import FinalCheck from './component/orders/FinalCheck';
import Payment from './component/orders/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import { useEffect} from 'react';
import Success from './component/orders/Success';
import AllProducts from './component/home/AllProducts';
import { useDispatch, useSelector } from 'react-redux';
import { GetSecritKeyAction } from './actions/OrderAction';
import { useAlert } from 'react-alert';
import CategoryControll from './component/admin/categories/CategoryControll';
import AdminValidated from './validation/AdminValidated';
import UserValidated from './validation/UserValidated';
import Admin__User from './component/admin/users/Admin__User';
import AdminReviews from './component/admin/reviews/AdminReviews';
import AdminOrder from './component/admin/orders/AdminOrder';
import Contact from './component/home/Contact';
function App() {
const dispatch= useDispatch();
const alert = useAlert();
const {userInfo} = useSelector(state=>state.UserLoginReducer)
const {lodding,error,secritKey} = useSelector(state=>state.getSecritKey)
useEffect(()=>{
  if(error){
   alert.error(error)
  }
 dispatch(GetSecritKeyAction())
},[dispatch])
  return (
    <div className='main'>
      <BrowserRouter>
       <div>
        <Routes>
          <Route path='*' element={<NotFound />}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/home/contact' element={<Contact/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/category/single/:slug/:id' element={<SingleProduct/>}/>
          <Route path='/category/:slug/:id' element={<ProductCategory/>}/>
          <Route path='/all/products' element={<AllProducts/>}/>
          <Route path='/search/products/:keyword' element={<AllProducts/>}/>
          {/* admin side */}
          <Route path='/admin/home' element={
             <AdminValidated useAdmin={userInfo?.user.role === 'admin'}>
                <Adimn/>
            </AdminValidated>
          }/>
           <Route path='/admin/products'  element={
             <AdminValidated useAdmin={userInfo?.user.role === 'admin'}>
               <GetAdminProduct/>
            </AdminValidated>
          }/>
            <Route path='/admin/categories'  element={
             <AdminValidated useAdmin={userInfo?.user.role === 'admin'}>
                <GetAdminCategory/>
            </AdminValidated>
          }/>
           <Route path='/admin/categories/controller' element={
             <AdminValidated useAdmin={userInfo?.user.role === 'admin'}>
                <CategoryControll/>
            </AdminValidated>
          }/>
          {/* order section */}
          <Route path='/checkout/:slug/:id' element={
             <UserValidated userAuth={userInfo?.success === true}>
                <CheckOut/>
            </UserValidated>
          }/>
             <Route path='/shipping' element={
             <UserValidated userAuth={userInfo?.success === true}>
                <Shipping/>
            </UserValidated>
          }/>
             <Route  path='/finalcheck' element={
             <UserValidated userAuth={userInfo?.success === true}>
                 <FinalCheck/>
            </UserValidated>
          }/>
            <Route   path='/payment/success' element={
             <UserValidated userAuth={userInfo?.success === true}>
                 <Success/>
            </UserValidated>
          }/>
            <Route path='/admin/users'  element={
             <AdminValidated useAdmin={userInfo?.user.role === 'admin'}>
               <Admin__User/>
            </AdminValidated>
          }/>
          <Route path='/admin/orders' element={
             <AdminValidated useAdmin={userInfo?.user.role === 'admin'}>
                <AdminOrder/>
            </AdminValidated>
          }/>
          <Route path='/admin/reviews' element={
             <AdminValidated useAdmin={userInfo?.user.role === 'admin'}>
                <AdminReviews/>
            </AdminValidated>
          }/>
         {secritKey?.paymentApiKey &&
              <Route path='/payment' element={
                <Elements stripe={loadStripe(secritKey?.paymentApiKey)}>
                   <Payment/>
                </Elements>
           }/>
         } 
        </Routes>
       </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
