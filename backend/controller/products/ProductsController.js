const asyncHandler = require("express-async-handler");
const ProductsModels = require("../../models/products/ProductsModels");
const path = require('path')
const fs = require('fs');
const searchApi = require('../apiFeature/SearchApi')
const UserModel = require("../../models/auth/UserModel");
const CategoriModel = require("../../models/category/CategoriModel");
const BannerModels = require("../../models/banners/BannerModels");
///product create
exports.ProductCreateController=asyncHandler(async(req,res)=>{
    let col=[]

    if( typeof req.body.color === 'string'){
     col.push(req.body.color)
    }
    else{
     col = req.body.color
    }
   let colors = []
   if(col){
    if(col.length>0){
        col.forEach(element => {
            colors.push(element) 
         });
       }
   }
   let siz=[]

   if( typeof req.body.size === 'string'){
    siz.push(req.body.size)
   }
   else{
    siz = req.body.size
   }
    const sizes = []
   if(siz){
    siz.forEach(element => {
        sizes.push(element) 
     });
   }
    let productImages  = []
    if(req.files.length >0){
        productImages=req.files.map((file)=>{
            return {image:file.filename}
        })
    }
    const height = req.body.height | 0;
    const width = req.body.width | 0 ;
    const productcreate=await ProductsModels.create({
     name:req.body.name,
     price:req.body.price,
     offer:req.body.offer,
     description:req.body.description,
     stock:req.body.stock,
     category:req.body.categoriId,
     colors,
     sizes,
     height,
     width,
     productImages,
     user:req.user
    })
    if(productcreate){
        const products = await ProductsModels.find();
        return res.status(200).json({
            success:true,
            message:'create successfully',
            products
        })
        
    }
    else{
        return res.status(400).json({
            success:false,
            message:'create fail',
        })
    
    }
})
//get all product
exports.GetAllProductController=asyncHandler(async(req,res)=>{
    const products = await ProductsModels.find();
     return res.status(200).json({
        success:true,
        message:'products getting successfully!',
        products
     })
})
//search products
exports.SearchProductController=asyncHandler(async(req,res)=>{
    let pagiItem = 3
    const ApiFucture = new searchApi(ProductsModels.find(),req.query).search().filter()
    const products = await ApiFucture.query;
    return res.status(200).json({
        success:true,
        message:'product getting successfully',
        products
    })
})
///get single product
exports.GetSingleProdutController=asyncHandler(async(req,res)=>{
    const product = await ProductsModels.findById(req.params.id);
    if(!product){
        return res.status(400).json({
            success:false,
            message:'product is not found!',
        })
    }
    return res.status(200).json({
        success:true,
        message:'single product getting successfully!',
        product
    })
})

//delete product
exports.DeleteProductController=asyncHandler(async(req,res)=>{
    const product = await ProductsModels.findById(req.params.id);
        product.productImages.forEach((file)=>{
          const productUrl = path.join(path.dirname(__dirname),'../public/images/products/');
          fs.unlink(productUrl+file.image,function(err){
            if(err){
                console.log(err)
            }
            else{
                console.log('delete successfully')
            }
          })
        })

    const productDelete = await ProductsModels.findByIdAndDelete(req.params.id);
    if(!productDelete){
        return res.status(400).json({
            success:false,
            message:'product is not found!',
        })
    }
    else{
        const product = await ProductsModels.find();
        return res.status(200).json({
            success:true,
            message:'delete successfully!',
            product
        })
    }
})

//update product
exports.UpdateProductController=asyncHandler(async(req,res)=>{
const{name,description,price,offer,height,width,sizes,colors,stock} = req.body;
const product = await ProductsModels.findById(req.params.id);
if(req.files.length >0){
    product.productImages.forEach((file)=>{
        const directoryPath =path.join(path.dirname(__dirname),'../public/images/products/');
        fs.unlink(directoryPath + file.image,function(err){
            if(err){
                console.log(err)
                return
            }
            console.log('delete successfully!')
        });
    })
}
let productImages =[]
if(req.files.length >0){
        productImages = req.files.map((file)=>{
        return{image:file.filename}
    })
}
const color = [];
colors.forEach((i)=>{
    color.push(i)
})
const size = []
sizes.forEach((i)=>{
    size.push(i)
})
let newPrices
if(offer > 0){
 let oldP = ((price*offer)/100);
 newPrices = price-oldP
}
if(!product){
    return res.status(400).json({
        success:false,
        message:'product is not found!',
    })
}

product.name = name,
product.description = description,
product.price = newPrices,
product.oldPrice = price,
product.offer = offer,
product.height = height,
product.width = width,
product.colors = color,
product.sizes = size,
product.stock = stock;
if(req.files.length > 0){
    product.productImages = productImages
}
product.save();
const products = await ProductsModels.find()
return res.status(200).json({
    success:true,
    message:'product update successfully!',
    products
})
})

///get category basic product
exports.GetCatgoryBasicController=asyncHandler(async(req,res)=>{
    const categories = await CategoriModel.find();
    const allProducts = await ProductsModels.find();
    const filterCategory = categories.filter((item)=>item.parentId === req.params.id);
    if(filterCategory.length !==0){
    let products = []
    filterCategory.forEach(element => {
         const categoriesFind = allProducts.find((item)=>item.category.toString() === element._id.toString());
         if(categoriesFind){
            products.push(categoriesFind)
         }
    });
    return res.status(200).json({
        success:true,
        message:'getting successfully!',
        products
    })
   }
   else{
     const products = await ProductsModels.find({category:req.params.id});
    if (!products){
      return res.status(400).json({
        success:false,
        message:'the product page is not allow'
      })
    }
    return res.status(200).json({
        success:true,
        message:'getting successfully!',
        products
    })
}
})

//product review create
exports.ProductReviewCreateCotroller=asyncHandler(async(req,res)=>{
    const {rating,comment} = req.body;
    const review = {
    name:req.user.username,
    email:req.user.email,
    avatar:req.user.avatar,
    user:req.user._id,
    rating,
    comment
   }
   const product = await ProductsModels.findById(req.params.id);
   if(!product){
    return res.status(400).json({
        success:false,
        message:'product is not found'
    })
   } 
  const checkUser = product.reviews.find((item)=>item.user.toString() === req.user._id.toString())
  if(checkUser){
    product.reviews.forEach((rev)=>{
        if(rev.user.toString() === req.user._id.toString())
        (rev.rating = rating),(rev.comment = comment)
    })
  }
  else{
    product.reviews.push(review);
    product.numOfReview = product.reviews.length
  }
  let avg = 0;
  product.reviews.forEach((item)=>{
    avg += item.rating
  })
  product.ratings = avg/product.reviews.length.toFixed(1);
  await product.save({validateBeforeSave:false})
  return res.status(200).json({
    success:true,
    message:'review create successfully!'
  })
})

//home category products
exports.getHomeCategoryProductsController=asyncHandler(async(req,res)=>{
    const categories = await CategoriModel.find({homeCategry:true});
    const products = await ProductsModels.find();
    const sort = { length: -1 };
    let sortedDates = []
    categories.forEach((item)=>{
       let filterProduct = products.filter((i)=>i.category.toString() === item._id.toString());   
       if(filterProduct.length !==0){
        const a={}
        a[item.name]= filterProduct
        sortedDates.push(a)
       }
    })
let productList = sortedDates.reverse((p1, p2) => (p1,p2));
   return res.status(200).json({
    success:true,
    message:'getting successfully',
    productList
   })
})


//// offer price controller
exports.OfferPriceController=asyncHandler(async(req,res)=>{
    const productsFind = await ProductsModels.find(); 
    products={
        '21 to 40':productsFind.filter((item)=>item.offer >= 21 & item.offer <=40),
       '1 to 20':productsFind.filter((item)=>item.offer <= 20 & item.offer >=1)
    }
 return res.status(200).json({
    success:true,
    message:'offer price getting succcessfully',
    products
 })
});
//unique unique products
exports.HomeUniqueProducts=asyncHandler(async(req,res)=>{
    const categories = await CategoriModel.find();
    const productModel = await ProductsModels.find()
    let products = [];
    categories.forEach(async(i)=>{         
          const productFilter = productModel.find((item)=>item.category.toString()===i._id.toString()); 
          if(productFilter !==undefined){
            products.push(productFilter)
          }
         
    })
    return res.status(200).json({
        success:true,
        message:'getting successfully',
        products
    })
})


//home banner create products
exports.HomeBannerUpdateProducts=asyncHandler(async(req,res)=>{
const banner = await BannerModels.findById(req.params.id);
if(banner.productBanner.length>0){
    banner.productBanner.forEach((file)=>{
        const filePath = path.join(path.dirname(__dirname),'../public/images/banners/')
        fs.unlink(filePath + file.banner,function(err){
            if(err){
                console.log(err)
            }
            else{
                console.log('delete successfully!')
            }
        })
    })
}
let productBanner =[];
 if(req.files.length>0){
    productBanner = req.files.map((file)=>{
    return{banner:file.filename}
   })
 }
banner.productBanner = productBanner,
banner.bannerText = req.body.bannerText,
banner.user = req.user._id
banner.save({validateBeforeSave:false})
 if(banner){
    return res.status(200).json({
        success:true,
        message:'banner update successfully',
    })  
 }
 else{
    return res.status(401).json({
        success:false,
        message:'banner update fail'
    })
 }
})
exports.GetHomeBannerUpdateProducts=asyncHandler(async(req,res)=>{
    const banners = await BannerModels.find();
    if(banners){
       return res.status(200).json({
           success:true,
           message:'banner update successfully',
           banners
       })  
    }
    else{
       return res.status(401).json({
           success:false,
           message:'banner update fail'
       })
    }
   })