import { 
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST, 
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_GET_FAIL,
    CATEGORY_GET_REQUEST,
    CATEGORY_GET_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_DELETE_REQUEST ,
    CATEGORY_UPDATE_FAIL,
    CATEGORY_UPDATE_SUCCESS,
    CATEGORY_UPDATE_REQUEST,
    CATEGORY_GET_HOME_REQUEST,
    CATEGORY_GET_HOME_SUCCESS,
    CATEGORY_GET_HOME_FAIL,
    GET_SINGLE_CATEGORY_PRODUCTS_SUCCESS,
    GET_SINGLE_CATEGORY_PRODUCTS_FAIL,
    GET_SINGLE_CATEGORY_PRODUCTS_REQUEST,
    HOME_CATEGORY_CREATE_REQUEST,
    HOME_CATEGORY_CREATE_FAIL,
    HOME_CATEGORY_CREATE_SUCCESS,
    CATEGORY_RESET
 } from "../constances/CategoryConstance"
 export const CategoryReducer = (state={categories:[]},action)=>{
    switch(action.type){
        case CATEGORY_CREATE_REQUEST:
            case CATEGORY_GET_REQUEST:
                case CATEGORY_DELETE_REQUEST:
                    case CATEGORY_UPDATE_REQUEST:
                        case HOME_CATEGORY_CREATE_REQUEST:
            return {
                ...state,
                lodding:true,
                isCreate:false,
                isDelete:false,
                isUpdate:false,
                isHomeCategory:false
            }
        case CATEGORY_CREATE_SUCCESS:
            return{
                ...state,
                lodding:false,
                isCreate:true,
                categories:action.payload
            }
        case HOME_CATEGORY_CREATE_SUCCESS:
            return{
                ...state,
                isHomeCategory:true,
                categories:action.payload
            }
        case CATEGORY_DELETE_SUCCESS:
            return{
                ...state,
                lodding:false,
                isUpdate:true,
                categories:action.payload
            }
        case CATEGORY_UPDATE_SUCCESS:
            return{
                ...state,
                lodding:false,
                isCreate:true,
                categories:action.payload
            }
        case CATEGORY_GET_SUCCESS:
            return{
                ...state,
                lodding:false,
                categories:action.payload
            }
        case CATEGORY_CREATE_FAIL:
            case CATEGORY_GET_FAIL:
                case CATEGORY_DELETE_FAIL:
                    case CATEGORY_UPDATE_FAIL:
                        case HOME_CATEGORY_CREATE_FAIL:
            return{
                ...state,
                lodding:false,
                isCreate:false,
                isDelete:false,
                isUpdate:false,
                isHomeCategory:false,
                error:action.payload
            }
        case CATEGORY_RESET:
            return{
                ...state,
                isCreate:false,
                isDelete:false,
                isUpdate:false,
                lodding:false,
                isHomeCategory:false,
                error:null
            }
        default:
            return state
    }
 }

 export const getHomeCategoryReducer=(state={homeCategories:[]},action)=>{
    switch(action.type){
        case CATEGORY_GET_HOME_REQUEST:
            return{
                ...state,
                lodding:true,
            }
        case CATEGORY_GET_HOME_SUCCESS:
            return{
                ...state,
                lodding:false,
                homeCategories:action.payload
            }
        case CATEGORY_GET_HOME_FAIL:
            return{
                ...state,
                lodding:false,
                error:action.payload
            }
        default :
         return state
    }
 }

export const getSingleCategoryProducts=(state={singleProducts:[]},action)=>{
    switch(action.type){
        case GET_SINGLE_CATEGORY_PRODUCTS_REQUEST:
            return{
                ...state,
                lodding:true
            }
        case GET_SINGLE_CATEGORY_PRODUCTS_SUCCESS:
            return{
                ...state,
                lodding:false,
                singleProducts:action.payload
            }
        case GET_SINGLE_CATEGORY_PRODUCTS_FAIL:
            return{
                ...state,
                lodding:false,
                error:action.payload
            }
        default:
            return state
    }
}