
exports.createToken=(user,statusCode,res)=>{
  const token = user.GetUserToken();
  const option={
    expires:new Date(
        Date.now()+process.env.COOKIE_EXPRIES*24*60*60*1000
    ),
    httpOnly:false
  }
   res.status(statusCode).cookie('token',token,option).json({
    success:true,
    user,
    token
  })
}