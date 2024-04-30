import { 
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS ,
    CREATE_PRODUCT_REST,
    GET_ADMIN_PRODUCTS_REQUEST,
    GET_ADMIN_PRODUCTS_SUCCESS,
    GET_ADMIN_PRODUCTS_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_SINGLE_FAIL,
    PRODUCT_SINGLE_SUCCESS,
    PRODUCT_SINGLE_REQUEST,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    GET_PRODUCTS_CATEGORY_REQUEST,
    GET_PRODUCTS_CATEGORY_SUCCESS,
    GET_PRODUCTS_CATEGORY_FAIL,
    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_REVIEW_RESET,
    GET_ALL_PRODUCTS_REQUEST,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ALL_PRODUCTS_FAIL,
    GET_HOME_CATEGORY_SUCCESS,
    GET_HOME_CATEGORY_REQUEST,
    GET_HOME_CATEGORY_FAIL,
    GET_OFFER_GL_PRODUCTS_FAIL,
    GET_OFFER_GL_PRODUCTS_REQUEST,
    GET_OFFER_GL_PRODUCTS_SUCCESS,
    GET_HOME_UNIQUE_PRODUCTS_SUCCESS,
    GET_HOME_UNIQUE_PRODUCTS_FAIL,
    GET_HOME_UNIQUE_PRODUCTS_REQUEST,
    CREATE_BANNER_REQUEST,
    CREATE_BANNER_SUCCESS,
    CREATE_BANNER_FAIL,
    BANNER_RESET, 
    GET_BANNER_SUCCESS,
    GET_BANNER_REQUEST,
    GET_BANNER_FAIL,
} from "../constances/ProductConstance";

export const ProductCreateReducer=(state={products:[]},action)=>{
    switch(action.type){
       case CREATE_PRODUCT_REQUEST:
         case GET_ADMIN_PRODUCTS_REQUEST:
            case PRODUCT_UPDATE_REQUEST:
                case PRODUCT_DELETE_REQUEST:
        return{
            ...state,
            lodding:true,
            isProducts:false,
            isProductUpdate:false,
            isDeleteProduct:false
        }
        case PRODUCT_UPDATE_SUCCESS:
            return{
                ...state,
                lodding:false,
                isProductUpdate:true,
                products:action.payload
            }
        
        case GET_ADMIN_PRODUCTS_SUCCESS:
            return{
                ...state,
                lodding:false,
                products:action.payload 
            }
        case CREATE_PRODUCT_SUCCESS:
            return{
                ...state,
                lodding:false,
                isProducts:true,
                products:action.payload
            }

        case PRODUCT_DELETE_SUCCESS:
            return{
                ...state,
                lodding:false,
                isDeleteProduct:true,
                products:action.payload
            }
        case CREATE_PRODUCT_FAIL:
            case GET_ADMIN_PRODUCTS_FAIL:
                case PRODUCT_UPDATE_FAIL:
                    case PRODUCT_DELETE_FAIL:
            return{
                ...state,
                lodding:false,
                isProducts:false,
                isProductUpdate:false,
                isDeleteProduct:false,
                error:action.payload
            }
        case CREATE_PRODUCT_REST:
            return{
                ...state,
                isProducts:false,
                isProductUpdate:false,
                isDeleteProduct:false,
                error:null
            }
        default:
            return state
        
    }
}

export const SingleProductReducer=(state={product:{}},action)=>{
    switch(action.type){
        case PRODUCT_SINGLE_REQUEST:
            case PRODUCT_REVIEW_CREATE_REQUEST:
            return{
                ...state,
                lodding:true,
                isReviewCreate:false
            }
        case PRODUCT_REVIEW_CREATE_SUCCESS:
            return{
                ...state,
                lodding:false,
                isReviewCreate:true,
                product:action.payload
            }
        case PRODUCT_SINGLE_SUCCESS:
            return{
                ...state,
                lodding:false,
                product:action.payload
            }
        case PRODUCT_SINGLE_FAIL:
            case PRODUCT_REVIEW_CREATE_FAIL:
            return{
                ...state,
                lodding:false,
                isReviewCreate:false,
                error:action.payload
            }
        case PRODUCT_REVIEW_RESET:
            return{
                ...state,
                isReviewCreate:false,
                error:null
            }
        default:
            return state
    }
}


///category basic product
export const categoryProductReducer=(state={products:[]},action)=>{
    switch(action.type){
       case GET_PRODUCTS_CATEGORY_REQUEST:
        return{
            ...state,
            lodding:true,
           
        }
      case GET_PRODUCTS_CATEGORY_SUCCESS:
        return{
            ...state,
            lodding:false,
            products:action.payload
        }
      case GET_PRODUCTS_CATEGORY_FAIL:
        return{
            ...state,
            lodding:false,
            error:action.payload
        }
       default : 
          return state;
    }
}

/// get all products
export const getAllProductsReducer=(state={products:[]},action)=>{
switch(action.type){
    case GET_ALL_PRODUCTS_REQUEST:
        return{
            ...state,
            lodding:true
        }
    case GET_ALL_PRODUCTS_SUCCESS:
        return{
            ...state,
            lodding:false,
            products:action.payload
        }
    case GET_ALL_PRODUCTS_FAIL:
        return{
            ...state,
            lodding:false,
            error:action.payload
        }
    default:
        return state
}
}
///category basic product
export const homeCategoryProductReducer=(state={products:[]},action)=>{
    switch(action.type){
       case GET_HOME_CATEGORY_REQUEST:
        return{
            ...state,
            lodding:true,
           
        }
      case GET_HOME_CATEGORY_SUCCESS:

        return{
            ...state,
            lodding:false,
            products:action.payload
        }
      case GET_HOME_CATEGORY_FAIL:
        return{
            ...state,
            lodding:false,
            error:action.payload
        }
       default : 
          return state;
    }
}
//offer price products
export const OffeerProductsReducer=(state={products:[]},action)=>{
    switch(action.type){
       case GET_OFFER_GL_PRODUCTS_REQUEST:
        return{
            ...state,
            lodding:true,
           
        }
      case GET_OFFER_GL_PRODUCTS_SUCCESS:

        return{
            ...state,
            lodding:false,
            products:action.payload
        }
      case GET_OFFER_GL_PRODUCTS_FAIL:
        return{
            ...state,
            lodding:false,
            error:action.payload
        }
       default : 
          return state;
    }
}

///home unique product
export const homeUniqueProductReducer=(state={products:[]},action)=>{
    switch(action.type){
       case GET_HOME_UNIQUE_PRODUCTS_REQUEST:
        return{
            ...state,
            lodding:true,
           
        }
      case GET_HOME_UNIQUE_PRODUCTS_SUCCESS:
        return{
            ...state,
            lodding:false,
            products:action.payload
        }
      case GET_HOME_UNIQUE_PRODUCTS_FAIL:
        return{
            ...state,
            lodding:false,
            error:action.payload
        }
       default : 
          return state;
    }
}

///banner home product
export const homeBannerProductReducer=(state={banners:[]},action)=>{
    switch(action.type){
       case CREATE_BANNER_REQUEST:
         case GET_BANNER_REQUEST:
        return{
            ...state,
            lodding:true,
            isBanner:false
           
        }
      case CREATE_BANNER_SUCCESS:
        return{
            ...state,
            lodding:false,
            banners:action.payload,
            isBanner:true
        }
      case GET_BANNER_SUCCESS:
        return{
            ...state,
            lodding:false,
            banners:action.payload
        }
      case CREATE_BANNER_FAIL:
        case GET_BANNER_FAIL:
        return{
            ...state,
            lodding:false,
            error:action.payload,
            isBanner:false
        }
        case BANNER_RESET:
            return{
                ...state,
                lodding:false,
                error:null,
                isBanner:false
            }
       default : 
          return state;
    }
}