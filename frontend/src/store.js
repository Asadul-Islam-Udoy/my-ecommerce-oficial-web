import {legacy_createStore as createStore,combineReducers,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {thunk} from 'redux-thunk'
import { AdminProfileReducer, AllUsersReducer, LoginReducer, RegisterReducer } from './reducers/UsersReducers'
import { OffeerProductsReducer, ProductCreateReducer, SingleProductReducer, categoryProductReducer, getAllProductsReducer, homeBannerProductReducer, homeCategoryProductReducer, homeUniqueProductReducer } from './reducers/ProductReducer'
import { CategoryReducer, getHomeCategoryReducer, getSingleCategoryProducts } from './reducers/CategoryReducer'
import { AddToCardReducer, AllOrdersReducter, GetSecritKeyReducter, OrderCreatReducter } from './reducers/OrderReducer'

const reducer = combineReducers({
userRegisterReducer : RegisterReducer,
UserLoginReducer: LoginReducer,
ProductCreateReducer : ProductCreateReducer,
//id
singleProduct : SingleProductReducer,
categoryStore : CategoryReducer,
homeCategoryStore : getHomeCategoryReducer,
homeUniqueProductStore:homeUniqueProductReducer,
//slug
categoryBasicProduct:categoryProductReducer,
singleCategoryProducts:getSingleCategoryProducts,
homecategoryStore:homeCategoryProductReducer,
//card
card:AddToCardReducer,
//order 
orderCreate:OrderCreatReducter,
//get all products
getAllProducts:getAllProductsReducer,
//secrit key
getSecritKey : GetSecritKeyReducter,
//offer product 
offerProductStore:OffeerProductsReducer,
///ALL USER
getAllUserStore:AllUsersReducer,
///banner
bannerStore:homeBannerProductReducer,
//admin profile update
adminProfileStore:AdminProfileReducer,
///ordersall
allOrdersStore:AllOrdersReducter,
})
const userIn = localStorage.getItem('userInfo')?
JSON.parse(localStorage.getItem('userInfo')):null

const cardI = localStorage.getItem('cartItems')?
JSON.parse(localStorage.getItem('cartItems')):[]
const shipping = localStorage.getItem('shippingItems')?
JSON.parse(localStorage.getItem('shippingItems')):{}
const initialState = {
 UserLoginReducer:{userInfo:userIn},
 card:{
    cartItems:cardI,
    shippingItems:shipping
}
}
const middleware = [thunk]
const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store