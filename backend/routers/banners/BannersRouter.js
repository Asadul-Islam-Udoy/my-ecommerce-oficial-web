const express = require('express');
const multer = require('multer');
const path = require('path');
const shortid = require('shortid')
const isUserController = require('../../middleware/UserMiddleware');
const isAdminController = require('../../middleware/AdminMiddleware');
const { HomeBannerUpdateProducts, GetHomeBannerUpdateProducts } = require('../../controller/products/ProductsController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'../public/images/banners/'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.put('/update/home/banners/:id',isUserController,isAdminController('admin'),upload.array('banners'),HomeBannerUpdateProducts);
router.get('/get/banners',GetHomeBannerUpdateProducts)
module.exports = router