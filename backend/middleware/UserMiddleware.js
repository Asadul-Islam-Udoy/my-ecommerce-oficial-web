const asyneHandler = require('express-async-handler')
const JWT = require('jsonwebtoken')
const UserModel = require('../models/auth/UserModel')
const isUserController=asyneHandler(async(req,res,next)=>{
   const {token} = req.cookies;
   if(!token){
    return res.status(400).json({
        success:false,
        message:'user token is not define!'
    })
   }
   const deCode = await JWT.verify(token,process.env.J_SECRIT_KEY )
   req.user = await UserModel.findById(deCode._id)
   next()
})
module.exports = isUserController

  