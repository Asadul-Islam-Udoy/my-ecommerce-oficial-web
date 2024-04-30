const express = require('express');
const path = require('path');
const multer = require('multer');
const shortid = require('shortid')
const { 
   ProductCreateController, 
   GetAllProductController,
   GetSingleProdutController, 
   DeleteProductController, 
   UpdateProductController, 
   GetCatgoryBasicController,
   ProductReviewCreateCotroller,
   SearchProductController,
   getHomeCategoryProductsController,
   OfferPriceController,
   HomeUniqueProducts
    } = require('../../controller/products/ProductsController');
const isUserController = require('../../middleware/UserMiddleware');
const isAdminController = require('../../middleware/AdminMiddleware')
const route = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'../public/images/products'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  
const upload = multer({ storage: storage })
route.post('/create/product',isUserController,isAdminController('admin'),upload.array('images'),ProductCreateController)
route.get('/admin/products',isUserController,isAdminController('admin'),GetAllProductController)
route.get('/single/product/:id',GetSingleProdutController)
route.delete('/delete/product/:id',isUserController,isAdminController('admin'),DeleteProductController)
route.put('/update/product/:id',isUserController,isAdminController('admin'),upload.array('images'),UpdateProductController)
route.get('/get/category/products/:id',GetCatgoryBasicController)
route.put('/create/review/:id',isUserController,ProductReviewCreateCotroller);
route.get('/search/products',SearchProductController);
route.get('/home/category',getHomeCategoryProductsController);
route.get('/offer/products/gl',OfferPriceController);
route.get('/home/unique/products',HomeUniqueProducts)
module.exports = route;