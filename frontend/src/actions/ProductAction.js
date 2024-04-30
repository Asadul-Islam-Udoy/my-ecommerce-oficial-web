import axios from "axios"
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
    GET_BANNER_SUCCESS,
    GET_BANNER_REQUEST,
    GET_BANNER_FAIL,
    BANNER_RESET
} from "../constances/ProductConstance";

export const ProductCreateAction=(fromData)=>async(dispatch)=>{
    try{
      dispatch({type:CREATE_PRODUCT_REQUEST})
      const config ={headers:{'Content-Type':'application/json'}}
       const{data} = await axios.post('https://my-ecommerce-oficial-web.onrender.com/api/v1/products/create/product',fromData);
      dispatch({type:CREATE_PRODUCT_SUCCESS,
      payload:data.products
    })
    }
    catch(error){
        dispatch({type:CREATE_PRODUCT_FAIL,
         payload:error.response.data.message
        })
    }
}

///getting admin products
export const GettingAdminProductAction=()=>async(dispatch)=>{
try{
    dispatch({type:GET_ADMIN_PRODUCTS_REQUEST});
    const config = {headers:{'Content-Type':'application-json'}}
    const{data} = await axios.get('https://my-ecommerce-oficial-web.onrender.com/api/v1/products/admin/products/',config);
    dispatch({type:GET_ADMIN_PRODUCTS_SUCCESS,
    payload:data.products
    })
}
catch(error){
    dispatch({type:GET_ADMIN_PRODUCTS_FAIL,
    payload:error.response.data.message
    })
}
}

//update product
export const ProductUpdateAction=(id,fromData)=>async(dispatch)=>{
try{
  dispatch({type:PRODUCT_UPDATE_REQUEST})
  const {data} = await axios.put(`https://my-ecommerce-oficial-web.onrender.com/api/v1/products/update/product/${id}/`,fromData);
  dispatch({type:PRODUCT_UPDATE_SUCCESS,
  payload:data.products
 })
 }
 catch(error){
    dispatch({type:PRODUCT_UPDATE_FAIL,
    payload:error.response.data.message
    })
 }
}


//single product
export const ProductSingleAction=(id)=>async(dispatch)=>{
    try{
     dispatch({type:PRODUCT_SINGLE_REQUEST})
     const config = {headers:{'Content-Type':'application-json'}}
     const {data} = await axios.get(`https://my-ecommerce-oficial-web.onrender.com/api/v1/products/single/product/${id}/`,config);
     dispatch({type:PRODUCT_SINGLE_SUCCESS,
     payload:data.product
    })
    }
    catch(error){
       dispatch({type:PRODUCT_SINGLE_FAIL,
       payload:error.response.data.message
       })
    }
   }

 ///get all products
 export const GetAllProductAciton=(keyword="",price=[1,5000])=>async(dispatch)=>{
    try{
     dispatch({type:GET_ALL_PRODUCTS_REQUEST})  
     const config ={headers:{'Content-Type':'application/json'}}
     const link = `https://my-ecommerce-oficial-web.onrender.com/api/v1/products/search/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}`
     const{data} = await axios.get(link) 
     dispatch({type:GET_ALL_PRODUCTS_SUCCESS,
     payload:data.products
    }) 
    }
    catch(error){
     dispatch({type:GET_ALL_PRODUCTS_FAIL,
    payload:error.response.data.message
    })    
    }
 }
//delete product
export const ProductDeleteAction=(id)=>async(dispatch)=>{
    try{
     dispatch({type:PRODUCT_DELETE_REQUEST})
     const config = {headers:{'Content-Type':'application-json'}}
     const {data} = await axios.delete(`https://my-ecommerce-oficial-web.onrender.com/api/v1/products/delete/product/${id}/`,config);
     dispatch({type:PRODUCT_DELETE_SUCCESS,
     payload:data.product
    })
    }
    catch(error){
       dispatch({type:PRODUCT_DELETE_FAIL,
       payload:error.response.data.message
       })
    }
   }

// category basic product
export const GetCategoryProductAction=(id)=>async(dispatch)=>{
try{
 dispatch({type:GET_PRODUCTS_CATEGORY_REQUEST})
 const config = {headers:{'Content-Type':'application/json'}}
 const{data} = await axios.get(`https://my-ecommerce-oficial-web.onrender.com/api/v1/products/get/category/products/${id}/`,config)
 dispatch({type:GET_PRODUCTS_CATEGORY_SUCCESS,
payload:data.products
})
}
catch(error){
    dispatch({type:GET_PRODUCTS_CATEGORY_FAIL,
    payload:error.response.data.message
    })
}
}

//product review
export const ProductReviewCreateAction=(id,formData)=>async(dispatch)=>{
  try{
   dispatch({type:PRODUCT_REVIEW_CREATE_REQUEST});
   const config ={headers:{'Content-Type':'application/json'}};
   const{data} = await axios.put(`https://my-ecommerce-oficial-web.onrender.com/api/v1/products/create/review/${id}/`,formData,config);
   dispatch({type:PRODUCT_REVIEW_CREATE_SUCCESS,
    payload:data
  })
  }
  catch(error){
    dispatch({type:PRODUCT_REVIEW_CREATE_FAIL,
    payload:error.response.data.message
    })
  }
}

//gethome category
export const getHomeCategoryAction=()=>async(dispatch)=>{
    try{
        dispatch({type:GET_HOME_CATEGORY_REQUEST});
        const config ={headers:{'Content-Type':'application/json'}};
        const{data} = await axios.get('https://my-ecommerce-oficial-web.onrender.com/api/v1/products/home/category',config);
        dispatch({type:GET_HOME_CATEGORY_SUCCESS,
         payload:data.productList
       })
       }
       catch(error){
         dispatch({type:GET_HOME_CATEGORY_FAIL,
         payload:error.response.data.message
         })
       }
}


///offer price product gl
export const OfferProductAction=()=>async(dispatch)=>{
    try{
      dispatch({type:GET_OFFER_GL_PRODUCTS_REQUEST});
      const config ={headers:{'Content-Type':'application/json'}};
      const {data} = await axios.get('https://my-ecommerce-oficial-web.onrender.com/api/v1/products/offer/products/gl',config);
      dispatch({type:GET_OFFER_GL_PRODUCTS_SUCCESS,
      payload:data.products
    }) 
    }  
    catch(error){
     dispatch({type:GET_OFFER_GL_PRODUCTS_FAIL,
    payload:error.response.data.message
    })
    }
}

///home unique porducts
export const HomeUniqueProductAction=()=>async(dispatch)=>{
  try{
    dispatch({type:GET_HOME_UNIQUE_PRODUCTS_REQUEST});
    const config ={headers:{'Content-Type':'application/json'}};
    const {data} = await axios.get('https://my-ecommerce-oficial-web.onrender.com/api/v1/products/home/unique/products/',config);
    dispatch({type:GET_HOME_UNIQUE_PRODUCTS_SUCCESS,
    payload:data.products
  }) 
  }  
  catch(error){
   dispatch({type:GET_HOME_UNIQUE_PRODUCTS_FAIL,
  payload:error.response.data.message
  })
  }
}
export const homeBannerCreateAction=(id,fromData)=>async(dispatch)=>{
 try{
   dispatch({type:CREATE_BANNER_REQUEST});
   const{data} = await axios.put(`https://my-ecommerce-oficial-web.onrender.com/api/v1/banner/update/home/banners/${id}`,fromData)
   dispatch({type:CREATE_BANNER_SUCCESS,
   payload:data
 })
  }
 catch(error){
  dispatch({type:CREATE_BANNER_FAIL,
  payload:error.response.data.message
  })
 }
}

export const homeBannerGetAction=()=>async(dispatch)=>{
  try{
    dispatch({type:GET_BANNER_REQUEST});
    const{data} = await axios.get('https://my-ecommerce-oficial-web.onrender.com/api/v1/banner/get/banners')
    dispatch({type:GET_BANNER_SUCCESS,
    payload:data.banners
   })
   }
  catch(error){
   dispatch({type:GET_BANNER_FAIL,
   payload:error.response.data.message
   })
  }
 }
//reset product
export const ResetProductAction=()=>async(dispatch)=>{
    dispatch({type:CREATE_PRODUCT_REST})
    dispatch({type:PRODUCT_REVIEW_RESET})
    dispatch({type:BANNER_RESET})
}
