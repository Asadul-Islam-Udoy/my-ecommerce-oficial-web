const asyncHandler=require('express-async-handler');
const OrderModels = require('../../models/order/OrderModels');
const UserModel = require('../../models/auth/UserModel');
exports.OrderCreateController=asyncHandler(async(req,res)=>{
  const{shippingInfo,itemInfo,orderInfo,shippingPrice,taxPrice,totalPrice} = req.body;  
  const order = await OrderModels.create({
    shippingInfo,
    itemInfo,
    orderInfo,
    shippingPrice,
    taxPrice,
    taxPrice,
    totalPrice,
    paidAt:Date.now()
  })
  if(order){
    return res.status(200).json({
        success:true,
        message:'order create successfully'
    })
  }
  else{
    return res.status(400).json({
        success:false,
        message:'somthing is wrong'
    })
  }
});
//get all user orders
exports.GetAllOrderController=asyncHandler(async(req,res)=>{
   const orders = await OrderModels.find();
   return res.status(200).json({
    success:true,
    message:'get all orders successfully',
    orders
   });
});

exports.OrderStatusUpdateController=asyncHandler(async(req,res)=>{
  const orderupdate = await OrderModels.findByIdAndUpdate(req.params.id,{
   orderStatus:req.body.orderStatus
  },{new:true})
  const orders = await OrderModels.find();
  if(orderupdate){
    return res.status(200).json({
      success:true,
      message:'get all orders successfully',
      orders
     });
  }
})