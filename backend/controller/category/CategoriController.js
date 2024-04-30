const asyncHandler = require('express-async-handler');
var slugify = require('slugify');
const fs  = require('fs')
const CategoriModel = require('../../models/category/CategoriModel');
const ProductsModels = require('../../models/products/ProductsModels');
///category create
exports.CategorCreateController=asyncHandler(async(req,res)=>{
    const{name,parentId} = req.body;
    let pName
    if(parentId){
      const category = await CategoriModel.findById(parentId).select('name')
       pName = category.name
    }
    const Category = await CategoriModel.create({
        name,
        parentId,
        slug:slugify(name),
        user:req.user,
        parentName:pName
    })
    if(Category){
        const categories = await CategoriModel.find();
        return res.status(200).json({
            success:true,
            message:'create successfully!',
            categories
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:'somthing is wrong!'
        }) 
    }
})

//admin get category
exports.GetAdminCategoryController=asyncHandler(async(req,res)=>{
    const categories = await CategoriModel.find();
    return res.status(200).json({
        succes:true,
        message:'category getting successfully!',
        categories
    })
 
})

//childCategory
const ChailCategory = (categories,parentId=null)=>{
const categorList = [];
let category
if(parentId == null){
    category = categories.filter((item)=>item.parentId == undefined)
}
else{
    category = categories.filter((item)=>item.parentId == parentId)  
}
for(let i of category){
    categorList.push({
      _id:i._id,
      name:i.name,
      slug:i.slug,
      parentId:i.parentId,
      children:ChailCategory(categories,i._id)
    })
}
return categorList
}
/// get category
exports.GetCategoriController=asyncHandler(async(req,res)=>{
 const categories = await CategoriModel.find();
 let categorList
 if(categories){
   categorList = await ChailCategory(categories)
 }  
 return res.status(200).json({
    succes:true,
    message:'getting successfully',
    categorList
 })
})

//delete category
exports.DeleteCategoriController=asyncHandler(async(req,res)=>{
    const category = await CategoriModel.findById(req.params.id);
    if(!category){
        return res.status(400).json({
            success:false,
            message:'category is not found'
        })
    }
   const  categoryDelete = await CategoriModel.findByIdAndDelete(req.params.id);
   if(categoryDelete){
    const categories = await CategoriModel.find()
    return res.status(200).json({
        success:true,
        message:'category delete successfully!',
        categories
    })
}

})

// update controller 
 exports.CategoryUpdateController = asyncHandler(async(req,res)=>{
    const {name,parentId} = req.body;
    const category = await CategoriModel.findByIdAndUpdate(req.params.id,{
        name,
        parentId,
        slug:slugify(name)
    },{new:true})
    if(category){
        return res.status(200).json({
            success:true,
            message:'update successfully'
        })
    }
 })
/// single page category product
exports.SinglePageCategoryProductController=asyncHandler(async(req,res)=>{
    try{
    const categoyProducts = await ProductsModels.find({category:req.params.categoryId.toString()});
    if(!categoyProducts){
       return res.status(400).json({
        success:true,
        message:'product is not found'
       })
    }
    const products =  categoyProducts.filter((item)=>item._id.toString() !== req.params.productId);
    return res.status(200).json({
        success:true,
        message:'products getting is successfully',
        products
    })

}
catch(error){
    console.log('value is not found')
}
})

exports.homeCategoryCreateController=asyncHandler(async(req,res)=>{
    const category = await CategoriModel.findById(req.params.id);

    if(!category){
        return res.status(400).json({
            success:false,
            message:'category is not found'
        })
    }
  if(category.homeCategry === false){
    category.homeCategry = true
  }
  else{
    category.homeCategry = false
  }
  category.save({validateBeforeSave:false})
  const categories = await CategoriModel.find();
  return res.status(200).json({
    succes:true,
    message:'home category create successfully!',
    categories
  })
})
