const express = require('express');
const isUserController = require('../../middleware/UserMiddleware');
const isAdminController = require('../../middleware/AdminMiddleware');
const {
    GetCategoriController,
    DeleteCategoriController,
    CategoryUpdateController,
    CategorCreateController,
    GetAdminCategoryController,
    SinglePageCategoryProductController,
    homeCategoryCreateController
} = require('../../controller/category/CategoriController')
const route = express.Router();


route.post('/create',isUserController,isAdminController('admin'),CategorCreateController)
route.get('/home/get',GetCategoriController)
route.get('/get',isUserController,isAdminController('admin'),GetAdminCategoryController)
route.delete('/delete/:id',isUserController,isAdminController('admin'),DeleteCategoriController)
route.put('/update/:id',isUserController,isAdminController('admin'),CategoryUpdateController)
route.get('/single/category/products/:categoryId/:productId',SinglePageCategoryProductController)
route.put('/home/category/create/:id',isUserController,isAdminController('admin'),homeCategoryCreateController)
module.exports = route