import {
     ADD_TO_CARD_FAIL,
     ADD_TO_CARD_REQUEST, 
     ADD_TO_CARD_SUCCESS,
     ADD_TO_DELETE_ITEM,
     ADD_TO_SHIPPING_ITEM,
     ORDER_CREATE_REQUEST,
     ORDER_CREATE_SUCCESS,
     ORDER_CREATE_FAIL,
     GET_SECRIT_KEY_REQUEST,
     GET_SECRIT_KEY_SUCCESS,
     GET_SECRIT_KEY_FAIL,
     GET_ALL_USER_ORDER_REQUEST,
     GET_ALL_USER_ORDER_SUCCESS,
     GET_ALL_USER_ORDER_FAIL,
     ORDER_STATUS_UPDATE_USER_REQUEST,
     ORDER_STATUS_UPDATE_USER_SUCCESS,
     ORDER_STATUS_UPDATE_USER_FAIL,
     ORDER_STATUS_UPDATE_USER_RESET
     } from "../constances/OrderConstance";
export const AddToCardReducer=(state={cartItems:[],shippingItems:{}},action)=>{
  
    switch(action.type){
    case ADD_TO_CARD_REQUEST:
        return{
         ...state,
        lodding:true
        }
    case ADD_TO_CARD_SUCCESS:
        const item = action.payload;
        const existing = state.cartItems.find((i)=>i.product === item.product);
        if(existing){
            return{
             ...state,
             cartItems:state.cartItems.map((i)=> i.product === existing.product?item:i)
            }
        }
        else{
           return{
            ...state,
            cartItems:[...state.cartItems,item]
           }
        }
    case ADD_TO_DELETE_ITEM:
        return{
            cartItems:state.cartItems.filter((item)=>item.product !== action.payload)
        }
    case ADD_TO_SHIPPING_ITEM:
        return{
            ...state,
            shippingItems:action.payload
        }
    case ADD_TO_CARD_FAIL:
        return{
            lodding:false,
            error:action.payload
        }
    default:
        return state
  } 
}

export const OrderCreatReducter =(state={},action)=>{
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return{
                ...state,
                lodding:true
            }
        case ORDER_CREATE_SUCCESS:
            return{
                lodding:false,
                isCreatOrder:true
            }
        case ORDER_CREATE_FAIL:
            return{
                lodding:false,
                error:action.payload
            }
        default:
            return state
    }
}

///get secritkey
export const GetSecritKeyReducter =(state={secritKey:{}},action)=>{
    switch(action.type){
        case GET_SECRIT_KEY_REQUEST:
            return{
                ...state,
                lodding:true
            }
        case GET_SECRIT_KEY_SUCCESS:
            return{
                lodding:false,
                secritKey:action.payload
            }
        case GET_SECRIT_KEY_FAIL:
            return{
                lodding:false,
                error:action.payload
            }
        default:
            return state
    }
}

///get orders
export const AllOrdersReducter =(state={allOrders:[]},action)=>{
    switch(action.type){
        case GET_ALL_USER_ORDER_REQUEST:
            case ORDER_STATUS_UPDATE_USER_REQUEST:
            return{
                ...state,
                lodding:true,
                isOrderStatus:false,
            }
        case GET_ALL_USER_ORDER_SUCCESS:
            return{
                ...state,
                lodding:false,
                allOrders:action.payload
            }
        case ORDER_STATUS_UPDATE_USER_SUCCESS:
            return{
                ...state,
                lodding:false,
                isOrderStatus:true,
                allOrders:action.payload
            }
        case GET_ALL_USER_ORDER_FAIL:
            case ORDER_STATUS_UPDATE_USER_FAIL:
            return{
                ...state,
                lodding:false,
                error:action.payload,
                isOrderStatus:false,
            }
        case ORDER_STATUS_UPDATE_USER_REQUEST:
            return{
                ...state,
                lodding:false,
                error:null,
                isOrderStatus:false,
            }
        default:
            return state
    }
}