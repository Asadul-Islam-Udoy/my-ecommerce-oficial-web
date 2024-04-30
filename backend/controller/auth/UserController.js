const fs = require('fs');
const asyncHandler = require('express-async-handler')
const UserModel = require("../../models/auth/UserModel");
const { createToken } = require('../../token/createToken');
const { sendEmail } = require('../../validated/email_validated');
const path  = require('path');
/// register controller
exports.RegisterViewController=asyncHandler(async(req,res)=>{
   const{username,email,password} = req.body;
   const image = req.file.filename
   const existing = await UserModel.findOne({email})
   if(existing){
    return res.status(400).json({
        success:false,
        message:'email address is already existed!'
    })
   }

 const user = await UserModel.create({
   username,
   email,
   password,
   avatar:image
  })
  const randomNumber = user.GetRendomNumber()
  user.isOtp = randomNumber;
  user.isTimeExpress = Date.now() + 24 * 60 * 1000
  user.save({validateBeforeSave:false})
  const otp = `your otp ${randomNumber}`
  const message = `otp tokenjk\n\n${otp} if you don't varified emil agnor this otp`
     try{
      await sendEmail({
           email:user.email,
           subject:'ecommerce project',
           message,  
      })
      res.status(200).json({
        success:true,
        message:'otp send your email address!' 
      })
      return user
     }
     catch(error){
      user.isOtp = undefined
      user.isTimeExpress = undefined
      user.save({validateBeforeSave:false})
      return res.status(400).json({
        success:false,
        message:'email is validate fali!'
      })
     }
})

///email validated controller
exports.EmailValidViewController=asyncHandler(async(req,res)=>{
   const{otp} = req.body;
   console.log(otp)
   const user = await UserModel.findOne({
    isOtp:otp,
    isTimeExpress:{$gte:Date.now()}
   })
   if(!user){
   return res.status(400).json({
    success:false,
    message:'your otp or time expires!'
   })
   }
   user.is_validated = true
   user.isOtp = undefined;
   user.isTimeExpress = undefined
   user.save({validateBeforeSave:false})
   return res.status(200).json({
    success:true,
    message:'email validated successfully!'
   })
})

//login controller
exports.LoginViewController=asyncHandler(async(req,res)=>{
  const {email,password} = req.body;
  const user = await UserModel.findOne({email}).select("+password");
  if(!user){
    return res.status(400).json({
      success:false,
      message:'email address is not existing!'
    })
  }
  if(user.is_validated === true){
  const match = await  user.PasswordCompare(password)
  if(!match){
    return res.status(400).json({
      success:false,
      message:'password is not match!'
    })
  }
  await createToken(user,202,res)
   }
else{
  return res.status(400).json({
    success:false,
    message:'your email address is not validated!'
  })
}
})

//logout controller
exports.LogoutViewController=asyncHandler(async(req,res)=>{
res.clearCookie('token',null,{
  expries:new Date(Date.now()),
  httpOnly:false
})
return res.status(200).json({
  success:true,
  message:'logout successfull!'
})
})

/// forget password send mail controller
exports.ForgetPasswordViewController=asyncHandler(async(req,res)=>{
const {email} = req.body;
const user = await UserModel.findOne({email});
if(!user){
 return res.status(400).json({
  success:false,
  message:'email is not existing!'
 })
}
const randomNumber = user.GetRendomNumber();
user.isOtp = randomNumber;
user.isTimeExpress = Date.now() + 24 * 60 * 1000;
user.save({validateBeforeSave:false})
const otp = ` user otp ${randomNumber}`;
const message = `this is your otp\n\n and ${otp} if you don't change password ignore this otp`
try{
  await sendEmail({
    email:user.email,
    subject:'ecommerce project',
    message
  })
  res.status(200).json({
    success:true,
    message:'otp send your email address!'
  })
  return user
}
catch(error){
  user.isOtp = undefined;
  user.isTimeExpress = undefined
  user.save({validateBeforeSave:false})
  return res.status(400).json({
    success:false,
    message:'otp send fail!'
  })
}

})

/// change forget password
exports.ChangeForgetPasswordViewController=asyncHandler(async(req,res)=>{
 const user = await UserModel.findOne({
  isOtp:req.body.otp,
  isTimeExpress:{$gte:Date.now()}
 }) 
 if(!user){
  return res.status(400).json({
   success:false,
   message:'your otp or time expires!'
  })
  }
 user.password = req.body.newPassword;
 user.isOtp=undefined;
 user.isTimeExpress=undefined;
 user.save({validateBeforeSave:false})
 return res.status(200).json({
  success:true,
  message:'password change successfully!'
 })
})

///update password
exports.UpdateUserPasswordViewController=asyncHandler(async(req,res)=>{
  const {oldPassword,newPassword} =req.body;
  const user = await UserModel.findById(req.user)
  const match = await user.PasswordCompare(oldPassword);
  if(!match){
    return res.status(400).json({
      success:false,
      message:'password is not match!'
    })
  }
  user.password = newPassword;
  user.save({validateBeforeSave:false})
  return res.status(200).json({
    success:true,
    message:'password is update successfull!'
  })
})

exports.GetAllUserController=asyncHandler(async(req,res)=>{
  const users_find = await UserModel.find();
   const users = users_find.filter((i)=>i._id.toString() !== req.params.id);
   return res.status(200).json({
    success:true,
    message:'getting all users successfully',
    users
   })
})

exports.CreatePermissionControler=asyncHandler(async(req,res)=>{
  const {permission} = req.body;
  const user = await UserModel.findById(req.params.roleUser);
  if(user){
    user.role = permission;
    user.save({validateBeforeSave:false});
  }
  const users_find = await UserModel.find();
  const users = users_find.filter((i)=>i._id.toString() !== req.params.currentUser);
  return res.status(200).json({
    success:'role update successfully!',
    users
  })
})

// admin update controller
exports.AdminUpdateProfileControler=asyncHandler(async(req,res)=>{
  const user = await UserModel.findById(req.params.id);
  if(!user){
    return res.status(400).json({
      success:false,
      message:'user not found'
    });
  };
 if(req.file){
   const filepath = path.join(path.dirname(__dirname),'../public/images/avatar/');
   fs.unlink(filepath + user.avatar,function(err){
    if(err){
      console.log('file is not delete')
    }
    else{
      console.log('file delete successfully')
    }
   })
   user.avatar = req.file.filename
 }
 user.username = req.body.username;
 user.email = req.body.email,
 user.save({validateBeforeSave:false});
 await createToken(user,202,res)
})