import axios from "axios"
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
///create action
export const CategoryCreateAction=(fromData)=>async(dispatch)=>{
  try{
   dispatch({type:CATEGORY_CREATE_REQUEST})
   const config = {headers:{'Content-Type':'application/json'}}
   const {data} = await axios.post('https://my-ecommerce-oficial-web.onrender.com/api/v1/category/create',fromData,config)
   dispatch({type:CATEGORY_CREATE_SUCCESS,
   payload:data.categories
   })
  }
  catch(error){
    dispatch({type:CATEGORY_CREATE_FAIL,
    payload:error.response.data.message
    })
  }
}

//get action
export const CategoryGetAction=()=>async(dispatch)=>{
    try{
     dispatch({type:CATEGORY_GET_REQUEST})
     const config ={headers:{'Content-Type':'application/json'}}
     const {data} = await axios.get('https://my-ecommerce-oficial-web.onrender.com/api/v1/category/get',config)
     dispatch({type:CATEGORY_GET_SUCCESS,
     payload:data.categories
     })
    }
    catch(error){
      dispatch({type:CATEGORY_GET_FAIL,
      payload:error.response.data.message
      })
    }
  }
  export const CategoryHomeGetAction=()=>async(dispatch)=>{
    try{
     dispatch({type:CATEGORY_GET_HOME_REQUEST})
     const config ={headers:{'Content-Type':'application/json'}}
     const {data} = await axios.get('https://my-ecommerce-oficial-web.onrender.com/api/v1/category/home/get',config)
     dispatch({type:CATEGORY_GET_HOME_SUCCESS,
     payload:data.categorList
     })
    }
    catch(error){
      dispatch({type:CATEGORY_GET_HOME_FAIL,
      payload:error.response.data.message
      })
    }
  }
  //delete action
export const CategoryDeleteAction=(id)=>async(dispatch)=>{
    try{
     dispatch({type:CATEGORY_DELETE_REQUEST})
     const config ={headers:{'Content-Type':'application/json'}}
     const {data} = await axios.delete(`https://my-ecommerce-oficial-web.onrender.com/api/v1/category/delete/${id}`,config)
     dispatch({type:CATEGORY_DELETE_SUCCESS,
     payload:data.categories
     })
    }
    catch(error){
      dispatch({type:CATEGORY_DELETE_FAIL,
      payload:error.response.data.message
      })
    }
  }

  //update action
  export const CategoryUpdateAction=(id,fromData)=>async(dispatch)=>{
    try{
     dispatch({type:CATEGORY_UPDATE_REQUEST})
     const config ={headers:{'Content-Type':'application/json'}}
     const {data} = await axios.put(`https://my-ecommerce-oficial-web.onrender.com/api/v1/category/update/${id}`,fromData,config)
     dispatch({type:CATEGORY_UPDATE_SUCCESS,
     payload:data.categories
     })
    }
    catch(error){
      dispatch({type:CATEGORY_UPDATE_FAIL,
      payload:error.response.data.message
      })
    }
  }
//get single category products
export const getSingleCategoryProductsAction=(categoryId,productId)=>async(dispatch)=>{
  try{
  dispatch({type:GET_SINGLE_CATEGORY_PRODUCTS_REQUEST});
  const config ={headers:{'Content-Type':'application/json'}};
  const {data} = await axios.get(`https://my-ecommerce-oficial-web.onrender.com/api/v1/category/single/category/products/${categoryId}/${productId}`,config);
  dispatch({type:GET_SINGLE_CATEGORY_PRODUCTS_SUCCESS,
  payload:data.products
  })
  }
  catch(error){
    dispatch({type:GET_SINGLE_CATEGORY_PRODUCTS_FAIL,
    payload:error.response.data.message
    })
  }
}

///home category create 
export const homeCategoryCreateAction=(id)=>async(dispatch)=>{
  try{
   dispatch({type:HOME_CATEGORY_CREATE_REQUEST})
   const config = {headers:{'Content-Type':'application/json'}};
   const{data} = await axios.put(`https://my-ecommerce-oficial-web.onrender.com/api/v1/category/home/category/create/${id}`,config);
   dispatch({type:HOME_CATEGORY_CREATE_SUCCESS,
   payload:data. categories
  })
  }
  catch(error){
   dispatch({type:HOME_CATEGORY_CREATE_FAIL,
  payload:error.response.data.message
  })
  }
}
//rest 
export const CategoryReset=()=>async(dispatch)=>{
    dispatch({type:CATEGORY_RESET})
  }
