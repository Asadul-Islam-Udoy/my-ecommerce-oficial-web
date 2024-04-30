const express = require('express');
const multer = require('multer')
const path = require('path')
const shortid = require('shortid')
const {
      RegisterViewController, 
      LoginViewController,
      LogoutViewController,
      EmailValidViewController,
      ChangeForgetPasswordViewController,
      ForgetPasswordViewController,
      UpdateUserPasswordViewController,
      GetAllUserController,
      CreatePermissionControler,
      AdminUpdateProfileControler,
     }
     = require('../../controller/auth/UserController');
const isUserController = require('../../middleware/UserMiddleware');
const isAdminController = require('../../middleware/AdminMiddleware');
const route = express.Router();



const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, path.join(path.dirname(__dirname),'../public/images/avatar'))
     },
     filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
     }
   })
   
const upload = multer({ storage: storage })
route.post('/register',upload.single('avatar'),RegisterViewController)
route.put('/is_validated',EmailValidViewController)
route.post('/login',LoginViewController)
route.get('/logout',LogoutViewController)
route.post('/forget_password',ForgetPasswordViewController)
route.put('/change_password',ChangeForgetPasswordViewController)
route.put('/update_password',UpdateUserPasswordViewController);
route.get('/get/all/users/:id',isUserController,isAdminController('admin'),GetAllUserController);
route.put('/role/update/:currentUser/:roleUser',isUserController,isAdminController('admin'),CreatePermissionControler);
route.put('/admin/update/:id',upload.single('avatar'),isUserController,isAdminController('admin'),AdminUpdateProfileControler);
module.exports = route